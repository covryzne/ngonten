import argparse
import json
import re
import sys
from pathlib import Path
from urllib.parse import parse_qs, urlparse

from rich import box
from rich.console import Console
from rich.panel import Panel
from rich.prompt import Prompt
from rich.table import Table
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api._errors import NoTranscriptFound
from yt_dlp import YoutubeDL

console = Console()
OUTPUT_DIR = Path("transcripts")
DEFAULT_LANGUAGES = ["en", "id"]


def extract_video_id(url: str) -> str:
    url = url.strip()

    # Support direct video ID
    if re.fullmatch(r"[a-zA-Z0-9_-]{11}", url):
        return url

    parsed = urlparse(url)
    hostname = parsed.hostname or ""

    if hostname == "youtu.be":
        video_id = parsed.path.strip("/")

    elif hostname in (
        "youtube.com",
        "www.youtube.com",
        "m.youtube.com"
    ):
        if parsed.path.startswith(("/shorts/", "/embed/", "/live/")):
            video_id = parsed.path.split("/")[2]
        else:
            video_id = parse_qs(parsed.query).get("v", [""])[0]
    else:
        raise ValueError("Invalid YouTube URL")

    if not re.fullmatch(r"[a-zA-Z0-9_-]{11}", video_id):
        raise ValueError("Invalid video ID")

    return video_id


def sanitize_filename(title: str) -> str:
    # Remove invalid Windows filename characters
    title = re.sub(r'[<>:"/\\|?*\x00-\x1f]', "", title)
    title = re.sub(r"\s+", " ", title).strip()

    return title[:120].rstrip(". ") or "Untitled"


def get_video_metadata(video_id: str, interactive: bool = True) -> dict:
    url = f"https://www.youtube.com/watch?v={video_id}"

    options = {
        "quiet": True,
        "no_warnings": True,
        "skip_download": True,
        "noplaylist": True,
        "ignore_no_formats_error": True,
        "socket_timeout": 20,
    }

    try:
        with YoutubeDL(options) as ydl:
            info = ydl.extract_info(url, download=False)

        return {
            "video_id": video_id,
            "title": info.get("title") or video_id,
            "channel": info.get("channel") or "Unknown",
            "duration": info.get("duration") or 0,
            "upload_date": info.get("upload_date"),
            "url": url,
        }

    except Exception:
        if interactive:
            console.print(
                "[yellow]Metadata unavailable. Enter title manually.[/yellow]"
            )
            title = Prompt.ask("Video title", default=video_id)
        else:
            console.print(
                "[yellow]Metadata unavailable. Using video ID as title.[/yellow]"
            )
            title = video_id

        return {
            "video_id": video_id,
            "title": title,
            "channel": "Unknown",
            "duration": 0,
            "upload_date": None,
            "url": url,
        }


def fetch_transcript(video_id: str, languages: list[str]):
    api = YouTubeTranscriptApi()
    transcript_list = api.list(video_id)

    try:
        # Prioritize manually created subtitles
        transcript = transcript_list.find_manually_created_transcript(
            languages
        )
    except NoTranscriptFound:
        try:
            # Fallback to automatically generated subtitles
            transcript = transcript_list.find_generated_transcript(
                languages
            )
        except NoTranscriptFound:
            # Fallback to another available language
            transcript = next(iter(transcript_list), None)

            if transcript is None:
                raise ValueError("No transcript available")

            console.print(
                f"[yellow]Using available language: "
                f"{transcript.language}[/yellow]"
            )

    return transcript.fetch()


def format_timestamp(seconds: float) -> str:
    seconds = int(seconds)
    hours, remainder = divmod(seconds, 3600)
    minutes, seconds = divmod(remainder, 60)

    return f"{hours:02}:{minutes:02}:{seconds:02}"


def save_transcript(metadata: dict, transcript, output_dir: Path | None = None):
    output_dir = output_dir or OUTPUT_DIR
    title = sanitize_filename(metadata["title"])
    video_id = metadata["video_id"]

    folder = output_dir / f"{title} [{video_id}]"
    folder.mkdir(parents=True, exist_ok=True)

    segments = transcript.to_raw_data()

    full_text = " ".join(
        " ".join(item.text.split())
        for item in transcript
    )

    # TXT
    txt_path = folder / "transcript.txt"
    txt_path.write_text(full_text, encoding="utf-8")

    # JSON
    json_path = folder / "transcript.json"

    json_data = {
        **metadata,
        "language": transcript.language,
        "language_code": transcript.language_code,
        "is_generated": transcript.is_generated,
        "word_count": len(full_text.split()),
        "full_text": full_text,
        "segments": segments,
    }

    json_path.write_text(
        json.dumps(json_data, indent=2, ensure_ascii=False),
        encoding="utf-8"
    )

    # Markdown
    md_path = folder / "transcript.md"

    markdown = [
        f"# {metadata['title']}",
        "",
        f"- **Channel:** {metadata['channel']}",
        f"- **Source:** {metadata['url']}",
        f"- **Language:** {transcript.language}",
        f"- **Duration:** {format_timestamp(metadata['duration'])}",
        f"- **Word count:** {len(full_text.split())}",
        "",
        "---",
        "",
        "## Full Transcript",
        "",
        full_text,
        "",
        "---",
        "",
        "## Timestamped Transcript",
        "",
    ]

    for item in transcript:
        timestamp = format_timestamp(item.start)
        text = " ".join(item.text.split())

        markdown.append(f"**[{timestamp}]** {text}")
        markdown.append("")

    md_path.write_text(
        "\n".join(markdown),
        encoding="utf-8"
    )

    return folder, len(full_text.split()), len(segments)


def display_result(metadata, transcript, folder, words, segments):
    table = Table(
        title="Transcription Result",
        box=box.ROUNDED
    )

    table.add_column("Property", style="cyan")
    table.add_column("Value", style="white")

    table.add_row("Title", metadata["title"])
    table.add_row("Video ID", metadata["video_id"])
    table.add_row("Channel", metadata["channel"])
    table.add_row(
        "Duration",
        format_timestamp(metadata["duration"])
    )
    table.add_row("Language", transcript.language)
    table.add_row(
        "Subtitle Type",
        "Auto-generated" if transcript.is_generated else "Manual"
    )
    table.add_row("Total Words", str(words))
    table.add_row("Total Segments", str(segments))

    console.print(table)
    console.print("\n[bold green]Successfully saved![/bold green]")
    console.print(f"[cyan]Output:[/cyan] {folder.resolve()}")

    for file in folder.iterdir():
        console.print(f"  [green]✓[/green] {file.name}")


def parse_args(argv=None):
    parser = argparse.ArgumentParser(
        description="Extract YouTube transcripts without downloading video"
    )
    parser.add_argument(
        "url",
        nargs="?",
        default=None,
        help="YouTube URL or video ID (omit for interactive mode)",
    )
    parser.add_argument(
        "--lang",
        default="en,id",
        help="Preferred languages, comma-separated (default: en,id)",
    )
    parser.add_argument(
        "--out",
        default=str(OUTPUT_DIR),
        help="Output directory (default: transcripts)",
    )
    return parser.parse_args(argv)


def run_once(url: str, languages: list[str], output_dir: Path) -> int:
    try:
        video_id = extract_video_id(url)
        metadata = get_video_metadata(video_id, interactive=False)

        console.print(
            f"\n[bold green]Video:[/bold green] {metadata['title']}",
            markup=False
        )

        transcript = fetch_transcript(video_id, languages)
        folder, words, segments = save_transcript(
            metadata, transcript, output_dir
        )
        display_result(metadata, transcript, folder, words, segments)
        return 0
    except Exception as error:
        console.print(f"\n[bold red]Error:[/bold red] {error}")
        return 1


def main():
    args = parse_args()

    if args.url:
        languages = [
            lang.strip()
            for lang in args.lang.split(",")
            if lang.strip()
        ] or DEFAULT_LANGUAGES
        sys.exit(run_once(args.url, languages, Path(args.out)))

    console.print(
        Panel.fit(
            "[bold cyan]YouTube Transcriber CLI[/bold cyan]\n"
            "[dim]Extract YouTube transcripts without downloading video[/dim]",
            border_style="cyan"
        )
    )

    console.print("[dim]Type 'exit' or 'q' to quit.[/dim]\n")

    while True:
        try:
            url = Prompt.ask("[bold cyan]YouTube URL[/bold cyan]")

            if url.strip().lower() in ("exit", "quit", "q"):
                console.print("[yellow]Goodbye![/yellow]")
                break

            video_id = extract_video_id(url)

            with console.status("[cyan]Fetching video metadata...[/cyan]"):
                # Metadata retrieval may require manual input on failure
                pass

            metadata = get_video_metadata(video_id)

            console.print(
                f"\n[bold green]Video:[/bold green] {metadata['title']}",
                markup=False
            )

            language_input = Prompt.ask(
                "Preferred languages",
                default="en,id"
            )

            languages = [
                lang.strip()
                for lang in language_input.split(",")
                if lang.strip()
            ] or DEFAULT_LANGUAGES

            with console.status("[cyan]Fetching transcript...[/cyan]"):
                transcript = fetch_transcript(video_id, languages)

                folder, words, segments = save_transcript(
                    metadata,
                    transcript
                )

            display_result(
                metadata,
                transcript,
                folder,
                words,
                segments
            )

            console.rule()

        except (KeyboardInterrupt, EOFError):
            console.print("\n[yellow]Goodbye![/yellow]")
            break

        except Exception as error:
            console.print(f"\n[bold red]Error:[/bold red] {error}")
            console.rule()


if __name__ == "__main__":
    main()