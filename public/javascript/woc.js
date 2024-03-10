// Recupera i dati della collezione "pesces" dal server
fetch('/getFishList')
.then(response => response.json())
.then(data => {
    // Trova l'elemento del DOM dove inserire i dati
    carps = data
    generateCarps(carps)

    function generateCarps(wallOfCarp) {
        const carps = document.getElementById('carps-container');
        
        // Per ogni pesce nella lista, crea un elemento HTML e aggiungilo al contenitore
        wallOfCarp.forEach(carp => {
            const container = document.createElement('div');
            const imgContainer = document.createElement('a');
            const img = document.createElement('img');
            const text = document.createElement('p');
            
            container.className = "card"
            container.id = "card"
            imgContainer.href = "smartCarp.html"
            let imageSrcMod1 = carp.imageSrc.substring(7);
            let imageSrcMod2 = imageSrcMod1.replace(/\\/g,'/');
            img.src = imageSrcMod2;
            text.textContent = carp.name

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'x';
            deleteButton.classList.add('delete-button');
            deleteButton.dataset.id = carp._id; // Imposta l'ID del pesce come attributo data-id
    
            // Aggiungi un gestore di eventi per il clic su ciascun pulsante "Cancella"
            deleteButton.addEventListener('click', async () => {
                const isConfirmed = confirm('Sei sicuro di voler eliminare questo pesce?');
                if (isConfirmed) {
                    try {
                        const response = await fetch(`/deleteFish/${carp._id}`, {
                            method: 'DELETE'
                        });
                        const data = await response.json();
                        console.log(data);
    
                        // Rimuovi il div card dal DOM
                        container.remove();
                    } catch (error) {
                        console.error('Errore durante l\'eliminazione del pesce:', error);
                    }
                }
            });
            
            imgContainer.appendChild(img)
            container.appendChild(imgContainer)
            container.appendChild(text)
            container.appendChild(deleteButton)
            carps.appendChild(container)

            img.addEventListener('click', event => {
                localStorage.setItem('svdCarpName', carp.name);
                localStorage.setItem('svdCarpType', carp.species);
                localStorage.setItem('svdCarpWeight', carp.weight);
                localStorage.setItem('svdCarpImageSrc', carp.imageSrc);
                localStorage.setItem('svdCarpSpotName', carp.spot);
                localStorage.setItem('svdCarpAnno', carp.anno);
                localStorage.setItem('svdCarpEsca', carp.esca);
                localStorage.setItem('svdCarpAngler', carp.angler);
                localStorage.setItem('svdCarpId', carp._id);
            })
            
        })
        .catch(error => {
            console.error('Error fetching fish list:', error);
        });
    }

})