// Recupera i dati della collezione "anglers" dal server
fetch("/getAnglersList")
    .then(response => response.json())
    .then(data => {
        anglers = data
        generateAnglers(anglers)
        
        function generateAnglers(listAngler) {
            const anglers = document.getElementById("anglers-container")
        
            listAngler.forEach(angler => {
                const container = document.createElement("div")
                const imgContainer = document.createElement("a")
                const img = document.createElement("img")
                const text = document.createElement("p")
        
                container.className = "card"
                container.id = "card"
                imgContainer.href = "smartAngler.html"
                let imageSrcMod1 = angler.imageSrc.substring(7);
                let imageSrcMod2 = imageSrcMod1.replace(/\\/g, '/');
                img.src = imageSrcMod2;
                text.textContent = angler.name
        
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'x';
                deleteButton.classList.add('delete-button');
                deleteButton.dataset.id = angler._id; // Imposta l'ID dell'angler come attributo data-id
        
                // Aggiungi un gestore di eventi per il clic su ciascun pulsante "Cancella"
                deleteButton.addEventListener('click', async () => {
                    const isConfirmed = confirm('Sei sicuro di voler eliminare questo angler?');
                    if (isConfirmed) {
                        try {
                            const response = await fetch(`/deleteAngler/${angler._id}`, {
                                method: 'DELETE'
                            });
                            const data = await response.json();
                            console.log(data);
        
                            // Rimuovi il div card dal DOM
                            container.remove();
                        } catch (error) {
                            console.error('Errore durante l\'eliminazione dell angler:', error);
                        }
                    }
                });
        
                imgContainer.appendChild(img)
                container.appendChild(imgContainer)
                container.appendChild(text)
                container.appendChild(deleteButton)
                anglers.appendChild(container)
        
                img.addEventListener('click', event => {
                    localStorage.setItem('svdAnglerName', angler.name);
                    localStorage.setItem('svdAnglerNikName', angler.nikName);
                    localStorage.setItem('svdAnglerImageSrc', angler.imageSrc);
                })
            })
            // .catch(error => {
            //     console.error('Error fetching fish list:', error);
            // });
        }
    })
