// Fetch per ottenere i dati degli spots dal server
fetch('/getSpotsList')
    .then(response => response.json())
    .then(data => {
        const spotSelect = document.getElementById('spot');

        // Per ogni spot, crea un'opzione e aggiungila al select
        data.forEach(spot => {
            const option = document.createElement('option');
            // option.value = spot._id;
            option.textContent = spot.name;
            spotSelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error fetching spot list:', error);
    });

// Recupera i dati della collezione "anglers" dal server
fetch("/getAnglersList")
    .then(response => response.json())
    .then(data => {
        const anglerSelect = document.getElementById('angler');

        // Per ogni angler, crea un'opzione e aggiungila al select
        data.forEach(angler => {
            const option = document.createElement('option');
            // option.value = spot._id;
            option.textContent = angler.name;
            anglerSelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error fetching spot list:', error);
    });

//Invio dati del form al server
fishForm = document.getElementById('fishForm')
fishForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const species = document.getElementById('species').value;
    const weight = document.getElementById('weight').value;
    const image = document.getElementById('fishImage').files[0];
    const spot = document.getElementById('spot').value;
    const angler = document.getElementById('angler').value;
    const esca = document.getElementById('esca').value;
    const anno = document.getElementById('anno').value;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('species', species);
    formData.append('weight', weight);
    formData.append('fishImage', image);
    formData.append('spot', spot);
    formData.append('angler', angler);
    formData.append('esca', esca);
    formData.append('anno', anno);

    try {
        // Effettua una richiesta POST al server per aggiungere una nuova carpa
        const response = await fetch('/addFish', {
            method: 'POST',
            body: formData
        });

        // Se la richiesta ha avuto successo, svuota i campi del form
        if (response.ok) {
            document.getElementById('name').value = '';
            document.getElementById('species').selectedIndex = 0;
            document.getElementById('weight').value = '';
            document.getElementById('fishImage').value = '';
            document.getElementById('spot').selectedIndex = 0;
            document.getElementById('angler').selectedIndex = 0;
            document.getElementById('esca').value = '';
            document.getElementById('anno').value = '';
            alert('Nuova cattura aggiunta con successo!');
        } else {
            console.error('Errore durante l\aggiunta:', response.statusText);
        }
    } catch (error) {
        console.error('Errore durante l\aggiunta:', error);
    }
});