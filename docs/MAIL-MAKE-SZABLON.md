# Szablon maila z leadem (moduł "Send an Email" w Make)

Dotyczy scenariusza: **Custom webhook (moduł 2) → Send an Email (moduł 3)**
dla landingu `https://strona-dla-fizjo.vercel.app/`.

Podgląd gotowego maila z przykładowymi danymi: `docs/podglad-maila.html`
(kliknij dwa razy, otworzy się w przeglądarce).

---

## NAJPIERW: dwie rzeczy do sprawdzenia w Make

### 1. Adres odbiorcy ma literówkę

Na Twoim zrzucie ekranu w polu **To → Email address 1** widnieje:

```
8visionai@gmial.com
```

Powinno być `gmail.com`, a jest **`gmial.com`**. To nie jest czepianie się:
`gmial.com` to istniejąca domena podszywająca się pod Gmaila, znana z przechwytywania
źle wpisanych adresów. Jeśli ten wpis zostanie, **dane osobowe leadów (nazwa gabinetu,
miasto, numer telefonu) będą wysyłane pod obcy adres**, a Ty nie dostaniesz zgłoszenia.

Popraw to pole, zanim ruszy kampania.

### 2. Trzeba jeszcze raz kliknąć "Redetermine data structure"

Dołożyłem do zgłoszenia dwa nowe pola: `telefon_link` i `czas_pl`.
Make renderuje nieznane pola jako **puste, bez żadnego błędu**, więc bez tego kroku
w mailu w tych miejscach będą dziury.

---

## Pełna lista pól przychodzących z formularza (10)

| Pole | Przykład | Do czego |
|---|---|---|
| `gabinet` | Gabinet Fizjoterapii Kowalski | nazwa gabinetu |
| `miasto` | Jawor | miasto |
| `telefon` | 600 100 200 | numer tak, jak wpisał człowiek |
| `telefon_link` | 600100200 | ten sam numer bez spacji, do linku `tel:` |
| `zgoda` | tak | czy zaznaczył zgodę |
| `zgoda_tresc` | Zgadzam się na kontakt... | dokładna treść zgody, dowód RODO |
| `zrodlo` | landing fizjoterapeuci | z którego landingu przyszedł lead |
| `strona` | https://strona-dla-fizjo.vercel.app/ | dokładny adres strony |
| `czas` | 2026-08-07T21:55:12.345Z | czas w formacie technicznym, do sortowania |
| `czas_pl` | 07.08.2026, 23:55 | czas po polsku, gotowy do maila |

---

## Kolejność wykonania

1. W module **Custom webhook** kliknij **Redetermine data structure**.
2. Wejdź na `https://strona-dla-fizjo.vercel.app/`, zrób **Ctrl+Shift+R**
   i wyślij formularz. Make złapie nową strukturę z dziesięcioma polami.
3. Otwórz moduł **Send an Email** i popraw adres w polu **To** na `8visionai@gmail.com`.
4. W pole **Subject** wklej treść z sekcji SUBJECT poniżej.
5. Content Type zostaw na **HTML**.
6. W pole **Content** wklej całość z sekcji CONTENT poniżej.
7. Zapisz, włącz scenariusz, wyślij formularz jeszcze raz i sprawdź mail.

Jeśli po wklejeniu któreś pole wyjdzie puste, to znaczy że krok 1 albo 2 nie zadziałał.
Wtedy powtórz Redetermine i wyślij formularz ponownie.

---

## SUBJECT

Dzięki temu widzisz cały lead z listy maili, bez otwierania wiadomości.

```
Lead fizjo: {{2.gabinet}} ({{2.miasto}}) tel. {{2.telefon}}
```

---

## CONTENT

Wklej dokładnie to, w całości, w pole Content przy Content Type ustawionym na HTML.

```html
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0;padding:0;background:#F4F6F8;">
<tr><td align="center" style="padding:24px 12px;font-family:Arial,Helvetica,sans-serif;">

<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;background:#FFFFFF;border-radius:10px;overflow:hidden;border:1px solid #E3E7EC;">

<tr><td style="background:#0E141D;padding:18px 28px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td style="font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;color:#FFFFFF;letter-spacing:.02em;">SimpleFast<span style="color:#3FBFB3;">.ai</span></td>
<td align="right" style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#8C99A8;letter-spacing:.08em;text-transform:uppercase;">{{2.zrodlo}}</td>
</tr></table>
</td></tr>

<tr><td style="padding:30px 28px 6px;">
<div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;color:#3FBFB3;letter-spacing:.12em;text-transform:uppercase;padding-bottom:8px;">Nowe zgłoszenie z formularza</div>
<div style="font-family:Arial,Helvetica,sans-serif;font-size:25px;font-weight:bold;color:#0E141D;line-height:1.25;">{{2.gabinet}}</div>
<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#5F6D7F;padding-top:6px;">{{2.miasto}}</div>
</td></tr>

<tr><td style="padding:22px 28px 0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F7F9FA;border:1px solid #E3E7EC;border-radius:8px;">
<tr><td style="padding:18px 22px;">
<div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;color:#5F6D7F;letter-spacing:.1em;text-transform:uppercase;padding-bottom:6px;">Telefon</div>
<div style="font-family:Arial,Helvetica,sans-serif;font-size:27px;font-weight:bold;letter-spacing:.01em;line-height:1.2;">
<a href="tel:{{2.telefon_link}}" style="color:#0E141D;text-decoration:none;">{{2.telefon}}</a>
</div>
</td></tr>
</table>
</td></tr>

<tr><td style="padding:16px 28px 0;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
<td style="background:#3FBFB3;border-radius:6px;">
<a href="tel:{{2.telefon_link}}" style="display:inline-block;padding:13px 28px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;color:#04231F;text-decoration:none;">Zadzwoń teraz</a>
</td>
</tr></table>
</td></tr>

<tr><td style="padding:24px 28px 0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td width="50%" style="padding:0 8px 0 0;vertical-align:top;">
<div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;color:#5F6D7F;letter-spacing:.1em;text-transform:uppercase;padding-bottom:4px;">Kiedy</div>
<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#0E141D;">{{2.czas_pl}}</div>
</td>
<td width="50%" style="padding:0 0 0 8px;vertical-align:top;">
<div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;color:#5F6D7F;letter-spacing:.1em;text-transform:uppercase;padding-bottom:4px;">Zgoda na kontakt</div>
<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;color:#1E8E63;">{{2.zgoda}}</div>
</td>
</tr>
</table>
</td></tr>

<tr><td style="padding:22px 28px 0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-left:3px solid #D8B583;background:#FBF8F3;border-radius:0 6px 6px 0;">
<tr><td style="padding:14px 18px;">
<div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;color:#8A6D3B;letter-spacing:.1em;text-transform:uppercase;padding-bottom:6px;">Na co dokładnie wyraził zgodę</div>
<div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#5F5245;line-height:1.55;">{{2.zgoda_tresc}}</div>
</td></tr>
</table>
</td></tr>

<tr><td style="padding:24px 28px 28px;">
<div style="border-top:1px solid #E3E7EC;padding-top:14px;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#8C99A8;line-height:1.7;">
Zgłoszenie z formularza na stronie <a href="{{2.strona}}" style="color:#2E8F86;text-decoration:none;">{{2.strona}}</a><br>
Znacznik czasu: {{2.czas}}<br>
Wiadomość wysłana automatycznie przez scenariusz Make po wypełnieniu formularza.
</div>
</td></tr>

</table>

<div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#A3AEBB;padding-top:14px;">SimpleFast.ai, automatyczne powiadomienie o leadzie</div>

</td></tr>
</table>
```

---

## Jak to wygląda w skrzynce

- **Temat:** `Lead fizjo: Gabinet Fizjoterapii Kowalski (Jawor) tel. 600 100 200`
- **W treści:** ciemny pasek z logo i etykietą źródła, pod nim duża nazwa gabinetu,
  miasto, wyróżniony numer telefonu (klikalny, na telefonie od razu dzwoni),
  zielony przycisk "Zadzwoń teraz", czas zgłoszenia, potwierdzenie zgody,
  dokładna treść zgody na piaskowym tle jako dowód RODO, na końcu adres strony
  i znacznik czasu drobnym drukiem.

## Gdy dodasz drugi landing

Pole `zrodlo` jest po to, żeby jeden scenariusz obsłużył kilka stron.
Na tym landingu ma wartość `landing fizjoterapeuci`. Przy kolejnej stronie ustaw
inną wartość w `assets/js/app.js`, a w Make dodaj filtr albo router po tym polu.
Etykieta w prawym górnym rogu maila pokaże wtedy, z której strony przyszedł lead.
