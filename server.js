// Importa i moduli necessari
const express = require('express');
const multer = require('multer'); // Per gestire il caricamento dei file
const fs = require('fs'); // Per leggere e scrivere file
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config(); // Per leggere le variabili d'ambiente dal file .env

// Crea un'applicazione Express
const app = express();
const port = 5000;

app.use(express.static('public'));
app.use(express.json());

// Connessione a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI) // , { useNewUrlParser: true, useUnifiedTopology: true }
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Definizione dello schema del pesce
const pesceSchema = new mongoose.Schema({
    name: String,
    species: String,
    weight: Number,
    imageSrc: String,
    spot: String,
    anno: Number,
    esca: String,
    angler: String
});

// Definizione dello schema dello spot
const spotSchema = new mongoose.Schema({
    name: String,
    paese: String,
    acque: String,
    imageSrc: String,
    descr: String,
    coordX: Number,
    coordY: Number
});

// Definizione dello schema dell angler
const anglerSchema = new mongoose.Schema({
    name: String,
    nikName: String,
    imageSrc: String,
    paese: String
});

// Modello del pesce basato sullo schema definito
const pesce = mongoose.model('pesce', pesceSchema);
// Modello dello spot basato sullo schema definito
const spot = mongoose.model('spot', spotSchema);
// Modello dell angler basato sullo schema definito
const angler = mongoose.model('angler', spotSchema);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

app.get('/', (req,res) => {
    res.sendFile('spots.html', {root: __dirname + "/public"})
})
app.get('/woc', (req,res) => {
    res.sendFile('wallOfCarp.html', {root: __dirname + "/public"})
})
app.get('/anglers', (req,res) => {
    res.sendFile('anglers.html', {root: __dirname + "/public"})
})
app.get('/addCarp', (req,res) => {
    res.sendFile('addCarp.html', {root: __dirname + "/public"})
})
app.get('/addSpot', (req,res) => {
    res.sendFile('addSpot.html', {root: __dirname + "/public"})
})
app.get('/addAngler', (req,res) => {
    res.sendFile('addAngler.html', {root: __dirname + "/public"})
})

// Route per ottenere l'elenco dei pesci
app.get('/getFishList', async (req, res) => {
    try {
        const fishList = await pesce.find(); // Ottiene tutti i pesci dal database
        res.json(fishList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route per ottenere l'elenco degli spot
app.get('/getSpotsList', async (req, res) => {
    try {
        const spotsList = await spot.find(); // Ottiene tutti gli spot dal database
        res.json(spotsList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route per ottenere l'elenco degli angler
app.get('/getAnglersList', async (req, res) => {
    try {
        const anglersList = await angler.find(); // Ottiene tutti gli angler dal database
        res.json(anglersList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route per aggiungere un nuovo pesce
app.post('/addFish', upload.single('fishImage'), async (req, res) => {
    const { name, species, weight, spot, angler, esca, anno } = req.body;
    const imageSrc = req.file.path;
    const newPesce = new pesce({ name, species, weight, imageSrc, spot, angler, esca, anno });

    try {
        await newPesce.save(); // Salva il nuovo pesce nel database
        console.log('Fish added successfully')
        res.json({ message: 'Fish added successfully', pesces: newPesce });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Route per aggiungere un nuovo spot
app.post('/addSpot', upload.single('spotImage'), async (req, res) => {
    const { name, paese, acque, descr, coordX, coordY } = req.body;
    const imageSrc = req.file.path;
    const newSpot = new spot({ name, paese, acque, imageSrc, descr, coordX, coordY });

    try {
        await newSpot.save(); // Salva il nuovo spot nel database
        console.log('Spot added successfully')
        res.json({ message: 'Spot added successfully', spots: newSpot });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Route per aggiungere un nuovo angler
app.post('/addAngler', upload.single('anglerImage'), async (req, res) => {
    const { name, nikName, paese} = req.body;
    const imageSrc = req.file.path;
    const newAngler = new angler({ name, nikName, paese, imageSrc});

    try {
        await newAngler.save(); // Salva il nuovo angler nel database
        console.log('Angler added successfully')
        res.json({ message: 'Angler added successfully', anglers: newAngler });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//UPDATE
// Route per modificare una scheda carpa
app.put('/updateCarpData/:id', async (req, res) => {
    const carpId = req.params.id; // Ottieni l'ID del pesce dalla richiesta

    const updatedCarpData = req.body;

    try {
        // Codice per aggiornare i dati della carpa nel database utilizzando l'ID ricevuto
        // Ad esempio:
        await pesce.findByIdAndUpdate(carpId, updatedCarpData);

        res.json({ message: 'Dati della carpa aggiornati con successo' });
    } catch (error) {
        console.error('Errore durante l\'aggiornamento dei dati della carpa:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Route per modificare una scheda spot
app.put('/updateSpotData/:id', async (req, res) => {
    const spotId = req.params.id; // Ottieni l'ID dello spot dalla richiesta

    const updatedSpotData = req.body;

    try {
        // Codice per aggiornare i dati dello spot nel database utilizzando l'ID ricevuto
        // Ad esempio:
        await spot.findByIdAndUpdate(spotId, updatedSpotData);

        res.json({ message: 'Dati dello spot aggiornati con successo' });
    } catch (error) {
        console.error('Errore durante l\'aggiornamento dei dati dello spot:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Route per modificare una scheda angler
app.put('/updateAnglerData/:id', async (req, res) => {
    const anglerId = req.params.id; // Ottieni l'ID dell angler dalla richiesta

    const updatedAnglerData = req.body;

    try {
        // Codice per aggiornare i dati dell angler nel database utilizzando l'ID ricevuto
        // Ad esempio:
        await angler.findByIdAndUpdate(anglerId, updatedAnglerData);

        res.json({ message: 'Dati dell\' angler aggiornati con successo' });
    } catch (error) {
        console.error('Errore durante l\'aggiornamento dei dati dell\'angler:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//DELETE
// Route per eliminare un pesce
app.delete('/deleteFish/:fishId', async (req, res) => {
    const fishId = req.params.fishId;

    try {
        // Trova il pesce dal database utilizzando il modello pesce
        const deletedFish = await pesce.findByIdAndDelete(fishId);
        
        // Elimina l'immagine associata al pesce dalla cartella uploads
        if (deletedFish.imageSrc) {
            const imagePath = path.join(__dirname, deletedFish.imageSrc);
            fs.unlinkSync(imagePath);
        }
        
        // Risposta JSON per confermare l'eliminazione
        res.json({ message: 'Pesce eliminato con successo', fishId: fishId });
    } catch (error) {
        console.error('Errore durante l\'eliminazione del pesce:', error);
        res.status(500).json({ error: 'Errore interno del server' });
    }
});
// Route per eliminare uno spot
app.delete('/deleteSpot/:spotId', async (req, res) => {
    const spotId = req.params.spotId;

    try {
        // Trova lo spot dal database utilizzando il modello spot
        const deletedSpot = await spot.findByIdAndDelete(spotId);
        
        // Elimina l'immagine associata allo spot dalla cartella uploads
        if (deletedSpot.imageSrc) {
            const imagePath = path.join(__dirname, deletedSpot.imageSrc);
            fs.unlinkSync(imagePath);
        }
        
        // Risposta JSON per confermare l'eliminazione
        res.json({ message: 'Spot eliminato con successo', spotId: spotId });
    } catch (error) {
        console.error('Errore durante l\'eliminazione dello spot:', error);
        res.status(500).json({ error: 'Errore interno del server' });
    }
});
// Route per eliminare un angler
app.delete('/deleteAngler/:anglerId', async (req, res) => {
    const anglerId = req.params.anglerId;

    try {
        // Trova l\'angler dal database utilizzando il modello angler
        const deletedAngler = await angler.findByIdAndDelete(anglerId);
        
        // Elimina l'immagine associata all angler dalla cartella uploads
        if (deletedAngler.imageSrc) {
            const imagePath = path.join(__dirname, deletedAngler.imageSrc);
            fs.unlinkSync(imagePath);
        }
        
        // Risposta JSON per confermare l'eliminazione
        res.json({ message: 'Angler eliminato con successo', anglerId: anglerId });
    } catch (error) {
        console.error('Errore durante l\'eliminazione dell\'angler:', error);
        res.status(500).json({ error: 'Errore interno del server' });
    }
});

//LISTEN
// Avvia il server e mettilo in ascolto sulla porta specificata
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
app.listen(process.env.PORT || port, () => {console.log(`Listening on port ${port}`)});