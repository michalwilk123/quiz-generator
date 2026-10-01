# Python 2 — dobór pytań i przegląd bazy

Data: 01.10.2026. Zakres: bank `src/quizes/python2.json` i ściąga 2 w sąsiednim repozytorium `job-seek-dashboard`.

## Wynik i metoda

Baza ma nadal 288 pytań. Trzech subagentów niezależnie przejrzało Python, web/architekturę/testy oraz dane/infrastrukturę/bezpieczeństwo. Następnie dokonano wzajemnej recenzji: Python sprawdził web, web sprawdził Python i dane, a autor części danych sprawdził Python i web. Główny agent skontrolował pokrycie zaproszenia, powtórzenia, założenia pytań, jakość błędnych opcji i spójność materiałów.

144 pytania dotyczą Pythona; pozostałe 144 pokrywają backend i narzędzia z zaproszenia. Poziomy całego banku: 96 łatwych, 144 średnie, 48 trudnych. To redakcyjny rozkład do ćwiczeń, nie potwierdzona struktura tego egzaminu. Losowanie nadal równoważy działy; proporcja poziomów pojedynczej sesji może odbiegać od proporcji banku. Sześć długich zadań projektowych pozostaje poza presetami wyboru i służy samoocenie.

Zachowano wartościowe zagadnienia wcześniejszej bazy, ale zmieniono ich sposób sprawdzania. Usunięto dominację pytań o interning, weakref, haki metaklas, szczegółową kolejność callbacków, PEP 479, zużywanie iteratorów w nietypowych konstrukcjach i inne zaskakujące efekty kodu. Praktyczne zagrożenia, takie jak mutowalne argumenty domyślne, blokujący kod w async, N+1 i duplikaty wiadomości, pozostają, ponieważ wynikają z normalnej pracy programisty.

## Jak rozumieć „największą szansę wystąpienia”

Nie udostępniono archiwalnych egzaminów, kryteriów prowadzącego ani statystyk pytań. Nie można więc rzetelnie przypisać tematowi np. 70% szansy pojawienia się. Priorytet ustalono jakościowo przez przecięcie zaproszenia, podstaw oficjalnych tutoriali, publicznych sylabusów i tematów autorskich zestawów dostawców testów technicznych. Dokumentacja potwierdza odpowiedź; nie dowodzi częstości pytań.

Najwyższy priorytet otrzymały typy i referencje, struktury danych, funkcje, OOP, wyjątki i zasoby, iteracja/generatory, dekoratory, typowanie i dobór współbieżności. Następny: Django/ORM, API, SQL, testy, granice architektury i bezpieczeństwo. Pozostałe narzędzia mają zakres umożliwiający rozpoznanie roli i rozwiązanie podstawowego scenariusza.

Pomocnicze punkty odniesienia:

- [PCAP](https://pythoninstitute.org/pcap-exam-syllabus) wskazuje moduły, wyjątki, OOP, funkcje, przetwarzanie sekwencji i plików. [PCPP1](https://pythoninstitute.org/pcpp1-exam-syllabus) dodaje m.in. kompozycję, dekoratory i praktykę projektowania. To sylabusy innych egzaminów. Ich GUI i inne tematy poza zaproszeniem nie zostały dodane.
- [TestDome — Python](https://www.testdome.com/tests/python-online-test/45) publikuje własne przykłady z kolekcji, algorytmów, OOP, sortowania, JSON i funkcji wyższego rzędu. Wykorzystano zbieżność tematów, bez kopiowania zadań ani przenoszenia ich poziomów trudności.
- [CoderPad — Python](https://coderpad.io/interview-questions/python-interview-questions/) obejmuje dane, OOP, generatory i dekoratory. [Django](https://coderpad.io/interview-questions/django-interview-questions/) i [PostgreSQL](https://coderpad.io/interview-questions/postgresql-interview-questions/) pomagają porównać pokrycie workflow webowego i baz. Ich klucze odpowiedzi nie są źródłem prawdy: w materiale Django znaleziono np. sugestię, że domyślne dokładne filtrowanie wymaga jawnego `__exact` oraz że ForeignKey nie ma domyślnego indeksu. Oficjalne dokumentacje [lookupów](https://docs.djangoproject.com/en/5.2/ref/models/querysets/#exact) i [ForeignKey](https://docs.djangoproject.com/en/5.2/ref/models/fields/#foreignkey) rozstrzygają te mechanizmy. Ten przykład pokazuje, dlaczego publicznych list pytań nie przenoszono bez weryfikacji.

## Kryteria jakości

Łatwe pytanie sprawdza znaczenie mechanizmu lub zwykłą operację. Średnie wymaga wybrania narzędzia w typowej sytuacji. Trudne łączy mechanizmy, ograniczenia lub obsługę awarii; jego trudność nie wynika z rzadkiej składni. Wyjątki i wersje wskazano, gdy wpływają na odpowiedź. W pytaniach wyboru istnieje jeden jednoznaczny klucz, a błędne opcje, zwłaszcza na wyższych poziomach, odzwierciedlają rzeczywiste pomyłki.

W recenzji doprecyzowano m.in. wspólną bazę i transakcję przy Unit of Work, granicę deduplikacji lokalnego zapisu wobec zewnętrznej płatności, typowy kontrakt PUT, normalne zakończenie try/else oraz znaczenie poziomu „hard”. Uzupełniono Flask Blueprint/factory, Falcon WSGI/ASGI, publikację Wagtail, adminowe operacje masowe i JIRA/Confluence. Usunięto powtórzenie scenariusza ostatniej sztuki między webem i SQL.

## Pokrycie zaproszenia

| Obszar | Reprezentatywne umiejętności |
|---|---|
| Python i wzorce | referencje, funkcje, OOP, iteracja, zasoby, typy, wydajność, wątki/procesy/asyncio |
| Clean, DDD, heksagon | kierunek zależności, porty/adaptery, tożsamość, agregaty, konteksty, UoW |
| Django i Flask | routing, modele, migracje, middleware, relacje ORM, Blueprint, factory |
| DRF, FastAPI, Falcon | serializer, walidacja, uprawnienia, paginacja, DI, zasoby i WSGI/ASGI |
| Wagtail i Admin | szkic/publikacja, StreamField, listy/filtry, inline i reguły operacji masowych |
| SQL/NoSQL | klucze, JOIN, agregacje, transakcje, indeksy, EXPLAIN, embedding/referencje |
| Testy | jednostkowe/integracyjne/E2E, fixtures, parametryzacja, test doubles, izolacja, kontrakty |
| Docker/Kubernetes/mikroserwisy | obrazy, wolumeny, Deployment, Service, sondy, kompatybilne migracje i koszt dystrybucji |
| Bezpieczeństwo | uprawnienia do obiektu, SQL injection, XSS, CSRF, JWT, SSRF, najmniejsze uprawnienia |
| RabbitMQ/Redis/rozproszenie | kolejka, ACK/confirm, retry, outbox, deduplikacja, cache-aside, TTL, Pub/Sub |
| Elasticsearch | indeks odwrócony, text/keyword, query/filter, refresh i kompromis widoczności |
| RDF/SPARQL/Fuseki | trójki, wzorce grafowe, SELECT/ASK, serwer SPARQL |
| Metabase | zapisane pytania, ziarnistość, poprawna agregacja, uprawnienia |
| Git/CI/CD/Nginx | revert/rebase, sprawdzony artefakt, rollback, reverse proxy |
| Współpraca | ADR, przydatny komentarz review, mentoring, zadania i dokumentacja |

## Szczegółowe raporty

Poniżej zachowano uzasadnienia autorów części banku. Numery robocze odnoszą się do części przed połączeniem; aktualne identyfikatory rodzin znajdują się przy pytaniach.

Przy integracji zastąpiono również powtórzone pytanie FastAPI o blokujące I/O scenariuszem łączącym publiczny model odpowiedzi i autoryzację profilu. Dodano pytanie o korzyści i koszty mikroserwisów wobec modularnego monolitu. Źródła: [FastAPI response model](https://fastapi.tiangolo.com/tutorial/response-model/), [OWASP BOLA](https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/), [Martin Fowler: Microservice Trade-Offs](https://martinfowler.com/articles/microservice-trade-offs.html).

---

## Python 2: dobór i weryfikacja pytań

Zestaw: 144 pytania, 48 łatwych / 72 średnich / 24 trudne. Dziewięć dotychczasowych sekcji Python, po 16 pytań. Każde pytanie ma cztery odpowiedzi, jednoznaczny klucz, objaśnienie i źródła. Identyfikatory python2-core-001…144, origin=variant.

### Co wykazał audyt

Dotychczasowe 148 pozycji Python nadmiernie powtarzało kilka zaawansowanych szczegółów: dokładną kolejność callbacków i tasków asyncio (włącznie z eager task factory), MRO w wielokrotnym dziedziczeniu, deskryptory i ich priorytety, interning, weakref, zliczanie referencji i moment __del__, __new__ zwracające inny typ, szczegóły send/StopIteration oraz kombinacje mutable containers. Te zagadnienia były często przedstawione jako zgadywanie wydruku zamiast sprawdzenia umiejętności.

Zachowano użyteczne idee, ale zmieniono zadanie: mutable default → poprawna konstrukcja interfejsu; alias i płytka kopia → kontrola współdzielenia; asyncio → świadome planowanie, timeouty, ograniczanie współbieżności i sprzątanie; GIL → wybór wątków/procesów i synchronizacja; frozen dataclass → kontrakt niemutowalnego modelu; dekoratory → metadane i właściwy pomiar async.

### Jak wybierano zakres

Pierwszeństwo otrzymały tematy jawnie wskazane w zaproszeniu i potrzebne przy normalnej pracy nad aplikacją Python: model obiektowy, funkcje i interfejsy, struktury danych, zasoby i błędy, generatory, asyncio, wątki/procesy, typowanie, pomiary. Uzupełniono pominięte podstawy: importy i punkt wejścia modułu, venv i pip, JSON i logging. Pytania o frameworki, bazy, architekturę aplikacji i testy znajdują się także w części opracowanej przez innych agentów.

Oficjalny sylabus PCAP służył wyłącznie jako dodatkowa kontrola obecności modułów, wyjątków, OOP, funkcji i generatorów. Nie jest sylabusem egzaminu Politechniki Gdańskiej ani dowodem prawdopodobieństwa wystąpienia konkretnego pytania. Nie znaleziono publicznego sylabusu lub autentycznych pytań wskazanego testu, więc nie podano procentowych prognoz. Priorytety są wnioskowaniem z zaproszenia i znaczenia zagadnień, nie statystyką egzaminacyjną.

Trudność oznacza żądane rozumowanie. Easy sprawdza pojedynczy fundament; medium wybór konstrukcji lub wyjaśnienie zwykłego zachowania; hard łączy ograniczenia, np. atomowość importu przy leniwych iteratorach, transfer kont z dwoma blokadami, kontrolę czasu życia pliku, niezmienniczość list lub dekorowanie async. Nie wymagano pamięciowej znajomości internals CPython. Pytanie o GIL ma jawny kontekst CPython 3.12.

### Źródła przeczytane i sprawdzone

Wykorzystano źródła pierwotne:

- [Oficjalny sylabus PCAP](https://pythoninstitute.org/pcap-exam-syllabus) — pomocnicza kontrola pokrycia.
- [Python tutorial: functions](https://docs.python.org/3.12/tutorial/controlflow.html), [classes and generators](https://docs.python.org/3.12/tutorial/classes.html), [data structures](https://docs.python.org/3.12/tutorial/datastructures.html), [modules](https://docs.python.org/3.12/tutorial/modules.html), [venv](https://docs.python.org/3.12/tutorial/venv.html), [exceptions](https://docs.python.org/3.12/tutorial/errors.html).
- [Data model](https://docs.python.org/3.12/reference/datamodel.html), [copy](https://docs.python.org/3.12/library/copy.html), [abc](https://docs.python.org/3.12/library/abc.html), [functools](https://docs.python.org/3.12/library/functools.html), [builtins](https://docs.python.org/3.12/library/functions.html), [itertools](https://docs.python.org/3.12/library/itertools.html).
- [Asyncio tasks](https://docs.python.org/3.12/library/asyncio-task.html), [asyncio synchronization](https://docs.python.org/3.12/library/asyncio-sync.html), [threading](https://docs.python.org/3.12/library/threading.html), [multiprocessing](https://docs.python.org/3.12/library/multiprocessing.html), [executors](https://docs.python.org/3.12/library/concurrent.futures.html), [Queue](https://docs.python.org/3.12/library/queue.html).
- [Typing](https://docs.python.org/3.12/library/typing.html), [dataclasses](https://docs.python.org/3.12/library/dataclasses.html), [PEP 484](https://peps.python.org/pep-0484/), [PEP 544](https://peps.python.org/pep-0544/).
- [Contextlib](https://docs.python.org/3.12/library/contextlib.html), [exceptions reference](https://docs.python.org/3.12/library/exceptions.html), [float limitations](https://docs.python.org/3.12/tutorial/floatingpoint.html), [Decimal](https://docs.python.org/3.12/library/decimal.html), [collections](https://docs.python.org/3.12/library/collections.html), [profile](https://docs.python.org/3.12/library/profile.html), [timeit](https://docs.python.org/3.12/library/timeit.html), [JSON](https://docs.python.org/3.12/library/json.html), [logging guidance](https://docs.python.org/3.12/howto/logging.html).

### Weryfikacja

Uruchomiono wszystkie 17 fragmentów kodu na Python 3.12.3. W kodzie wymagającym otoczenia dostarczono kontrolowane dane i atrapy funkcji. Fragmenty celowo błędne zweryfikowano z oczekiwanym typem wyjątku; dla nonlocal sprawdzono też poprawioną funkcję i kolejne wyniki. Dodatkowo sprawdzono aliasy, płytką kopię, mutable default, keyword-only, porządek sortowania, wyczerpanie iteratora, plik zamknięty przed konsumpcją oraz zawężenie None. Sprawdzenie wykonano z kontrolowanymi danymi wejściowymi oraz asercjami zachowania.

Sprawdzono 144 unikalne family, brak powtórzeń opcji w obrębie pytania, klucz obecny w odpowiedziach, kompletne objaśnienia i dokładny rozkład trudności. Odpowiedzi są rotowane między czterema pozycjami.

Przeczytano także /tmp/python2-web.json: nie stwierdzono błędów merytorycznych lub niejednoznacznych kluczy. Wykryto dokładne pokrycie tematów web030/core024 (blokujący HTTP w endpointzie async), zgłoszone do integratora. DI/Strategy pojawiają się na poziomie definicji architektonicznej i praktycznej implementacji Python, co jest pokryciem koncepcji na różnych poziomach, nie identycznym pytaniem.

---

## Research and rewrite: web, architecture and testing

Prepared 2026-10-01. Deliverable: `/tmp/python2-web.json`, 72 questions. Difficulty: 24 easy, 36 medium, 12 hard. Existing section labels preserved: Django i DRF 30, Architektura i DDD 20, Wdrożenia i testowanie 14 (testing only), Code review i współpraca 4, Zadania przekrojowe 4. All entries have distinct families, `origin: variant`, explanations and supporting URLs. Four long answers include assessment criteria.

### Evidence and selection method

The invitation is a scope, not an examination blueprint. No actual exam papers, instructor rubric, frequency statistics or authenticated past questions were available. Therefore these questions represent high-value preparation coverage inferred from official introductory guides, framework core documentation and architecture authors; they do **not** claim measured probability of appearing on this particular exam. The difficulty proportions are an editorial study mix, not a documented distribution of the real test.

The strongest selection signal was recurring fundamental workflows: request routing, models/migrations, validation/access control, efficient relational reads, adapter boundaries, business invariants, transactions and appropriate test scopes. Peripheral frameworks receive enough coverage to identify their core role and usage, rather than memorizing rare signatures. Hard questions require applying several of these ideas to a concrete failure or tradeoff.

### Audit findings

Existing Django questions disproportionately asked exact SQL counts, cache invalidation subtleties, multi-join multiplication, savepoint recovery and immediate on_commit behavior. Existing tests disproportionately asked namespace patching and transacting test-framework quirks. These are valid facts but poor substitutes for testing competence in ordinary application development. Missing foundations included request flow, model purpose, migrations, basic serializers, Django Admin and Wagtail; Flask/FastAPI/Falcon scarcely appeared.

Architecture had useful scenarios but only nine questions, making dependence direction, ports/adapters, identity/value semantics, shared language, aggregate boundaries and application orchestration underrepresented. The rewrite grows explicit concept coverage and preserves practical scenarios. Source code is not changed.

### Source groups and rationale

- [Django 5.2 tutorial](https://docs.djangoproject.com/en/5.2/intro/tutorial01/), [models](https://docs.djangoproject.com/en/5.2/topics/db/models/), [queries](https://docs.djangoproject.com/en/5.2/topics/db/queries/), [migrations](https://docs.djangoproject.com/en/5.2/topics/migrations/): baseline request/model/schema workflow. These are official learning paths; their placement supports educational importance, not exam frequency.
- [Database optimization](https://docs.djangoproject.com/en/5.2/topics/db/optimization/), [transactions](https://docs.djangoproject.com/en/5.2/topics/db/transactions/), [queryset reference](https://docs.djangoproject.com/en/5.2/ref/models/querysets/): practical relation loading, atomic multi-write changes and bulk-update behavior. Exact cache arithmetic was removed. One hard Admin scenario checks whether bulk update bypasses a shared business operation.
- [Django Admin](https://docs.djangoproject.com/en/5.2/ref/contrib/admin/): list configuration, inlines and controlled custom actions. Administrative interfaces still require domain consistency and access checks.
- [DRF serializers](https://www.django-rest-framework.org/api-guide/serializers/), [authentication](https://www.django-rest-framework.org/api-guide/authentication/), [permissions](https://www.django-rest-framework.org/api-guide/permissions/), [pagination](https://www.django-rest-framework.org/api-guide/pagination/), [testing](https://www.django-rest-framework.org/api-guide/testing/): input/output contracts, identity versus authorization, owner assignment, list isolation and scalable responses. The permission-list scenario is retained because it tests a common access-control boundary, not an obscure API signature.
- [FastAPI body](https://fastapi.tiangolo.com/tutorial/body/), [dependencies](https://fastapi.tiangolo.com/tutorial/dependencies/), [async](https://fastapi.tiangolo.com/async/): typed validation, dependency injection and real nonblocking I/O. Async syntax alone is not sufficient to make blocking libraries concurrent.
- [Flask quickstart](https://flask.palletsprojects.com/en/stable/quickstart/), [blueprints](https://flask.palletsprojects.com/en/stable/blueprints/), [application factories](https://flask.palletsprojects.com/en/stable/patterns/appfactories/): routing, modular composition and independent app instances for test configuration.
- [Falcon tutorial](https://falcon.readthedocs.io/en/stable/user/tutorial.html), [quickstart](https://falcon.readthedocs.io/en/stable/user/quickstart.html): resource responders and deliberate WSGI versus ASGI integration.
- [Wagtail tutorial](https://docs.wagtail.org/en/stable/getting_started/tutorial.html), [page models](https://docs.wagtail.org/en/stable/topics/pages.html), [StreamField](https://docs.wagtail.org/en/stable/topics/streamfield.html), [page theory](https://docs.wagtail.org/en/stable/reference/pages/theory.html): CMS purpose, draft/publication separation, revisions and structured editorial blocks. Questions stay with longstanding concepts rather than APIs introduced in the current stable release.
- [Robert Martin, Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html), [Alistair Cockburn, Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture), [Martin Fowler, Bounded Context](https://martinfowler.com/bliki/BoundedContext.html): original/author descriptions of dependence direction, ports/adapters and semantic context boundaries.
- [Cosmic Python repository](https://www.cosmicpython.com/book/chapter_02_repository), [service layer](https://www.cosmicpython.com/book/chapter_04_service_layer), [Unit of Work](https://www.cosmicpython.com/book/chapter_06_uow), [aggregates](https://www.cosmicpython.com/book/chapter_07_aggregate), [events](https://www.cosmicpython.com/book/chapter_08_events_and_message_bus): authors' Python examples support concrete decomposition, transaction coordination and consistency questions. [Strategy explanation](https://refactoring.guru/design-patterns/strategy) is supplementary instructional material; one item distinguishes interchangeable algorithms from other patterns.
- [pytest fixtures](https://docs.pytest.org/en/stable/how-to/fixtures.html), [parameterization](https://docs.pytest.org/en/stable/how-to/parametrize.html), [flaky tests](https://docs.pytest.org/en/stable/explanation/flaky.html), [Python 3.12 mocks](https://docs.python.org/3.12/library/unittest.mock.html), [Django testing](https://docs.djangoproject.com/en/5.2/topics/testing/tools/), [coverage.py branches](https://coverage.readthedocs.io/en/latest/branch.html): reusable setup, data-driven cases, controlled doubles, isolation and limits of coverage. Mock namespace lookup is retained once as an ordinary testing skill; AsyncMock assertion traps are removed.
- [Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html): author guidance for balancing test scopes. The rewrite asks about costs and what each level can establish, without presenting exact universal percentages.
- [Google code review guidance](https://google.github.io/eng-practices/review/reviewer/looking-for.html), [review comments](https://google.github.io/eng-practices/review/reviewer/comments.html), [ADR community](https://adr.github.io/), [Atlassian Jira basics](https://www.atlassian.com/software/jira/guides/getting-started/basics), [Confluence](https://support.atlassian.com/confluence-cloud/docs/what-is-confluence-cloud/): shared rationale, constructive comments, mentoring and work/documentation responsibilities.

### Difficulty and quality controls

Easy: identify foundational roles or normal workflow. Medium: choose the appropriate mechanism in an ordinary scenario and distinguish nearby concepts. Hard: reason about integration boundaries, bypassed invariants, conflicting writes, transaction/test semantics or async blocking.

Polished 30 questions to replace distractors about unrelated technologies with nearby misunderstandings; correct-answer positions rotate. No nested-query arithmetic, obscure API trivia, surprising literal evaluation or API spelling recall is used as a hard question. Cross-bank stock-reservation duplication was removed from this deliverable and replaced by the Admin bulk-action invariant scenario.

Verified: exactly 72 items, exact section/difficulty counts, four long answers, 68 single-choice items with four unique options and one present answer, nonempty explanations/sources and unique families. Database-specific locking question explicitly uses PostgreSQL. Python mocks specify 3.12; Django questions specify 5.2. Non-Django frameworks use stable core semantics without claiming a frozen version.

### Cross-bank review observations

Reviewed `/tmp/python2-ops.json` without editing it. Keys appear sound. Ops #15 overlapped the former web #27 stock question; web #27 now tests Admin bulk actions instead. Ops hard #63 (Elasticsearch near-real-time) and #21 (backup RPO/RTO) are closer to factual medium difficulty unless expanded into recovery/latency tradeoff scenarios. Ops #29 needs payment effect to mean a database-local recorded effect; external provider calls cannot be made exactly once by local deduplication alone. Ops long #71 already correctly explains this boundary for email. Basic authorization and transaction concepts appear in more than one section, but their use cases differ and help connect fundamentals.

---

## Uzasadnienie zmian: dane, infrastruktura i bezpieczeństwo

Przejrzano dotychczasowe pytania w PostgreSQL, RabbitMQ i Redis, Bezpieczeństwo, Wdrożenia i testowanie, Technologie dodatkowe oraz Zadania przekrojowe. W wielu rodzinach powtarzały się techniczne pułapki: NULL w NOT IN, rekurencyjne UNION i cykle, dokładne parsowanie URL, wygasanie blokad Redis i fencing, niejednoznaczne momenty awarii pomiędzy ACK a zapisem. Są to wartościowe problemy specjalistyczne, ale razem nadawały podstawowemu sprawdzianowi charakter konkursu na znajomość wyjątków.

Nowy zestaw ma 72 pytania: 24 łatwe, 36 średnich i 12 trudnych. Rozkład działów: PostgreSQL 22, RabbitMQ/Redis 12, bezpieczeństwo 12, wdrożenia 12, technologie dodatkowe 12, zadania przekrojowe 2. Trudność oznacza poziom rozumowania, nie znajomość rzadkiej składni. Łatwe sprawdzają pojęcia; średnie wybór mechanizmu w typowym zadaniu; trudne spójność, awarie i kompromisy. Dystraktory szczególnie w trudnych pytaniach przedstawiają realistyczne błędne decyzje, np. retry pojedynczej instrukcji po przerwaniu transakcji lub rollout obrazu bez zgodności migracji.

Zakres i priorytety wynikają z przesłanego zaproszenia, audytu banku oraz dokumentacji producentów. Nie ma publicznej podstawy do przypisywania tym pytaniom liczbowego prawdopodobieństwa wystąpienia na konkretnym egzaminie. Nie wykorzystano zebranych w internecie pytań jako dowodu rzeczywistej częstotliwości.

### Co zachowano i uproszczono

Zachowano praktyczne idee istniejących pytań: LEFT JOIN, WHERE/HAVING, indeks złożony, EXPLAIN ANALYZE, unikalność przy współbieżnym zapisie, blokady, MongoDB embedding, outbox, idempotentny konsument, Pub/Sub, uprawnienia do obiektu, JWT, sondy Kubernetes, wieloetapowy Dockerfile, revert/rebase, pola text/keyword, RDF, SPARQL, Fuseki i poprawna agregacja Metabase. Zamiast kilku wariantów tej samej pułapki każde zagadnienie ma odrębny cel uczenia.

### Podstawa merytoryczna

- **SQL i modelowanie:** ograniczenia i relacje w [PostgreSQL Constraints](https://www.postgresql.org/docs/17/ddl-constraints.html), semantyka [transakcji](https://www.postgresql.org/docs/17/tutorial-transactions.html), [agregacji](https://www.postgresql.org/docs/17/tutorial-agg.html) oraz [złączeń](https://www.postgresql.org/docs/17/tutorial-join.html). To uzasadnia fundamenty kluczy, atomowości i raportowania.
- **Optymalizacja i współbieżność:** [EXPLAIN](https://www.postgresql.org/docs/17/using-explain.html), [indeksy złożone](https://www.postgresql.org/docs/17/indexes-multicolumn.html), [blokady](https://www.postgresql.org/docs/17/explicit-locking.html), [izolacja transakcji](https://www.postgresql.org/docs/17/transaction-iso.html), [partycjonowanie](https://www.postgresql.org/docs/17/ddl-partitioning.html) oraz [odtwarzanie z WAL](https://www.postgresql.org/docs/17/continuous-archiving.html). Stąd diagnoza planem, ograniczenia kosztów indeksu, atomowe rezerwacje, retry transakcji i odtwarzanie danych.
- **NoSQL:** dokumentacja [MongoDB embedding](https://www.mongodb.com/docs/manual/data-modeling/embedding/) opisuje modelowanie według sposobu odczytu. Pytania dotyczą wyboru między osadzeniem a referencją, nie założenia, że NoSQL zwalnia z projektowania schematu.
- **Kolejki i cache:** [RabbitMQ confirms](https://www.rabbitmq.com/docs/confirms), [reliability](https://www.rabbitmq.com/docs/reliability), [prefetch](https://www.rabbitmq.com/docs/consumer-prefetch), [dead-lettering](https://www.rabbitmq.com/docs/dlx) i [Redis use cases](https://redis.io/docs/latest/develop/use-cases/). Fundamentem jest oddzielenie przyjęcia publikacji od ukończenia pracy, retry i deduplikacja. [Redis Pub/Sub](https://redis.io/docs/latest/develop/pubsub/) uzasadnia odróżnienie nietrwałej transmisji od trwałej kolejki. [Transactional outbox](https://microservices.io/patterns/data/transactional-outbox.html) jest opisem wzorca przez jego autora, a nie obietnicą exactly-once.
- **Bezpieczeństwo:** [OWASP Authorization](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html), [Password Storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html), [SQL Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html), [REST Security](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html), [CSRF](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html), [XSS](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html) i [SSRF](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html). Pytania sprawdzają kontrolę dostępu, walidację i odpowiednią warstwę ochrony.
- **Wdrożenia:** [Docker containers](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/), [multi-stage builds](https://docs.docker.com/build/building/multi-stage/), [volumes](https://docs.docker.com/engine/storage/volumes/), [Kubernetes Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/), [Service](https://kubernetes.io/docs/concepts/services-networking/service/) i [probes](https://kubernetes.io/docs/concepts/workloads/pods/probes/). Trudne zadania sprawdzają migracje zgodne ze współistniejącymi wersjami oraz unikanie restart storm przy awarii zależności.
- **Praca z kodem i serwer HTTP:** [git revert](https://git-scm.com/docs/git-revert), [rebase](https://git-scm.com/book/en/v2/Git-Branching-Rebasing), [GitHub Actions](https://docs.github.com/en/actions/get-started/understand-github-actions) i [Nginx beginner guide](https://nginx.org/en/docs/beginners_guide.html). Wdrożenia obejmują CI, ale testy aplikacji opracowuje odrębna część banku.
- **Wyszukiwanie i dane analityczne:** [Elastic full-text](https://www.elastic.co/docs/solutions/search/full-text/how-full-text-works), [keyword](https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/keyword), [query/filter](https://www.elastic.co/docs/reference/query-languages/query-dsl/query-filter-context) i [near-real-time](https://www.elastic.co/docs/manage-data/data-store/near-real-time-search). [W3C RDF Primer](https://www.w3.org/TR/rdf11-primer/), [SPARQL](https://www.w3.org/TR/sparql11-query/), [Jena Fuseki](https://jena.apache.org/documentation/fuseki2/) wyznaczają podstawy grafów. [Metabase questions](https://www.metabase.com/docs/latest/questions/introduction), [joins](https://www.metabase.com/docs/latest/questions/query-builder/join) i [permissions](https://www.metabase.com/docs/latest/permissions/start) uzasadniają pytania o metryki i uprawnienia.

### Kontrola

Sprawdzono liczebność, rozkład trudności, unikalne identyfikatory, cztery różne odpowiedzi na pytanie zamknięte, obecność właściwej odpowiedzi w opcjach oraz źródła i wyjaśnienie w każdym pytaniu. Dwa zadania otwarte zawierają wzorcową odpowiedź i kryteria kompletności. Rozbudowano źródła dla konkretnych mechanizmów zamiast opierać cały dział na jednej stronie dokumentacji.


## Kontrole integracji

- `bun run test`: 19 testów przeszło, w tym ładowanie/klucze banku, liczebność i poziomy oraz losowanie obu presetów.
- `bun run build`: kontrola TypeScript i build Vite przeszły.
- `bun run test:browser`: 7 testów przeglądarkowych quizu przeszło.
- Wszystkie 17 fragmentów Pythona ponownie uruchomiono na CPython 3.12.3.
- W przeglądarce sprawdzono wszystkie 288 kart i ich klucze/objaśnienia, wyszukiwanie poziomu, rozwijanie/zamykanie odpowiedzi, ujawnienie pytań na potrzeby druku i odtworzenie filtrów po druku oraz brak poziomego overflow na szerokości 390 px. Skontrolowano także brak błędów JavaScript.
- Sprawdzono unikalność ID, istnienie lokalnych kotwic i identyczność HTML/TXT. Źródłowy bank wersji 1 nie zmienił się.
