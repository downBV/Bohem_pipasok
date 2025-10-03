Fájlstruktúra
projekt/
├── index.html              # Főoldal
├── rendezvenyek.html       # Rendezvények listája
├── kapcsolat.html          # Jelentkezési űrlap
├── style.css              # Stílusok és responsive design
├── script.js              # Űrlap validáció (kapcsolat oldal)
├── rendezvenyek.js        # Rendezvény szűrés és keresés
├── hamburger.js           # Mobil hamburger menü
└── events.json            # Rendezvény adatok
Funkciók
Főoldal

Klub bemutatkozás
Navigációs menü

Rendezvények oldal

JSON alapú dinamikus rendezvénylista
Kategória szerinti szűrés (Mind, Verseny, Kiállítás, Kézműves, Digitalizáció, Társasági)
Élő keresés rendezvény név alapján
Responsive kártya layout hover effektekkel

Kapcsolat oldal

Jelentkezési űrlap validációval:

Név (min. 3 karakter)
Telefonszám (magyar formátum: +36301234567 vagy 06-30-123-4567)
E-mail cím (formátum ellenőrzés)
Rendezvény kiválasztása (dinamikusan töltődik az events.json-ből)
Résztvevők száma (1-10 fő)


Submit gomb csak érvényes adatok esetén aktív
Valós idejű hibaüzenetek

Responsive Design

Desktop (769px+): Teljes navigációs sáv, széles kártya layout
Tablet (768px-ig): Hamburger menü, optimalizált elrendezés
Mobil (480px-ig): Függőleges menü, mobilra optimalizált gombok
Kis mobil (360px-ig): Extra kis képernyők támogatása

Telepítés

Minden fájlt helyezz egy mappába
Nyisd meg az index.html fájlt böngészőben
Fontos: Helyi szerveren futtasd (pl. Live Server VS Code-ban) a JSON fetch működéséhez

Technológiák

HTML5
CSS3 (Flexbox, Media Queries)
Vanilla JavaScript (ES6+)
JSON adatkezelés
Fetch API

Böngésző támogatás
Modern böngészők (Chrome, Firefox, Safari, Edge) legújabb verziói.
Szerkesztés
Új rendezvény hozzáadása: szerkeszd az events.json fájlt a megfelelő formátumban.