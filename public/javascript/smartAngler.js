//Prendo le variabili salvate in localStorage
const svdAnglerName = localStorage.getItem('svdAnglerName')
//const svdAnglerImageSrc = localStorage.getItem('svdAnglerImageSrc')
//const svdAnglerNikName = localStorage.getItem('svdAnglerNikName')

//Prendo gli elementi del document
const anglerName = document.getElementById('anglerName')
//const anglerImageSrc = document.getElementById('img')
//const anglerNikName = document.getElementById('anglerNikName')

//Associo le variabili salvate agli elementi del document
anglerName.textContent = svdAnglerName
// anglerName.textContent = `Catture di ${svdAnglerName}`
//img.src = svdAnglerImageSrc
//anglerNikName.textContent = svdAnglerNikName

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
        const angler = document.getElementById('anglerName');

        //Se carp.angler è uguale a angler.name, crea un elemento HTML e aggiungilo al contenitore
        catture.forEach(carp => {
            if (carp.angler == angler.textContent) {
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