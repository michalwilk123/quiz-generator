"""Synchronize the Python 2 questions and source index in the dashboard study sheet.

Run from any directory. Optionally pass the job-seek-dashboard checkout path.
The HTML and its downloadable TXT source remain byte-for-byte identical.
"""
from collections import Counter
import html
import json
from pathlib import Path
import re
import sys
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
DASHBOARD = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT.parent / "job-seek-dashboard"
SHEET = DASHBOARD / "public/materialy/python-egzamin2.html"
LEVELS = {"easy": "Łatwe", "medium": "Średnie", "hard": "Trudne"}
CHAPTERS = {
    "Django i DRF": "frameworks2",
    "Architektura i DDD": "architecture2",
    "PostgreSQL": "postgres",
    "RabbitMQ i Redis": "messaging",
    "Bezpieczeństwo": "security",
    "Wdrożenia i testowanie": "operations",
    "Technologie dodatkowe": "extras",
    "Code review i współpraca": "collaboration2",
    "Zadania przekrojowe": "testing2",
}


def render(text):
    parts = re.split(r"```[^\n]*\n(.*?)```", text, flags=re.S)
    result = []
    for i, part in enumerate(parts):
        if i % 2:
            result.append("<pre><code>" + html.escape(part.rstrip()) + "</code></pre>")
        elif part.strip():
            for paragraph in part.strip().split("\n\n"):
                escaped = html.escape(paragraph).replace("\n", "<br>")
                escaped = re.sub(r"`([^`]+)`", r"<code>\1</code>", escaped)
                result.append("<p>" + escaped + "</p>")
    return "".join(result)


def replace_section(sheet, name, content):
    pattern = rf'<section id="{re.escape(name)}">.*?</section>'
    sheet, count = re.subn(pattern, lambda _: content, sheet, flags=re.S)
    if count != 1:
        raise ValueError(f"Expected one section {name}, found {count}")
    return sheet


def main():
    bank = json.loads((ROOT / "src/quizes/python2.json").read_text())
    questions = bank["quiz_elements"]
    sheet = SHEET.read_text()
    levels = Counter(q["difficulty"] for q in questions)
    long_count = sum(q["type"] == "long_open" for q in questions)
    cards = []
    for i, q in enumerate(questions, 1):
        chapter = "python" if q["section"].startswith("Python —") else CHAPTERS[q["section"]]
        if q["section"] in ("Python — asyncio i serwery", "Python — wątki i procesy"):
            chapter = "async"
        card = f'<article class="question" id="q-{i}"><div class="question-meta">Pytanie {i} · {html.escape(q["section"])} · {LEVELS[q["difficulty"]]}</div>'
        card += render(q["question"])
        if q.get("answers"):
            card += '<p class="question-kind">' + ("Wybierz wszystkie poprawne odpowiedzi." if q["type"] == "multi_choice" else "Wybierz jedną odpowiedź.") + '</p>'
            card += '<ol type="A">' + ''.join('<li>' + html.escape(a) + '</li>' for a in q["answers"]) + '</ol>'
        card += f'<p><a class="chapter-link" href="#{chapter}">Przejdź do omówienia →</a></p><details class="answer"><summary>Odpowiedź i uzasadnienie</summary>'
        if q["type"] == "multi_choice":
            card += '<ul>' + ''.join('<li>' + html.escape(a) + '</li>' for a in q["correct_answers"]) + '</ul>'
        else:
            card += render(q["correct_answer"])
        card += render(q["explanation"])
        card += '<p class="source">Źródła: ' + ', '.join(f'<a href="{html.escape(url, quote=True)}">{html.escape(urlparse(url).netloc)}</a>' for url in q["sources"]) + '</p></details></article>'
        cards.append(card)
    content = f'<section id="questions"><h2>{len(questions)} pytań i odpowiedzi — wersja 2</h2><p>{levels["easy"]} łatwych, {levels["medium"]} średnich i {levels["hard"]} trudnych. Trudność wynika z zakresu rozumowania i zastosowania wiedzy. Zadania projektowe ({long_count}) służą samoocenie poza presetami wyboru.</p><label for="question-search">Szukaj pytania, tematu lub poziomu</label><input id="question-search" type="search" placeholder="Np. generator, Django, łatwe" aria-describedby="search-status"><p id="search-status" role="status" aria-live="polite"></p>' + '\n'.join(cards) + '</section>'
    sheet = replace_section(sheet, "questions", content)
    # Build sources from current prose and current questions, excluding the old index.
    without_sources = re.sub(r'<section id="sources">.*?</section>', '', sheet, flags=re.S)
    urls = sorted({html.unescape(u) for u in re.findall(r'href="(https://[^"]+)"', without_sources) if 'github.io/quiz-generator' not in u})
    groups = {}
    for url in urls:
        groups.setdefault(urlparse(url).netloc, []).append(url)
    content = '<section id="sources"><h2>Źródła i dobór tematów — 01.10.2026</h2><p>Odpowiedzi zweryfikowano w dokumentacji producentów i materiałach autorów wzorców. Priorytet wynika z zakresu zaproszenia, przydatności w pracy backendowej i podstaw nauczanych w oficjalnych tutorialach. Sylabusy PCAP/PCPP są pomocniczym porównaniem zakresu Pythona; nie opisują tego egzaminu. Nie dysponujemy jego archiwalnymi pytaniami ani statystyką występowania tematów.</p>'
    for domain, domain_urls in groups.items():
        content += '<h3>' + html.escape(domain) + '</h3><ul>' + ''.join(f'<li><a href="{html.escape(url, quote=True)}">{html.escape(url)}</a></li>' for url in domain_urls) + '</ul>'
    sheet = replace_section(sheet, "sources", content + '</section>')
    SHEET.write_text(sheet)
    SHEET.with_suffix('.txt').write_text(sheet)
    print(f"Synchronized {len(questions)} questions and {len(urls)} sources in {SHEET}")


if __name__ == '__main__':
    main()
