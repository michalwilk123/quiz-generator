# Python PG — research pytań rekrutacyjnych

Data przeglądu: 2026-10-13. Korekta po uwadze użytkownika: wcześniejsze 24 nowe pytania były autorskimi ćwiczeniami z dokumentacji, bez ustalonego pochodzenia rekrutacyjnego. Cały ten pakiet usunięto z generatora i banku Fullstack. Zachowano 297 wcześniejszych pytań. Lukę TypeScriptu uzupełnia 8 adaptacji pytań znalezionych w publicznych zestawach, każda z co najmniej dwoma odnośnikami do materiałów rekrutacyjnych.

## Co oznaczają źródła

- **Publiczny zestaw pytań**: autor publikuje pytania do rozmów lub przygotowania. Dowód, że pytanie występuje w materiale rekrutacyjnym; nie dowód, że padło w konkretnej firmie.
- **Relacja uczestnika**: osoba opisuje zadanie lub rozmowę. Mocniejszy sygnał faktycznego użycia, ale relacja jest anegdotyczna i nie została niezależnie zweryfikowana.
- **Dokumentacja techniczna**: służy do sprawdzenia odpowiedzi, a nie do ustalania popularności pytania.

„Pewniaki” rozumiemy jako priorytet przygotowania do powtarzających się zagadnień. Nie mamy reprezentatywnych statystyk występowania pytań ani listy pytań konkretnego pracodawcy. Liczba gwiazdek, liczba pytań w repo i marketingowy opis „real interview questions” nie potwierdzają częstości na rozmowach.

## Najmocniejsze znalezione sygnały

| Zakres | Pytania/tematy do powtórki | Sprawdzone źródła |
| --- | --- | --- |
| Python | Mutowalność, list vs tuple, `is` vs `==`, generatory/yield, dekoratory, GIL i wybór wątków/procesów | [CoderPad](https://coderpad.io/interview-questions/python-interview-questions/), [DevInterview Python](https://github.com/Devinterview-io/python-interview-questions), [Python Senior/Lead](https://github.com/chernysh/python-interview-questions) |
| React | Props vs state, `key`, kontrolowane pola, reguły hooków, efekty i zależności, ref, memoizacja, podnoszenie stanu | [GreatFrontEnd](https://github.com/greatfrontend/top-reactjs-interview-questions), [Sudheer J](https://github.com/sudheerj/reactjs-interview-questions), [ReadyToDev](https://github.com/readytodev-pro/frontend-interview-questions) |
| TypeScript | Type/interface, any/unknown, generics, unie, modelowanie stanów UI, utility types, inference, TS vs JS | [Aershov/FullStack.Cafe](https://github.com/aershov24/typescript-interview-questions/blob/master/README.md), [DevInterview TS](https://github.com/Devinterview-io/typescript-interview-questions), [ReadyToDev](https://github.com/readytodev-pro/frontend-interview-questions), [Paracetamol TS](https://github.com/crisdux/paracetamol.ts), [GreatFrontEnd senior TS](https://www.greatfrontend.com/blog/typescript-interview-questions-for-senior-frontend-developers) |
| Django/API | QuerySet, middleware, N+1, select_related/prefetch_related, serializacja i uprawnienia; FastAPI DI i Pydantic | [CoderPad Django](https://coderpad.io/interview-questions/django-interview-questions/), [DevInterview Django](https://github.com/Devinterview-io/django-interview-questions), [FastAPI — Ali Rezaei](https://github.com/AliRezaei-Code/FastAPI-interview-questions) |
| DDD | Ubiquitous language, Entity vs Value Object, bounded context i agregaty | [DevInterview DDD](https://github.com/Devinterview-io/domain-driven-design-interview-questions), [Second Talent](https://www.secondtalent.com/interview-guide/ddd/) |
| PostgreSQL | Klucze, JOIN, grupowanie/agregacje, indeksy | [CoderPad PostgreSQL](https://coderpad.io/interview-questions/postgresql-interview-questions/) |
| Redis | Zastosowania, struktury danych i cache | [DevInterview Redis](https://github.com/Devinterview-io/redis-interview-questions) |

To lista priorytetów wynikająca z jakościowego porównania materiałów. Nie jest rankingiem opartym na zmierzonych częstotliwościach.

## Relacje z rzeczywistych rozmów

- [Django — opis zadania optymalizacji API](https://www.reddit.com/r/django/comments/1ld0gut/top_django_interview_qs/): uczestnik opisuje przegląd istniejącego kodu i schematu bazy z interviewerem; dalsza odpowiedź wskazuje prefetch. W tej samej dyskusji są także ogólne sugestie innych osób — nie oznaczamy ich wszystkich jako faktycznie zadanych pytań.
- [Frontend — pytania i doświadczenia](https://www.reddit.com/r/react/comments/1lf0gzs/interview_questions_for_junior_level_front_end/): w odpowiedziach pojawiają się props/state, type/interface i ograniczanie renderów. Osobny uczestnik twierdzi, że event loop padł na części jego rozmów. To jego doświadczenie, nie oszacowanie dla całego rynku.
- [Senior frontend — opis ocenianych zadań](https://www.reddit.com/r/Frontend/comments/1g1gdfy/technical_frontend_interview_assessments_ive_faced/): relacja z praktycznych zadań w React/JS. Wspiera priorytet praktycznego rozumowania zamiast samego odtwarzania definicji.

## Osiem adaptacji TypeScriptu

Identyfikatory `python-fullstack-interview-ts-01`…`08` w banku i generatorze. Obejmują TS vs JS, interface/type, any/unknown, generics, unię, unię dyskryminowaną, utility types i inference. Tematy i bazowe pytania zostały znalezione w wskazanych materiałach; polskie sformułowanie, warianty wyboru i wyjaśnienia są redakcyjną adaptacją do aplikacji. Nie są transkrypcją prywatnej rozmowy ani wierną kopią wariantów odpowiedzi z interview.

Przy 8 adaptacjach oraz 35 istniejących pytaniach dopisano `interview_sources` z konkretnymi powiązaniami. Interfejs pokazuje je po zakończeniu pod „Powiązane pytania rekrutacyjne”, osobno od „Dokumentacja”. Pozostałe pytania zachowują poprzednie pochodzenie; nie przypisujemy im zbiorczo potwierdzenia z interviewów. Oryginalne banki Python i Python 2 nie zostały przepisane.

## Jakość źródeł i ograniczenia

W publicznych odpowiedziach są błędy i stare informacje. CoderPad Django sugeruje jawne dodanie indeksu do ForeignKey, choć Django tworzy go domyślnie. Repozytorium Python Senior/Lead ma historyczne fragmenty o GIL i nieprecyzyjne wyjaśnienie momentu ewaluacji argumentów domyślnych. W DDD znaleziono daleko idące twierdzenia o trendach i złożoności obliczeniowej, które nie są podstawą kluczy. Listy wykorzystujemy do wskazania pytań, a odpowiedzi sprawdzamy w dokumentacji i dotychczasowych zweryfikowanych źródłach banku.

Niektóre strony lub duże README nie dały się w pełni odczytać przez przeglądarkę. Korzystaliśmy wtedy z dostępnych treści autora lub raw README; nie przypisujemy dowodów treściom za paywallem. Nie użyto płatnych kluczy ani niepotwierdzonych archiwów firmowych.
