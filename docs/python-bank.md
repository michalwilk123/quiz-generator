# Programowanie python - politechnika gdanska

Autorski bank ćwiczeniowy: 264 pytania, w tym 66 zagadnień z przekazanego materiału oraz 198 dodatkowych pytań i wariantów. Pytania i objaśnienia są po polsku. Fragmenty kodu zachowują składnię odpowiedniego języka.

## Dwie konfiguracje

- **Nauka:** 6 pytań bez timera, jedno pytanie na stronie. Każde z innego działu. Opcja „Nie wiem” zastępuje odpowiedź, daje zero punktów i jest osobno oznaczona w wynikach. W trybie weryfikacji jest wyłączona. Po zakończeniu dostępne są odpowiedzi, objaśnienia i dokumentacja.
- **Weryfikacja:** 30 pytań w 20 minut, po 5 na stronie. Niepełny zestaw odpowiedzi w pytaniu wielokrotnego wyboru daje zero punktów. Brak punktów ujemnych. Po upływie czasu odpowiedzi są blokowane; wyniki otwiera użytkownik.

Oba presety zawierają pytania wyboru i krótkie odpowiedzi. Sześć obszernych zadań projektowych pozostaje w bazie. Aby je ćwiczyć, w konfiguracji wybierz ten quiz, rodzaj „Długie odpowiedzi opisowe” oraz samoocenę na podstawie odpowiedzi wzorcowej. Podobieństwo tekstu nie jest wiarygodną oceną projektu systemu.

Limity i liczby pytań są ustawieniami ćwiczeń, nie deklaracją struktury rzeczywistego egzaminu. Typowy czas rozwiązania zależy od znajomości materiału; po pierwszych sesjach można je dostosować w `src/prepared_exams.ts`.

## Treść i losowanie

Baza: `src/quizes/python.json`. Rejestr: `src/quiz_config.ts`. Presety: `src/prepared_exams.ts`.

Oprócz standardowych pól pytania nowa baza korzysta z opcjonalnych:

- `explanation`: objaśnienie pokazywane wyłącznie w wynikach;
- `sources`: odnośniki HTTPS do dokumentacji;
- `section`: dział z materiału, używany do równomiernego rozłożenia sesji;
- `family`: wspólna nazwa zagadnienia dla oryginału i wariantów;
- `origin`: `report` dla przekazanego zagadnienia lub `variant` dla dodatku.

To metadane pytań jednego quizu; nie tworzą osobnych przedmiotów ani dodatkowego interfejsu konfiguracji. Losowanie najpierw preferuje nieużyte zagadnienia i najmniej reprezentowane działy. Gdy użytkownik zażąda więcej pytań niż jest rodzin, może pojawić się drugi wariant tej samej rodziny. Wybory w ramach pytań także są tasowane. Zapisany test zachowuje swoją kolejność po odświeżeniu.

Dla baz bez tych metadanych sposób losowania pozostaje równomierny. Dotychczasowe quizy i ich identyfikatory pozostają dostępne.

## Weryfikacja merytoryczna

Założenia wersji to Python 3.12, Django 5.2 i PostgreSQL 17. Pytania o inne wersje wskazują je w treści tam, gdzie ma to znaczenie. Źródła techniczne zapisano przy poszczególnych pytaniach. Przykłady Pythona sprawdzono także na interpreterze 3.12.3. Dwa podzbiory przeszły niezależną wzajemną recenzję, a zadania przekrojowe dodatkowy przegląd.

Pułapki sprawdzają czytanie warunków i rozróżnianie gwarancji mechanizmów, np. poprawny podpis nie dowodzi miejsca wyświetlenia tokenu, a anulowanie oczekiwania nie przerywa pracującego wątku. Nie są oznaczone w treści pytania.

## Przypadki rekrutacyjne

Dodatkowe 40 pytań rozwija cztery obszary:

- 10 pytań o kolejność wykonania w asyncio: planowanie zadań, bezpośrednie await, gotowy Future, call_soon, eager task factory, anulowanie i finally.
- 10 pytań o dziedziczenie, super(), przesłanianie metod, sygnatury, name mangling i wyszukiwanie metod specjalnych.
- 12 pytań o referencje, copy/deepcopy, współdzielenie obiektów oraz koszty algorytmów i pamięci.
- 8 pytań o dzielenie float, zaokrąglanie, dokładność, Decimal, fsum i tolerancję porównań.

35 przykładów z konkretnym wynikiem wykonano na CPython 3.12.3; pozostałe pięć pytań dotyczy kosztów obliczeniowych i pamięci, z jawnymi założeniami. Pytania o kolejność zadań określają pętlę i fabrykę zadań. Pytania o wydajność nie obiecują jednakowych wyników pomiarów na każdym sprzęcie. Zachowane są ustawienia obu presetów i dotychczasowe pytania.

## Argumenty domyślne, metaklasy i wątki

Kolejne 30 pytań (wszystkie przykłady wykonane na CPython 3.12.3) obejmuje:

- 10 pytań o czas obliczenia argumentów domyślnych, mutację i podmianę __defaults__/__kwdefaults__, dataclass/default_factory, atrybuty klasowe, przesłanianie i podmienianie metod w runtime.
- 10 pytań o metaclass=, dawny zapis __metaclass__, __new__, __init__, __call__, __init_subclass__, __set_name__, __prepare__ i konflikt metaklas.
- 10 pytań o asyncio.to_thread i run_in_executor: argumenty nazwane, planowanie pracy, Future kontra korutyna, ContextVar, wyjątki i pułapki bezpośredniego wywołania kodu blokującego.

Metaklasy pozostają częścią Pythona 3; sam atrybut __metaclass__ wewnątrz klasy nie wybiera jednak jej metaklasy. Synchroniczna funkcja przekazana do to_thread pozostaje synchroniczna; await służy do oczekiwania na jej wynik bez blokowania pętli.

## Terraform

24 pytania wyboru na podstawie przekazanego materiału HTML obejmują graf zależności, providery, moduły i ich interfejsy, init/validate/plan/apply, state, backendy, blokady, sensitive, count/for_each, moved, import, drift i CLI workspaces. Każde zawiera objaśnienie oraz źródła HashiCorp. Pakiet jest działem istniejącej bazy i uczestniczy w losowaniu w obu presetach.

Pytania rozróżniają klasyczne polecenie import od nowszych mechanizmów generowania konfiguracji, maskowanie sekretów od ich przechowywania oraz blokadę state od pliku wersji providerów. Nie wymagają uruchamiania infrastruktury.

## Podstawy PostgreSQL

13 dodatkowych pytań: cztery o WHERE/HAVING i agregację, pięć o B-tree, Hash oraz sequential scan, cztery o WITH RECURSIVE, warunek zakończenia i cykle. Zakres indeksów obejmuje podstawowe rozróżnienia bez katalogu zaawansowanych typów. Pytania należą do obecnego działu PostgreSQL i korzystają z obu presetów.

## Tematy z rozmów rekrutacyjnych

25 pytań na podstawie przeglądu pytań z rozmów na stanowisko Python backend developer w źródłach polskich, angielskich, rosyjskich, ukraińskich, niemieckich, francuskich, hiszpańskich i portugalskich. Wybrano tematy powtarzające się w kilku językach, których baza wcześniej nie obejmowała:

- 4 pytania o `is` i `==`: cache małych liczb, `sys.intern`, przeciążone `__eq__` i ostrzeżenie SyntaxWarning dla `is` z literałem.
- 4 pytania o deskryptory danych i niedanych: wzorzec cached_property, wiązanie w `staticmethod` i `classmethod`, deskryptor zapisany w instancji.
- 4 pytania o `__slots__`: brak `__dict__`, podklasa bez slotów, konflikt ze zmienną klasy, `weakref` i `cached_property`.
- 4 pytania o pamięć: zliczanie referencji, cykliczny GC i PEP 442, `WeakValueDictionary`, typy obsługujące słabe referencje.
- 4 pytania o `itertools.groupby`, `functools.singledispatch` i `functools.partial`.
- 5 pytań o atomowość mimo GIL: `counter += 1` w wątkach, które operacje wymagają blokady, poprawna naprawa, wyścig w asyncio przy `await` i build free-threaded.

22 przykłady z kodem wykonano na CPython 3.12.3. Pytania o wątki nie podają konkretnego wyniku niedeterministycznego programu, tylko to, co interpreter gwarantuje. Pytanie o build free-threaded wprost wskazuje Pythona 3.13 lub 3.14.

## React, JavaScript i AWS

Zwięzły pakiet 25 pytań jednokrotnego wyboru: 15 o React i JavaScript oraz 10 o AWS. Bank wcześniej nie obejmował Reacta ani osobnego działu AWS.

- React: Virtual DOM, props/state, key, hooki i ich reguły, snapshot i aktualizatory stanu, efekty i cleanup, ref, memoizacja, Context, formularze, event loop i współdzielenie stanu.
- AWS: typowe usługi, Management Console, Console Home, CloudShell, CLI/SDK/IaC, CloudWatch kontra CloudTrail, Cost Explorer i Budgets, IAM users/roles i polityki, Identity Center, S3 Lifecycle oraz klasy Glacier i restore.

Research z 21.09.2026: oficjalna dokumentacja [React](https://react.dev/learn), [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth) i [AWS](https://docs.aws.amazon.com/). Dokładne źródła przy każdym pytaniu. Przykłady Reacta zakładają komponenty funkcyjne React 19 i JavaScript w przeglądarce. Pytania są autorskie, dostępne w obu dotychczasowych presetach. Ten sam pakiet dodano do `job-seek-dashboard/public/materialy/python-egzamin.html` wraz z odnośnikami w spisie treści.

Dobór tematów porównano z autorskimi zestawami [GreatFrontEnd](https://github.com/greatfrontend/top-reactjs-interview-questions), [Sudheer J](https://github.com/sudheerj/reactjs-interview-questions), [DevInterview AWS](https://github.com/Devinterview-io/aws-interview-questions) i [Cloud Engineer Interview Questions](https://github.com/sv222/cloud-engineer-interview-questions). Priorytet otrzymały powtarzające się podstawy i tematy wskazane przez użytkownika. To przegląd jakościowy, nie ranking z pomiaru częstości rzeczywistych rozmów. Zestawy rekrutacyjne służą do doboru tematów; źródłem odpowiedzi technicznych jest dokumentacja producentów.
