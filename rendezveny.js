let osszesRendezveny = [];
let aktivalKategoria = 'mind';

document.addEventListener('DOMContentLoaded', function() {
    betoltRendezvenyeket();
    document.getElementById('keresomező').addEventListener('input', szuresRendezvenyekre);
});

async function betoltRendezvenyeket() {
    try {
        const response = await fetch('events.json');
        
        if (!response.ok) {
            throw new Error('Nem sikerült betölteni a rendezvényeket');
        }
        
        osszesRendezveny = await response.json();
        
        letrehozKategoriaGombokat();
        megjelenítRendezvenyeket(osszesRendezveny);
        document.getElementById('betoltes').style.display = 'none';
        
    } catch (error) {
        console.error('Hiba a rendezvények betöltésekor:', error);
        document.getElementById('betoltes').innerHTML = 'Hiba történt a rendezvények betöltésekor.';
    }
}

function letrehozKategoriaGombokat() {
    const kategoriak = ['mind', ...new Set(osszesRendezveny.map(r => r.kategoria))];
    const gombContainer = document.getElementById('kategoriaGombok');
    
    gombContainer.innerHTML = '';
    
    kategoriak.forEach(kategoria => {
        const gomb = document.createElement('button');
        gomb.className = 'kategoria-gomb';
        gomb.textContent = kategoria.charAt(0).toUpperCase() + kategoria.slice(1);
        gomb.setAttribute('data-kategoria', kategoria);
        
        if (kategoria === 'mind') {
            gomb.classList.add('active');
        }
        
        gomb.addEventListener('click', function() {
            kategoriaValtas(kategoria);
        });
        
        gombContainer.appendChild(gomb);
    });
}

function kategoriaValtas(kategoria) {
    aktivalKategoria = kategoria;
    
    document.querySelectorAll('.kategoria-gomb').forEach(gomb => {
        gomb.classList.remove('active');
        if (gomb.getAttribute('data-kategoria') === kategoria) {
            gomb.classList.add('active');
        }
    });
    
    szuresRendezvenyekre();
}

function szuresRendezvenyekre() {
    const keresoSzoveg = document.getElementById('keresomező').value.toLowerCase();
    let szurtRendezvenyek = osszesRendezveny;
    
    if (aktivalKategoria !== 'mind') {
        szurtRendezvenyek = szurtRendezvenyek.filter(r => r.kategoria === aktivalKategoria);
    }
    
    if (keresoSzoveg) {
        szurtRendezvenyek = szurtRendezvenyek.filter(r => 
            r.nev.toLowerCase().includes(keresoSzoveg)
        );
    }
    
    megjelenítRendezvenyeket(szurtRendezvenyek);
}

function megjelenítRendezvenyeket(rendezvenyek) {
    const container = document.getElementById('esemenylista');
    const nincsTalalat = document.getElementById('nincsTalalat');
    
    container.innerHTML = '';
    
    if (rendezvenyek.length === 0) {
        nincsTalalat.style.display = 'block';
        return;
    }
    
    nincsTalalat.style.display = 'none';
    
    rendezvenyek.forEach(rendezveny => {
        const kartya = document.createElement('div');
        kartya.className = 'kartyak';
        
        kartya.innerHTML = `
            <ul style="font-size: 20px;">
                <p style="margin-bottom: 15px;">${rendezveny.nev}</p>
                <li>Időpont: ${rendezveny.datum}</li>
                <li>Helyszín: ${rendezveny.helyszin}</li>
                <li>Belépés: ${rendezveny.belepes}</li>
                <br>
                <li>${rendezveny.leiras}</li>
                <br>
                <span class="kategoria-badge">${rendezveny.kategoria}</span>
            </ul>
        `;
        
        container.appendChild(kartya);
    });
}