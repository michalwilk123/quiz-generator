# CLF-C02 research: Cloud Concepts and Billing, Pricing, and Support

Research date: 2026-10-11. The combined `src/quizes/aws-clf-c02.json` bank includes this contribution of 90 original English items: 60 Cloud Concepts and 30 Billing, Pricing, and Support. There are 72 single-response questions with four options and 18 multiple-response questions with five options and an explicit “Select TWO” instruction. Every option has an individual English rationale. There are 86 semantic families; repeated families represent genuine variants, such as recognizing a Well-Architected pillar from different scenarios.

## Evidence and scope

The [current official CLF-C02 guide](https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02.html) defines the formats, weights, and foundational scope. [Domain 1](https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain1.html) accounts for 24% and [Domain 4](https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain4.html) for 12% of scored content. Coding, implementation, architecture design, and troubleshooting are outside the target candidate's job-task scope. These items ask for recognition and selection, without asking the candidate to implement a design.

Domain 1 coverage includes elasticity, scalability, availability, agility, global reach, the six Well-Architected pillars, workload reviews, CAF and its six perspectives, business transformation outcomes, migration strategy recognition, database replication, migration business cases, fixed versus variable expense, facilities costs, total cost comparisons, economies of scale, rightsizing, licensing approaches, and automation. Domain 4 includes On-Demand/Spot/Reserved purchasing, Savings Plans, Dedicated Hosts, capacity reservations, storage cost considerations, data transfer, Pricing Calculator, Cost Explorer, Budgets, anomaly detection, detailed billing reports, tag activation and types, Organizations discount sharing, support resources, current support plans, Health/API, Trusted Advisor, Marketplace, partners, Prescriptive Guidance, and abuse reporting.

## Style findings

The official guide states that distractors should be plausible choices for someone with incomplete knowledge. Public [Tutorials Dojo sample questions](https://tutorialsdojo.com/aws-certified-cloud-practitioner-clf-c02-sample-exam-questions/) were visited only to observe phrasing, option structure, and foundational depth. The observed pattern is a short business requirement followed by selection of the best service, concept, or channel; near misses often share the same functional category. No sample question was copied, transformed, or used as a template for a particular generated item. No exam dump sources were used.

The generated items use concise scenarios, direct requirement language, a single distinguishing constraint, parallel answer options, and explicit selection counts. Distractors were reviewed and strengthened: database migration versus file transfer, migration business case versus cost estimation, spending analysis versus threshold alerts versus anomaly detection, and the difference between CAF transformation guidance and Well-Architected workload quality. Questions avoid all/none-of-the-above answers and implementation commands. Explanations are for study feedback and must be hidden during the exam simulation.

## Current facts and deliberate limits

* Current [support comparison](https://aws.amazon.com/premiumsupport/plans/) and the current domain guide identify Basic Support, AWS Business Support+, AWS Enterprise Support, and AWS Unified Operations. Legacy Developer/Business/Enterprise On-Ramp names appear in older preparation content and some transitional documentation. The bank uses current names and does not test legacy minimum charges or old response-time tables.
* [AWS Health API documentation](https://docs.aws.amazon.com/health/latest/ug/health-api.html) lists eligibility for current paid plans and also notes transitional availability under older plans in relevant Regions/accounts. The item deliberately says “eligible support plans” rather than claiming that access is universally available.
* The current [Free Tier page](https://aws.amazon.com/free/) describes a newer credit/Free-plan/Paid-plan program; new-account offers must not be treated as the legacy universal twelve-month program. The bank tests checking current eligibility, credits, conditions, and service limits rather than testing a dollar amount or promotional duration.
* [Consolidated billing](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/consolidated-billing.html) now describes one bill per seller of record if an organization spans multiple sellers. The question tests payment responsibility and eligible discount sharing and avoids an unconditional “one invoice for every organization” claim.
* [Data transfer pricing](https://aws.amazon.com/ec2/pricing/on-demand/) is path- and service-specific. Incoming internet transfer is generally free; cross-Region and some cross-AZ paths can be billed. Items avoid the false rule that every transfer inside one Region is free and omit temporary dollar thresholds.
* BYOL depends on vendor licensing terms. Dedicated Hosts can support eligible server-bound licenses; they do not make every license valid automatically. Savings Plans and Reserved Instance discounts are billing arrangements and should not be conflated with generic capacity guarantees.

The exam includes unscored research items according to the official guide. The user's requested simulator excludes them: every generated item is a normal scored practice item. A raw practice percentage is not an AWS scaled score.

## Sources visited

All fact-checking sources below are official AWS pages. Pages were opened or retrieved through search on the research date. Original guessed rightsizing and cloud-concept URLs that did not fetch successfully were replaced by the working references below.

- [https://aws.amazon.com/aws-cost-management/aws-budgets/](https://aws.amazon.com/aws-cost-management/aws-budgets/)
- [https://aws.amazon.com/aws-cost-management/aws-cost-anomaly-detection/](https://aws.amazon.com/aws-cost-management/aws-cost-anomaly-detection/)
- [https://aws.amazon.com/aws-cost-management/aws-cost-explorer/](https://aws.amazon.com/aws-cost-management/aws-cost-explorer/)
- [https://aws.amazon.com/aws-cost-management/aws-pricing-calculator/](https://aws.amazon.com/aws-cost-management/aws-pricing-calculator/)
- [https://aws.amazon.com/dms/](https://aws.amazon.com/dms/)
- [https://aws.amazon.com/ec2/pricing/](https://aws.amazon.com/ec2/pricing/)
- [https://aws.amazon.com/ec2/pricing/on-demand/](https://aws.amazon.com/ec2/pricing/on-demand/)
- [https://aws.amazon.com/free/](https://aws.amazon.com/free/)
- [https://aws.amazon.com/license-manager/](https://aws.amazon.com/license-manager/)
- [https://aws.amazon.com/marketplace/](https://aws.amazon.com/marketplace/)
- [https://aws.amazon.com/migration-evaluator/](https://aws.amazon.com/migration-evaluator/)
- [https://aws.amazon.com/partners/](https://aws.amazon.com/partners/)
- [https://aws.amazon.com/premiumsupport/plans/](https://aws.amazon.com/premiumsupport/plans/)
- [https://aws.amazon.com/premiumsupport/technology/trusted-advisor/](https://aws.amazon.com/premiumsupport/technology/trusted-advisor/)
- [https://aws.amazon.com/prescriptive-guidance/](https://aws.amazon.com/prescriptive-guidance/)
- [https://aws.amazon.com/professional-services/](https://aws.amazon.com/professional-services/)
- [https://aws.amazon.com/s3/pricing/](https://aws.amazon.com/s3/pricing/)
- [https://aws.amazon.com/types-of-cloud-computing/](https://aws.amazon.com/types-of-cloud-computing/)
- [https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-reserved-instances.html](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-reserved-instances.html)
- [https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain4.html](https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain4.html)
- [https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/consolidated-billing.html](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/consolidated-billing.html)
- [https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html)
- [https://docs.aws.amazon.com/awssupport/latest/user/getting-started.html](https://docs.aws.amazon.com/awssupport/latest/user/getting-started.html)
- [https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html](https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html)
- [https://docs.aws.amazon.com/health/latest/ug/health-api.html](https://docs.aws.amazon.com/health/latest/ug/health-api.html)
- [https://docs.aws.amazon.com/health/latest/ug/what-is-aws-health.html](https://docs.aws.amazon.com/health/latest/ug/what-is-aws-health.html)
- [https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html](https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html)
- [https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html](https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html)
- [https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/select-the-correct-resource-type-size-and-number.html](https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/select-the-correct-resource-type-size-and-number.html)
- [https://docs.aws.amazon.com/wellarchitected/latest/framework/cost-optimization.html](https://docs.aws.amazon.com/wellarchitected/latest/framework/cost-optimization.html)
- [https://docs.aws.amazon.com/wellarchitected/latest/framework/operational-excellence.html](https://docs.aws.amazon.com/wellarchitected/latest/framework/operational-excellence.html)
- [https://docs.aws.amazon.com/wellarchitected/latest/framework/performance-efficiency.html](https://docs.aws.amazon.com/wellarchitected/latest/framework/performance-efficiency.html)
- [https://docs.aws.amazon.com/wellarchitected/latest/framework/reliability.html](https://docs.aws.amazon.com/wellarchitected/latest/framework/reliability.html)
- [https://docs.aws.amazon.com/wellarchitected/latest/framework/security.html](https://docs.aws.amazon.com/wellarchitected/latest/framework/security.html)
- [https://docs.aws.amazon.com/wellarchitected/latest/framework/sustainability.html](https://docs.aws.amazon.com/wellarchitected/latest/framework/sustainability.html)
- [https://docs.aws.amazon.com/wellarchitected/latest/framework/the-pillars-of-the-framework.html](https://docs.aws.amazon.com/wellarchitected/latest/framework/the-pillars-of-the-framework.html)
- [https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sus_sus_data_a4.html](https://docs.aws.amazon.com/wellarchitected/latest/sustainability-pillar/sus_sus_data_a4.html)
- [https://docs.aws.amazon.com/whitepapers/latest/aws-overview/six-advantages-of-cloud-computing.html](https://docs.aws.amazon.com/whitepapers/latest/aws-overview/six-advantages-of-cloud-computing.html)
- [https://docs.aws.amazon.com/whitepapers/latest/aws-overview/types-of-cloud-computing.html](https://docs.aws.amazon.com/whitepapers/latest/aws-overview/types-of-cloud-computing.html)
- [https://docs.aws.amazon.com/whitepapers/latest/overview-aws-cloud-adoption-framework/foundational-capabilities.html](https://docs.aws.amazon.com/whitepapers/latest/overview-aws-cloud-adoption-framework/foundational-capabilities.html)
- [https://docs.aws.amazon.com/whitepapers/latest/overview-aws-cloud-adoption-framework/welcome.html](https://docs.aws.amazon.com/whitepapers/latest/overview-aws-cloud-adoption-framework/welcome.html)

Additional official overview pages visited: [CAF overview](https://docs.aws.amazon.com/whitepapers/latest/overview-aws-cloud-adoption-framework/welcome.html), [AWS pricing overview](https://aws.amazon.com/pricing/), and [Savings Plans overview](https://aws.amazon.com/savingsplans/).

- [AWS Well-Architected Tool user guide](https://docs.aws.amazon.com/wellarchitected/latest/userguide/tool.html)
