# Mapa zdjęć i ustalenia po audycie materiału

Data: 2026-07-29
Materiał: 40 obrazów wygenerowanych w ChatGPT, przekonwertowanych do WebP (72 MB → 2,59 MB)

Katalog powstał w przebiegu wieloagentowym: czterech agentów obejrzało po 10 zdjęć,
piąty przeszedł po nich adwersaryjnie i szukał błędów, szósty przypisał zdjęcia do sekcji.

---

## Co poszło na stronę

| Sekcja | Plik na stronie | Oryginał | Dlaczego |
|---|---|---|---|
| 01 HERO | `foto-19.webp` | 17_59_48 (9) | Puste wnętrze gabinetu. Bez ludzi, więc zero ryzyka zdeformowanych dłoni i twarzy na największym kadrze strony. Lewa i górna część kadru pusta, nagłówek ma gdzie usiąść |
| 02 DIAGNOZA | `foto-03.webp` | 17_59_31 (3) | Render barku z zaznaczonym miejscem bólu. Brak dłoni i twarzy, czyli brak typowych błędów AI |
| 03 WARSTWY | `foto-01`, `foto-05`, `foto-07`, `foto-09` | 17_59_30 (1), 17_59_32 (5), 17_59_32 (7), 17_59_33 (8) | Jedyna prawdziwa seria w całym zestawie: szyja, staw skokowy, łokieć, nadgarstek. Ten sam render, ta sama paleta, ta sama orientacja pionowa, więc da się z nich złożyć siatkę czterech kafli |
| 04 LECZENIE | `foto-13.webp` | 17_59_43 (3) | Mobilizacja lędźwi. Najbardziej wiarygodny zabieg w całym materiale: czytelne dłonie, spokojna twarz pacjentki |
| 05 EFEKT | `foto-34`, `foto-29` | 18_16_06 (4), 18_15_53 (10) | Ćwiczenie z taśmą w domu plus trening równowagi. Pokazują życie po terapii, a nie kolejny gabinet |
| 06 OPINIE | brak zdjęć | — | Świadomie bez zdjęć. Twarze wygenerowane przez AI przy cytatach realnych klientów byłyby wprowadzaniem w błąd |
| 07 CENNIK | `foto-40.webp` | 18_16_07 (9) | Martwa natura akcesoriów na dębowym blacie. Bez ludzi i bez anatomii, więc zero ryzyka. Użyte jako przyciemnione tło |
| 08 FAQ | brak zdjęć | — | W całym zestawie nie ma czystej planszy bez tematu medycznego. Sekcja dostała płaskie tło |
| 09 KONTAKT | `foto-36.webp` | 18_16_06 (6) | Kobieta schodzi ze schodów w parku. Domyka historię: pacjent wraca do normalnego życia |

Na stronie głównej leży **11 zdjęć o łącznej wadze 866 KB**. Pozostałe 29 plików WebP
są w repozytorium jako zapas pod kolejne wersje.

---

## Zdjęcia odrzucone i powód

Krytyk odrzucił **11 pozycji**. Najważniejsze:

| Plik | Powód odrzucenia |
|---|---|
| `foto-37` (18_16_07 (10)) | Wachlarz co najmniej sześciu dodatkowych ramion, część wyrasta zza głowy. Dłonie duchów mają błędną liczbę palców. Katalog omyłkowo kierował to na HERO |
| `foto-17` (17_59_46 (7)) | Błąd ciągłości: w tym kadrze blondynka gra terapeutkę, a w dwóch innych z tej samej serii jest pacjentką. Ta sama osoba raz leczy, raz jest leczona |
| `foto-02` (17_59_31 (2)) | Kręgosłup się dwoi, biegnie druga równoległa kolumna kręgów. Miednica narysowana tylko po jednej stronie. Sylwetka naga |
| `foto-04` (17_59_31 (4)) | Rzepka odklejona od stawu, wisi jako wolna bryła bez więzadła. Katalog ocenił to na 5 i nazwał najczystszym obrazem, co było błędem |
| `foto-35` (18_16_06 (5)) | Jedyne zdjęcie z tekstem na obrazie: pseudointerfejs analizy chodu z fałszywymi etykietami. Sugeruje sprzęt diagnostyczny, którego gabinet może nie mieć |
| `foto-10` (17_59_33 (9)) | Nagie pośladki bez draperii. Mięsień pośladkowy narysowany na skórze zamiast pod nią |

Pełne uzasadnienia są w wyniku przebiegu wieloagentowego.

---

## Ostrzeżenia, które trzeba obsłużyć przed kampanią

### 1. Zdjęcia mają wbudowany znak wodny OpenAI

Wszystkie 40 plików zawiera poświadczenia C2PA: `softwareAgent: gpt-image`, podpis
OpenAI, oraz kod IPTC `digitalSourceType: trainedAlgorithmicMedia`. W manifeście jest
akcja `c2pa.watermarked.unbound`, czyli **niewidzialny znak wodny wpisany w same piksele**.

Konwersja do WebP, przeskalowanie ani rekompresja tego nie usuwają. Te zdjęcia
pozostaną wykrywalne jako wygenerowane przez AI. Każdy może to sprawdzić na
`verify.contentauthenticity.org`.

Wniosek: nie da się i nie należy tego ukrywać. Dlatego w stopce strony jest jawna
informacja, że grafiki są generowane i mają charakter poglądowy. To zamienia
potencjalny zarzut w przejrzystość.

### 2. Termin z unijnego aktu o sztucznej inteligencji

Obowiązki przejrzystości dla treści syntetycznych (art. 50 EU AI Act) zaczynają
obowiązywać **2 sierpnia 2026**. Strona jest już oznaczona w stopce i w polityce
prywatności.

**NIEZWERYFIKOWANE:** nie jestem prawnikiem i nie sprawdzałem polskiej ustawy
wdrażającej. Przed startem kampanii warto przepuścić to przez prawnika.

### 3. Materiał to nie jest jeden spójny zestaw

Krytyk wykazał, że 40 zdjęć to cztery obce sobie rodziny stylistyczne plus dziesięć
pojedynczych sztuk. Kolor koszulki terapeuty zmienia się sześć razy, wnętrze raz jest
białą kliniką, raz ciepłym drewnem, raz betonem.

Dlatego na stronie użyłem **wyłącznie rodziny turkusowej i renderów anatomicznych**,
a nie miksu wszystkiego. Jeśli będziemy dokładać zdjęcia, mają być dogenerowane pod
tę jedną rodzinę.

### 4. Rozdzielczość jest na granicy

Zmierzone wymiary: poziome 1672×941, pionowe 1122×1402, kwadratowe 1254×1254.
Na monitorze 1440 px z podwójną gęstością pikseli hero potrzebuje około 2880 px.
Obecne zdjęcie hero będzie rozciągane około 1,7 raza i może być lekko miękkie.

To przestanie mieć znaczenie w momencie, gdy hero zastąpi film z Higgsfield.
Do tego czasu jest akceptowalne, ale warto o tym wiedzieć.

### 5. Twarze

Około 22 z 40 zdjęć pokazuje ostre twarze wygenerowanych ludzi. Na naszym landingu
to mniejszy problem niż na stronie gabinetu, bo my nie udajemy, że to nasz zespół
ani nasi pacjenci. Mimo to świadomie **nie użyłem żadnej wyraźnej twarzy przy opiniach
klientów** i wybrałem kadry bez twarzy albo z twarzami w dalszym planie.

---

## Paleta strony

Kolory wyciągnięte ze zdjęć, żeby strona i materiał wyglądały jak jedna całość:

| Zmienna | Kod | Zastosowanie |
|---|---|---|
| `--tlo` | `#0A0F16` | tło strony |
| `--tlo-2` | `#111925` | sekcje przeplatane |
| `--akcent` | `#3FBFB3` | turkus z koszulek terapeutów, rozjaśniony pod ciemne tło |
| `--akcent-ciemny` | `#2E6E77` | turkus oryginalny ze zdjęć |
| `--piasek` | `#D8B583` | drewno lameli |
| `--alarm` | `#D9422C` | czerwone punkty bólu z renderów, sekcja diagnozy |
| `--granat` | `#2A3450` | granat leżanek |

---

## Czego w materiale brakuje

1. **Serii kafli usług** w identycznym kadrze i świetle. Bez tego nie da się zrobić
   siatki zabiegów.
2. **Kadrów pionowych** pod telefon. 27 z 40 to poziome paski.
3. **Czystych plansz** z miejscem na nagłówek.
4. **Czegokolwiek polskiego.** Żadne zdjęcie nie ma detalu, który mówi „to jest Polska".
5. **Prawdziwych zdjęć zespołu**, jeśli kiedykolwiek mielibyśmy pokazywać ludzi
   jako nas. Tego nie wolno domykać generatorem.
