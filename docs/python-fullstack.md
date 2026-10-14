# Python PG — Fullstack

Revised on 2026-10-14 for a senior developer. Preset: `#/exam/python-pg-fullstack`, 40 questions in 30 minutes. Questions and explanations remain Polish, matching the existing Python PG quizzes.

| Group | Share | Questions per exam | Questions in bank |
| --- | ---: | ---: | ---: |
| Python, including concurrency | 30% | 12 | 25 |
| DDD, design and architecture | 25% | 10 | 20 |
| Django, DRF, FastAPI, Flask, Pydantic, Admin and testing | 20% | 8 | 14 |
| React, TypeScript and browser JavaScript | 15% | 6 | 15 |
| PostgreSQL, Redis/RabbitMQ, Elasticsearch, security and deployment | 10% | 4 | 20 |
| Total | 100% | 40 | 94 |

React/TypeScript outweighs the entire final group in every exam. Individual libraries and databases rotate within their group.

The previous 305-question pool included 96 items labelled easy and introductory frontend definitions. The senior revision selects 94 existing families, excludes the other 211, and rewrites all selected scenarios and alternatives. The narrower pool intentionally favors quality over volume. No new family identities are added. Applied prerequisites retain medium difficulty metadata; the senior audience is not expressed by relabelling every question hard.

Scenarios cover cancellation, task lifetime, backpressure, resource ownership, optimistic concurrency, Unit of Work, payment timeout ambiguity, ORM query plans, nested transactions, object permissions, stale closures, request races, context propagation and TypeScript contracts. Distractors model implementation mistakes and incomplete fixes. Explanations identify the important failure mode or tradeoff.

`scripts/build-python-fullstack-bank.py` assembles the source banks, then applies the selection and reviewed content in `scripts/python-fullstack-senior.json`. The generated artifact is `src/quizes/python-fullstack.json`. The original `python.json` and `python2.json` banks remain independent. Rebuild with `python3 scripts/build-python-fullstack-bank.py`.

Public interview-topic links are included only where a related prompt was located. Technical documentation supports answer correctness, not interview popularity. Scenarios and alternatives are editorial adaptations; no claim is made that all 94 questions were asked verbatim in interviews. See the [research record](python-fullstack-interview-research.md), including its senior revision and historical source review.

The 15 frontend questions have public interview-topic links, including 6 TypeScript adaptations. Source links and explanations appear after submission. Each question has four options and one correct answer; option order is shuffled by the application. Existing saved attempts preserve their question snapshots; starting a new attempt loads the revised bank.

Verification includes schema validation, unique stems/families, 200 seeded draws with exact domain counts, the 40-question/30-minute configuration, the production build and browser checks. Submitted exams keep the complete review on one page.
