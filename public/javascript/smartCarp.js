//Prendo le variabili salvate in localStorage
const svdCarpName = localStorage.getItem('svdCarpName')
const svdCarpType = localStorage.getItem('svdCarpType')
const svdCarpWeight = localStorage.getItem('svdCarpWeight')
const svdCarpImageSrc = localStorage.getItem('svdCarpImageSrc')
const svdCarpSpotName = localStorage.getItem('svdCarpSpotName')
const svdCarpAnno = localStorage.getItem('svdCarpAnno')
const svdCarpEsca = localStorage.getItem('svdCarpEsca')
const svdCarpAngler = localStorage.getItem('svdCarpAngler')
//Prendo gli elementi del document
const carpName = document.getElementById('carpName')
const carpImage = document.getElementById('img')
const carpType = document.getElementById('carpType')
const carpWeight = document.getElementById('carpWeight')
const carpSpotName = document.getElementById('carpSpotName')
const carpAnno = document.getElementById('carpAnno')
const carpEsca = document.getElementById('carpEsca')
const carpAngler = document.getElementById('carpAngler')
//Associo le variabili salvate agli elementi del document     

let imageSrcMod1 = svdCarpImageSrc.substring(7);
let imageSrcMod2 = imageSrcMod1.replace(/\\/g, '/');
carpImage.src = imageSrcMod2

carpName.textContent = svdCarpName
carpType.textContent = svdCarpType
carpWeight.textContent = svdCarpWeight
carpSpotName.textContent = svdCarpSpotName
carpAnno.textContent = svdCarpAnno
carpEsca.textContent = svdCarpEsca
carpAngler.textContent = svdCarpAngler

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

    // Ottieni l'ID del pesce salvato con localStorage
    const id = localStorage.getItem('svdCarpId');
    if (!id) {
        console.error('ID del pesce non trovato in localStorage');
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

    // Ottieni l'ID del pesce dall'attributo data del pulsante di conferma
    const id = confirmButton.dataset.id;

    // Ottieni i dati aggiornati dai campi modificati
    const updatedCarpData = {
        name: carpName.textContent,
        type: carpType.textContent,
        weight: carpWeight.textContent,
        spotName: carpSpotName.textContent,
        anno: carpAnno.textContent,
        esca: carpEsca.textContent,
        angler: carpAngler.textContent
    };

    // Invia i dati aggiornati al server, insieme all'ID del pesce
    fetch(`/updateCarpData/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedCarpData)
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
