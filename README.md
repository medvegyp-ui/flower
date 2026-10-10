# Írországi virágtár

Telefonra optimalizált webapp írországi vad- és kerti virágok gyűjtésére fotók alapján. Minden fajhoz tartozik egy sematikus sziluett, amely a feltöltött fotóval lecserélődik. Külön csoportot kapnak a dáliatípusok (single, anemone, collerette, waterlily, decorative, ball, pompon, cactus, semi-cactus, orchid/egyéb).

## Funkciók

- **Két fül:** vadvirágok (55 faj) és kerti virágok (dáliatípusok és más kerti virágok).
- **Sziluett-kártyák:** a fotó nélküli fajok sematikus rajzzal jelennek meg, a fotóval rendelkezők a saját képükkel.
- **Hint gomb:** minden kártyán rövid felismerési tipp (mikor és hol található, mi a jellemzője).
- **Fotózás gomb:** a telefon kameráját nyitja meg. A **Galéria** gomb és a kártyákon a **+ Fotó** gomb a meglévő képekből választ.
- **Saját fajok:** ami nincs a listán, azt új névvel és csoporttal fel lehet venni mentéskor.
- **Keresés** angol, latin vagy ír név szerint, szűrés (Mind / Megvan / Hiányzik).
- **Offline is működik:** a fotók a készülék böngészőjében (IndexedDB) tárolódnak, szerver nélkül.
- **Mentés fájlba és visszatöltés:** az oldal alján, mert a böngészőadatok törlésével a fotók is elvesznek.
- **Telepíthető (PWA):** a böngésző „Hozzáadás a kezdőképernyőhöz” menüpontjával.

## Futtatás a GitHubról (GitHub Pages)

1. Töltsd fel a fájlokat egy új repository gyökerébe.
2. A repository **Settings → Pages** menüjében válaszd a **Deploy from a branch** opciót, az ágnak a `main`-t, a mappának a `/ (root)`-ot.
3. Pár perc múlva az app a `https://<felhasználónév>.github.io/<repo-neve>/` címen érhető el.

A kamera és a service worker csak HTTPS alatt működik, a GitHub Pages ezt biztosítja.

Helyi kipróbálás: a mappában futtasd a `python3 -m http.server 8000` parancsot, majd nyisd meg a `http://localhost:8000` címet.

## Fájlok

| Fájl | Tartalom |
| --- | --- |
| `index.html` | Az oldal váza |
| `style.css` | Kinézet (világos és sötét téma) |
| `species.js` | A fajlista és a sziluettek rajzolása |
| `app.js` | Működés: kártyák, feltöltés, helyi adatbázis, mentés/visszatöltés |
| `sw.js`, `manifest.webmanifest` | Offline működés, telepíthetőség |
| `icon.svg`, `icon-*.png` | Ikonok |

## Új faj hozzáadása

A `species.js` fájl `SPECIES` listájába vegyél fel egy sort:

```js
{id:'cowslip', g:'wild', en:'Cowslip', la:'Primula veris', ga:'',
 sp:R([[5,28,10,5,0,'n']],{r:4}), hint:'Ápr.–máj., rétek. Sárga, illatos virágok egyoldalú ernyőben.'},
```

- `g`: csoport (`wild`, `dahlia` vagy `garden`).
- `sp`: a sziluett leírása. A `R(...)` sugarasan elrendezett szirmokat rajzol: `[darab, hossz, szélesség, eltolás, elforgatás, forma]`, a forma `'o'` (kerek), `'p'` (hegyes), `'n'` (bevágott) vagy `'l'` (keskeny). Léteznek még `{t:'u',...}` (ernyő), `{t:'s',...}` (füzér) és `PEA` (borsóvirág) sablonok, ezekre nézd meg a már meglévő fajokat.

## Adatforrások

A fajnevek (angol, latin, ír) az [irishwildflowers.ie](https://irishwildflowers.ie/AZ-english.html) indexén alapulnak, amely a BSBI elterjedési térképeire mutat. Az előfordulási adatok forrása az Írországi Nemzeti Biodiverzitás Adatközpont (NBDC) és a GBIF. A listát szerkesztve állítottam össze, nem automatikus letöltés eredménye, ezért a hint-szövegeket és az ír neveket érdemes ellenőrizni.

Az app nem használ külső szervert, és nem küld fotót sehová.
