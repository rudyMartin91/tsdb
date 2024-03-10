//Invio dati del form al server
anglerForm = document.getElementById('anglerForm')
anglerForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const nikName = document.getElementById('nikName').value;
    const paese = document.getElementById('paese').value;
    const image = document.getElementById('anglerImage').files[0];
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('nikName', nikName);
    formData.append('paese', paese);
    formData.append('anglerImage', image);

    try {
        // Effettua una richiesta POST al server per aggiungere una nuovo angler
        const response = await fetch('/addAngler', {
            method: 'POST',
            body: formData
        });

        // Se la richiesta ha avuto successo, svuota i campi del form
        if (response.ok) {
            document.getElementById('name').value = '';
            document.getElementById('nikName').value = '';
            document.getElementById('paese').value = '';
            document.getElementById('anglerImage').value = '';

            alert('Nuovo angler aggiunto con successo!');

        } else {
            console.error('Errore durante l\aggiunta:', response.statusText);
        }
    } catch (error) {
        console.error('Errore durante l\aggiunta:', error);
    }
});