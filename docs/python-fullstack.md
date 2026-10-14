# Python PG — Fullstack

Prepared on 2026-10-13 to match the user's requested topic priority. Preset: `#/exam/python-pg-fullstack`, 40 questions in 30 minutes. Questions and explanations are Polish, matching the existing Python PG quizzes.

| Group | Share | Questions per exam | Questions in bank |
| --- | ---: | ---: | ---: |
| Python, including concurrency | 30% | 12 | 108 |
| DDD, design patterns, Clean and hexagonal architecture | 25% | 10 | 44 |
| Django, DRF, FastAPI, Flask, Falcon, Wagtail/Admin, pytest and Python libraries | 20% | 8 | 54 |
| React, TypeScript and browser JavaScript | 15% | 6 | 23 |
| PostgreSQL, Redis/RabbitMQ, Elasticsearch, security, deployment and other technologies | 10% | 4 | 76 |
| Total | 100% | 40 | 305 |

The frontend has more questions in every exam than the entire final group combined. PostgreSQL, Redis or Elasticsearch individually therefore cannot outweigh React/TypeScript. Subtopics within each group rotate; every exam does not necessarily include every individual library or database. Counts for other custom exam lengths are approximate due to rounding.

The dedicated bank is `src/quizes/python-fullstack.json`. `scripts/build-python-fullstack-bank.py` assembles 297 existing questions from Python 2 (without long design-answer tasks) and the original React/JavaScript group, then adds 8 adaptations of located public TypeScript interview questions. The earlier 24 documentation-only authored questions were removed after the user's correction. See [interview research and provenance](python-fullstack-interview-research.md).

All 23 frontend questions now have related public interview-source links. Selected existing backend questions have matched interview-topic links as well. These appear separately from technical documentation after submission. Unannotated existing questions retain their previous provenance; the whole bank is not claimed to be collected from actual interviews. Polish wording and answer alternatives remain quiz adaptations. Public lists and anecdotal interview reports do not guarantee that a question will occur.

Every question includes an explanation and documentation links. Answer keys use exact option text and survive shuffling. Scoring requires the full correct selection for multiple-response items, without a wrong-answer penalty. Short written answers use the app's existing automatic matching. Explanations become visible after submission.

The 8 TypeScript answer keys were checked against the official [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/). Public interview collections establish the question/topic provenance, while official documentation supports the technical answer. The [research record](python-fullstack-interview-research.md) lists the actual interview materials, mapped topics, candidate reports, and limitations.

Verification covers unique stems and families, sourced explanations, all requested subject areas, 200 seeded exam draws with exact counts and no repeated families, timer creation, and the actual preset in a mobile browser.
