document.addEventListener('DOMContentLoaded', function() { 
    const form = document.getElementById('jelentkezesiUrlap');
    const nev = document.getElementById('nev');
    const telefon = document.getElementById('telefon');
    const email = document.getElementById('email');
    const rendezveny1 = document.getElementById('rendezveny1');
    const resztvevok = document.getElementById('resztvevok');
    const submitBtn = document.getElementById('submitBtn');
    
    // Rendezvények betöltése JSON-ből
    betoltRendezvenyeket();
    
    const validaciok = {
        nev: false,
        telefon: false,
        email: false,
        rendezveny1: false,
        resztvevok: false
    };

    // Rendezvények betöltése a dropdown-ba
    async function betoltRendezvenyeket() {
        try {
            const response = await fetch('events.json');
            
            if (!response.ok) {
                throw new Error('Nem sikerült betölteni a rendezvényeket');
            }
            
            const rendezvenyek = await response.json();
            
            // Dropdown feltöltése
            rendezveny1.innerHTML = '<option value="">-- Válasszon rendezvényt --</option>';
            
            rendezvenyek.forEach(rendezveny => {
                const option = document.createElement('option');
                option.value = rendezveny.id;
                option.textContent = rendezveny.nev;
                rendezveny1.appendChild(option);
            });
            
        } catch (error) {
            console.error('Hiba a rendezvények betöltésekor:', error);
            rendezveny1.innerHTML = '<option value="">Hiba a betöltés során</option>';
        }
    }

    function ellenorizSubmit() {
        const mindenHelyes = Object.values(validaciok).every(val => val === true);
        submitBtn.disabled = !mindenHelyes;
    }

    function validateNev() {
        const erteke = nev.value.trim();
        const hibaElem = document.getElementById('nevHiba');
        
        if (erteke.length === 0) {
            hibaElem.textContent = 'A név megadása kötelező!';
            hibaElem.style.display = 'block';
            nev.classList.add('error');
            nev.classList.remove('valid');
            validaciok.nev = false;
        } else if (erteke.length < 3) {
            hibaElem.textContent = 'A névnek legalább 3 karakter hosszúnak kell lennie!';
            hibaElem.style.display = 'block';
            nev.classList.add('error');
            nev.classList.remove('valid');
            validaciok.nev = false;
        } else {
            hibaElem.style.display = 'none';
            nev.classList.remove('error');
            nev.classList.add('valid');
            validaciok.nev = true;
        }     
        ellenorizSubmit();
    }

    function validateTelefon() {
        const erteke = telefon.value.trim();
        const hibaElem = document.getElementById('telefonHiba');
        const telefonRegex = /^(\+36|06)(20|30|31|50|70)[0-9]{7}$/;
        const telefonRegexKotojellel = /^(\+36|06)[-\s]?(20|30|31|50|70)[-\s]?[0-9]{3}[-\s]?[0-9]{4}$/;
        const tisztitottTelefon = erteke.replace(/[-\s]/g, '');
        
        if (erteke.length === 0) {
            hibaElem.textContent = 'A telefonszám megadása kötelező!';
            hibaElem.style.display = 'block';
            telefon.classList.add('error');
            telefon.classList.remove('valid');
            validaciok.telefon = false;
        } else if (!telefonRegex.test(tisztitottTelefon) && !telefonRegexKotojellel.test(erteke)) {
            hibaElem.textContent = 'Érvénytelen telefonszám formátum! (pl. +36301234567 vagy 06301234567)';
            hibaElem.style.display = 'block';
            telefon.classList.add('error');
            telefon.classList.remove('valid');
            validaciok.telefon = false;
        } else {
            hibaElem.style.display = 'none';
            telefon.classList.remove('error');
            telefon.classList.add('valid');
            validaciok.telefon = true;
        }
        
        ellenorizSubmit();
    }

    function validateEmail() {
        const erteke = email.value.trim();
        const hibaElem = document.getElementById('emailHiba');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (erteke.length === 0) {
            hibaElem.textContent = 'Az e-mail cím megadása kötelező!';
            hibaElem.style.display = 'block';
            email.classList.add('error');
            email.classList.remove('valid');
            validaciok.email = false;
        } else if (!emailRegex.test(erteke)) {
            hibaElem.textContent = 'Érvénytelen e-mail cím formátum! (pl. pelda@email.hu)';
            hibaElem.style.display = 'block';
            email.classList.add('error');
            email.classList.remove('valid');
            validaciok.email = false;
        } else {
            hibaElem.style.display = 'none';
            email.classList.remove('error');
            email.classList.add('valid');
            validaciok.email = true;
        }           
        ellenorizSubmit();
    }

    function validateRendezveny() {
        const erteke = rendezveny1.value;
        const hibaElem = document.getElementById('rendezveny1Hiba');
        
        if (erteke === '') {
            hibaElem.textContent = 'Kérjük, válasszon egy rendezvényt!';
            hibaElem.style.display = 'block';
            rendezveny1.classList.add('error');
            rendezveny1.classList.remove('valid');
            validaciok.rendezveny1 = false;
        } else {
            hibaElem.style.display = 'none';
            rendezveny1.classList.remove('error');
            rendezveny1.classList.add('valid');
            validaciok.rendezveny1 = true;
        }
        
        ellenorizSubmit();
    }

    function validateResztvevok() {
        const erteke = parseInt(resztvevok.value);
        const hibaElem = document.getElementById('resztvevokHiba');
        
        if (isNaN(erteke) || resztvevok.value.trim() === '') {
            hibaElem.textContent = 'A résztvevők számának megadása kötelező!';
            hibaElem.style.display = 'block';
            resztvevok.classList.add('error');
            resztvevok.classList.remove('valid');
            validaciok.resztvevok = false;
        } else if (erteke < 1) {
            hibaElem.textContent = 'Minimum 1 résztvevő szükséges!';
            hibaElem.style.display = 'block';
            resztvevok.classList.add('error');
            resztvevok.classList.remove('valid');
            validaciok.resztvevok = false;
        } else if (erteke > 10) {
            hibaElem.textContent = 'Maximum 10 résztvevő lehet!';
            hibaElem.style.display = 'block';
            resztvevok.classList.add('error');
            resztvevok.classList.remove('valid');
            validaciok.resztvevok = false;
        } else {
            hibaElem.style.display = 'none';
            resztvevok.classList.remove('error');
            resztvevok.classList.add('valid');
            validaciok.resztvevok = true;
        }
        
        ellenorizSubmit();
    }

    nev.addEventListener('input', validateNev);
    nev.addEventListener('blur', validateNev);
    telefon.addEventListener('input', validateTelefon);
    telefon.addEventListener('blur', validateTelefon);
    email.addEventListener('input', validateEmail);
    email.addEventListener('blur', validateEmail);
    rendezveny1.addEventListener('change', validateRendezveny);
    resztvevok.addEventListener('input', validateResztvevok);
    resztvevok.addEventListener('blur', validateResztvevok);

    form.addEventListener('submit', function(e) {
        e.preventDefault();            
        validateNev();
        validateTelefon();
        validateEmail();
        validateRendezveny();
        validateResztvevok();
        
        if (Object.values(validaciok).every(val => val === true)) {
            alert('Sikeres jelentkezés!\n\nNév: ' + nev.value + '\nTelefon: ' + telefon.value + '\nE-mail: ' + email.value + '\nRendezvény: ' + rendezveny1.options[rendezveny1.selectedIndex].text + '\nRésztvevők: ' + resztvevok.value + ' fő');
            form.reset();
            
            Object.keys(validaciok).forEach(key => validaciok[key] = false);
            document.querySelectorAll('.valid, .error').forEach(elem => {
                elem.classList.remove('valid', 'error');
            });
            ellenorizSubmit();
        }
    });

    submitBtn.disabled = true;
});