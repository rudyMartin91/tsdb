//Crea il riquadro della mappa
var map = L.map('map');
map.setView([45.496270, 8.765716], 10);
map.addControl(new L.Control.Fullscreen({
    title: {
        'false': 'View Fullscreen',
        'true': 'Exit Fullscreen'
    }
}));

//Puntamento della mappa
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Quando si clicca sulla mappa
function onMapClick(e) {
    const coordX = e.latlng.lat; // Ottieni la latitudine del punto cliccato
    const coordY = e.latlng.lng; // Ottieni la longitudine del punto cliccato

    
    var addSpotButton = L.easyButton('<span>Add Spot Here</span>', function(){
        // Salva le coordinate nel localStorage
        localStorage.setItem('svdCoordX', coordX);
        localStorage.setItem('svdCoordY', coordY);
        
        // Reindirizza alla pagina per aggiungere lo spot
        window.location.href = 'addSpot.html';
    });

    addSpotButton.addTo(map);
}

map.on('click', onMapClick);

// Recupera i dati della collezione "spots" dal server

fetch('/getSpotsList')
    .then(response => response.json())
    .then(data => {
        spots = data
        generateMarker(spots)
        generateSpots(spots)

        //Creazione marker personalizzati
        function generateMarker(listaSpots) {
            var flag = L.icon({
                iconUrl: 'img/bandiera.png',
                iconSize: [30, 30],
                iconAnchor: [5, 30]
            })

            listaSpots.forEach(spot => {

                const popupContent = document.createElement('div')
                const text = document.createElement('p')
                const look = document.createElement('a')
                const icon = document.createElement('img')

                popupContent.className = "popup"
                text.textContent = spot.name
                look.href = 'smartSpot.html'
                icon.style.width = '26px'
                icon.src = 'img/search.svg'

                popupContent.appendChild(text)
                popupContent.appendChild(look)
                look.appendChild(icon)

                var marker = L.marker([spot.coordX, spot.coordY], { icon: flag })
                marker.addTo(map);
                marker.bindPopup(popupContent);

                look.addEventListener('click', event => {
                    localStorage.setItem('svdSpotName', spot.name);
                    localStorage.setItem('svdSpotPaese', spot.paese);
                    localStorage.setItem('svdSpotAcque', spot.acque);
                    localStorage.setItem('svdSpotImageSrc', spot.imageSrc);
                    localStorage.setItem('svdSpotDescr', spot.descr);
                    localStorage.setItem('svdSpotCoordX', spot.coordX);
                    localStorage.setItem('svdSpotCoordY', spot.coordY);
                    localStorage.setItem('svdSpotId', spot._id);
                })
            })
        }

        //C'è una funzione uguale anche in spots

        function generateSpots(listaSpots) {
            const spots = document.getElementById('spots-container');

            // Per ogni spot nella lista, crea un elemento HTML e aggiungilo al contenitore
            listaSpots.forEach(spot => {
                const container = document.createElement('div');
                const imgContainer = document.createElement('a');
                const img = document.createElement('img');
                const text = document.createElement('p');

                container.className = "card"
                container.id = "card"
                imgContainer.href = "smartSpot.html"
                let imageSrcMod1 = spot.imageSrc.substring(7);
                let imageSrcMod2 = imageSrcMod1.replace(/\\/g, '/');
                img.src = imageSrcMod2;
                text.textContent = spot.name

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'x';
                deleteButton.classList.add('delete-button');
                deleteButton.dataset.id = spot._id; // Imposta l'ID dello spot come attributo data-id

                // Aggiungi un gestore di eventi per il clic su ciascun pulsante "Cancella"
                deleteButton.addEventListener('click', async () => {
                    const isConfirmed = confirm('Sei sicuro di voler eliminare questo spot?');
                    if (isConfirmed) {
                        try {
                            const response = await fetch(`/deleteSpot/${spot._id}`, {
                                method: 'DELETE'
                            });
                            const data = await response.json();
                            console.log(data);

                            // Rimuovi il div card dal DOM
                            container.remove();
                        } catch (error) {
                            console.error('Errore durante l\'eliminazione dello spot:', error);
                        }
                    }
                });

                imgContainer.appendChild(img)
                container.appendChild(imgContainer)
                container.appendChild(text)
                container.appendChild(deleteButton)
                spots.appendChild(container)

                img.addEventListener('click', event => {
                    localStorage.setItem('svdSpotName', spot.name);
                    localStorage.setItem('svdSpotPaese', spot.paese);
                    localStorage.setItem('svdSpotAcque', spot.acque);
                    localStorage.setItem('svdSpotImageSrc', spot.imageSrc);
                    localStorage.setItem('svdSpotDescr', spot.descr);
                    localStorage.setItem('svdSpotCoordX', spot.coordX);
                    localStorage.setItem('svdSpotCoordY', spot.coordY);
                    localStorage.setItem('svdSpotId', spot._id);
                })

            })
            .catch(error => {
                console.error('Error fetching fish list:', error);
            });
        }

    })