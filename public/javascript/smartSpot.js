//Prendo le variabili salvate in localStorage
const svdSpotName = localStorage.getItem('svdSpotName')
const svdSpotImage = localStorage.getItem('svdSpotImageSrc')
const svdSpotAcque = localStorage.getItem('svdSpotAcque')
const svdSpotPaese = localStorage.getItem('svdSpotPaese')
const svdSpotDescr = localStorage.getItem('svdSpotDescr')
const svdSpotCoordX = localStorage.getItem('svdSpotCoordX')
const svdSpotCoordY = localStorage.getItem('svdSpotCoordY')

//Prendo gli elementi del document
const spotName = document.getElementById('spotName')
const spotImage = document.getElementById('img')
const spotAcque = document.getElementById('spotAcque')
const spotPaese = document.getElementById('spotPaese')
const spotDescr = document.getElementById('spotDescr')
const spotCoordX = document.getElementById('spotCoordX')
const spotCoordY = document.getElementById('spotCoordY')
//Associo le variabili salvate agli elementi del document

let imageSrcMod1 = svdSpotImage.substring(7);
let imageSrcMod2 = imageSrcMod1.replace(/\\/g, '/');
spotImage.src = imageSrcMod2;

spotName.textContent = svdSpotName
spotAcque.textContent = svdSpotAcque
spotPaese.textContent = svdSpotPaese
spotDescr.textContent = svdSpotDescr
spotCoordX.textContent = svdSpotCoordX
spotCoordY.textContent = svdSpotCoordY

// Funzione per gestire il clic sul pulsante di modifica
function handleEditButtonClick() {
    const editButton = document.getElementById('editButton');
    const confirmButton = document.getElementById('confirmButton');

    editButton.style.display = 'none';
    confirmButton.style.display = 'block';

    // Abilita l'editing dei campi
    const editableFields = document.querySelectorAll('.editable-field');
    editableFields.forEach(field => {
        field.setAttribute('contenteditable', 'true');
    });

    // Ottieni l'ID dello spot salvato con localStorage
    const id = localStorage.getItem('svdSpotId');
    if (!id) {
        console.error('ID dello spot non trovato in localStorage');
        return;
    }

    // Memorizza l'ID del pesce come attributo data del pulsante di conferma
    confirmButton.dataset.id = id;
}

// Funzione per gestire il clic sul pulsante di conferma
function handleConfirmButtonClick() {
    const editButton = document.getElementById('editButton');
    const confirmButton = document.getElementById('confirmButton');

    editButton.style.display = 'block';
    confirmButton.style.display = 'none';

    // Disabilita l'editing dei campi
    const editableFields = document.querySelectorAll('.editable-field');
    editableFields.forEach(field => {
        field.setAttribute('contenteditable', 'false');
    });

    // Ottieni l'ID dello spot dall'attributo data del pulsante di conferma
    const id = confirmButton.dataset.id;

    // Ottieni i dati aggiornati dai campi modificati
    const updatedSpotData = {
        name: spotName.textContent,
        paese: spotPaese.textContent,
        acque: spotAcque.textContent,
        descr: spotDescr.textContent,
        coordX: spotCoordX.textContent,
        coordY: spotCoordY.textContent
    };

    // Invia i dati aggiornati al server, insieme all'ID dello spot
    fetch(`/updateSpotData/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedSpotData)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log della risposta del server
            // Aggiungi eventuali azioni aggiuntive dopo l'aggiornamento dei dati
        })
        .catch(error => {
            console.error('Errore durante l\'aggiornamento dei dati:', error);
        });
}

// Ascoltatori per i clic sui pulsanti di modifica e conferma
const editButton = document.getElementById('editButton');
const confirmButton = document.getElementById('confirmButton');

editButton.addEventListener('click', handleEditButtonClick);
confirmButton.addEventListener('click', handleConfirmButtonClick);

//Filtraggio carpe catturate nel determinato spot
//if (carp.carpSpotName == spot.textContent) {
// Recupera i dati della collezione "pesces" dal server

fetch('/getFishList')
.then(response => response.json())
.then(data => {
    // Trova l'elemento del DOM dove inserire i dati
    carps = data
    generateCarpsCatture(carps)

    function generateCarpsCatture(catture) {
        const carps = document.getElementById('carps-container');
        const spot = document.getElementById('spotName');

        //Se carp.spot è uguale a spot.name, crea un elemento HTML e aggiungilo al contenitore
        catture.forEach(carp => {
            if (carp.spot == spot.textContent) {
                const container = document.createElement('div');
                const imgContainer = document.createElement('a');
                const img = document.createElement('img');
                const text = document.createElement('p');

                container.className = "card"
                container.id = "card"
                imgContainer.href = "smartCarp.html"
                let imageSrcMod1 = carp.imageSrc.substring(7);
                let imageSrcMod2 = imageSrcMod1.replace(/\\/g, '/');
                img.src = imageSrcMod2;
                text.textContent = carp.name

                imgContainer.appendChild(img)
                container.appendChild(imgContainer)
                container.appendChild(text)
                carps.appendChild(container)

                img.addEventListener('click', event => {
                    localStorage.setItem('svdCarpName', carp.name);
                    localStorage.setItem('svdCarpType', carp.species);
                    localStorage.setItem('svdCarpWeight', carp.weight);
                    localStorage.setItem('svdCarpImageSrc', carp.imageSrc);
                    localStorage.setItem('svdCarpSpotName', carp.spot);
                    localStorage.setItem('svdCarpData', carp.data);
                    localStorage.setItem('svdCarpEsca', carp.esca);
                    localStorage.setItem('svdCarpAngler', carp.angler);
                })
            }
        })
        // .catch(error => {
        //     console.error('Error fetching fish list:', error);
        // });
    }

})