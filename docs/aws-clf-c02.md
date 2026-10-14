# AWS Certified Cloud Practitioner — authoring and research notes

Researched on 2026-10-11 for the current **CLF-C02** exam. Three agents researched and authored separate topic groups; the coordinating agent integrated the bank, reviewed wording and keys, and checked the application. The final runtime bank is `src/quizes/aws-clf-c02.json`. All questions are original practice content in English.

## Exam presets

| Preset | Questions | Time | Feedback |
| --- | ---: | --- | --- |
| Study | 20 | Untimed | Explanations of correct answers and distractors, documentation, domain results after submission; explicit “I don’t know” option |
| Exam Demo | 50 | 90 minutes | Answers hidden until submission; full answer set required; one point per question, no guessing penalty |

The [official exam page](https://aws.amazon.com/certification/certified-cloud-practitioner/) specifies 65 questions and 90 minutes. The [current exam guide](https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02.html) distinguishes 50 scored questions and 15 unscored trial questions. Trial questions are omitted from this demo at the user's request. Retaining 90 minutes for 50 questions gives more time per question than the full official exam (108 seconds instead of about 83); this is a deliberate simplification, not an exact reproduction of exam pacing. All questions in both presets count toward the practice result.

AWS's 700 passing score is a **scaled score** on a 100–1,000 scale. This app reports raw practice accuracy, not an AWS-equivalent scaled score or an official pass/fail prediction. Multi-response questions earn a point only when the complete selected set matches the key. Every retry draws questions again; overlap with previous attempts is possible. Study and demo share the bank, so studying an item can make it familiar on a later demo.

## Blueprint and coverage

| Domain | Guide weight | Bank questions | Demo questions |
| --- | ---: | ---: | ---: |
| Cloud Concepts | 24% | 60 | 12 |
| Security and Compliance | 30% | 75 | 15 |
| Cloud Technology and Services | 34% | 85 | 17 |
| Billing, Pricing, and Support | 12% | 30 | 6 |
| Total | 100% | 250 | 50 |

The larger bank gives repeated practice across concept families rather than inflating one fixed mock exam. Section weights follow the official blueprint. Question and answer order are shuffled; answer keys use option text so shuffling does not change scoring. Topic-family metadata encourages varied questions within a session. Tests verify exact demo domain counts across 100 seeded draws.

Coverage targets the foundational level in all current task statements: cloud economics, Well-Architected principles and CAF; shared responsibility, identity, compliance and security services; deployment methods, global infrastructure and service selection for compute, database, networking, storage, AI/ML, analytics and other common applications; pricing, cost tools, organizations, support and learning resources. Coding, implementation, detailed architecture design, debugging and load testing are outside the intended level.

## Question style

The style reference is the [AWS sample question PDF](https://d1.awsstatic.com/training-and-certification/docs-cloud-practitioner/AWS-Certified-Cloud-Practitioner_Sample-Questions.pdf). That public PDF is **CLF-C01, dated 2020**: it is used only for writing mechanics, never as the current syllabus. The current CLF-C02 guide supplies scope and response formats. The [official CLF-C02 question set](https://explore.skillbuilder.aws/learn/course/external/view/elearning/14050/aws-certified-cloud-practitioner-official-practice-question-set-clf-c02-english) is a preparation resource, but protected account content was not treated as if it had been accessed.

The [AWS Interactive Knowledge Tool](https://pages.awscloud.com/AWS_2020_Cloud_Practitioner_Knowledge_Tool.html) exposes the same historical sample set in interactive form. It was checked as a second official style presentation, with the same legacy-syllabus limitation.

Additional public style examples were inspected from [Digital Cloud Training](https://digitalcloud.training/aws-cloud-practitioner-free-practice-questions/), [Whizlabs' public sample questions](https://www.whizlabs.com/blog/aws-cloud-practitioner-certification-questions/), [Tutorials Dojo's public CLF-C02 book excerpt](https://media.tutorialsdojo.com/aws-certified-cloud-practitioner-book-pdf-CLF-C02-snippet.pdf), and the practice providers logged in the topic research notes. Third-party explanations can contain old or ambiguous claims; AWS service documentation determines the final factual answers. This research covers public examples and official documentation, not every source on the internet or confidential live exam questions.

Authoring rules:

- Use short neutral business scenarios, direct concept identification and service selection based on a clear requirement.
- Ask for one best answer, or explicitly state “Select TWO” / “Select THREE”. Single-answer items have four options; multiple-response items have five.
- Keep distractors plausible and parallel: nearby service functions, an adjacent framework pillar, or a related responsibility. Avoid “all of the above”, joke answers and gratuitous detail.
- Prefer CLF-C02 breadth and conceptual distinctions over API syntax, exact regional counts or obscure quotas.
- Write original scenarios and options. Do not copy or translate provider questions, use recalled exam items, or closely paraphrase individual sample questions.
- Explain why the answer fits and why each distractor misses the requirement. Cite supporting official documentation in every item.

The multiple-response share is an authoring choice of about 20%, not a claim about a published AWS single/multiple-response ratio. Difficulty labels guide authoring; they do not reproduce AWS item calibration.

## Current information and maintenance

Current AWS documentation changes over time. Support plan naming, Free Tier rules, service availability, rebrands and deprecated migration products deserve explicit rechecking. The topic notes record decisions to avoid old support tiers and unavailable service assumptions. No precise plan fees, account-age-specific Free Tier promises or fixed global infrastructure counts are needed for this bank.

Detailed source and coverage records:

- [Cloud concepts and billing research](aws-cloud-billing-research.md)
- [Security research](aws-security-research.md)
- [Technology research](aws-technology-research.md)

When editing questions, preserve the existing schema, exact-text answer keys and meaningful concept families. Recheck official sources for a changing claim. Run `bun run test`, `bun run build` and `bun run test:browser` after changes to presets, sampling, timer or feedback behavior. Automated checks catch malformed keys, accidental duplicates and broken quiz behavior; they do not replace editorial review of factual accuracy and ambiguity.

## Completed validation

Final validation on 2026-10-11:

- Three domain authors reviewed their own items; technology and security authors cross-reviewed factual keys and ambiguity, and the cloud/billing author reviewed the integration. The coordinator strengthened weak distractors and applied the final source and wording corrections before merging.
- The final bank contains 250 unique stems: 200 single-answer questions and 50 multiple-response questions, each with English explanations and official AWS sources.
- All 151 distinct question-source URLs returned HTTP 200 in a same-day reachability check. Reachability does not establish the correctness of an explanation; editorial and documentation review remain separate checks.
- All 24 core tests passed, including bank validation, 100 seeded demo draws with exact domain counts, strict multi-response scoring, preserved 90-minute deadlines, and untimed study behavior.
- All 9 browser tests passed, including the existing Polish quizzes and the new English AWS flows, saved answers, hidden feedback until submission, expiry locking, and mobile layout.
- TypeScript checking and the production build passed; `git diff --check` reported no whitespace errors.

The authoring fragments were consolidated into the one runtime bank; the three topic research notes are retained as provenance. No site deployment was performed.
