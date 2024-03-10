// Popola i campi del form con i valori estratti
document.getElementById('coordX').value = localStorage.getItem('svdCoordX');
document.getElementById('coordY').value = localStorage.getItem('svdCoordY');

spotForm = document.getElementById('spotForm')
spotForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const paese = document.getElementById('paese').value;
    const acque = document.getElementById('acque').value;
    const image = document.getElementById('spotImage').files[0];
    const descr = document.getElementById('descr').value;
    const coordX = document.getElementById('coordX').value;
    const coordY = document.getElementById('coordY').value;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('paese', paese);
    formData.append('acque', acque);
    formData.append('spotImage', image);
    formData.append('descr', descr);
    formData.append('coordX', coordX);
    formData.append('coordY', coordY);

    try {
        const response = await fetch('/addSpot', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        console.log(data);

        //MESSAGGIO CONFERMA
        const container = document.getElementById('confirm');
        const text = document.createElement('p');

        text.textContent = 'Nuovo spot aggiunto alla lista'

        container.appendChild(text)

        // Svuota i campi del form
        spotForm.reset();

    } catch (error) {
        console.error('Error:', error);
    }

});
