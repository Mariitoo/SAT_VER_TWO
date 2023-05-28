// JavaScript source code
const express = require('express');
const app = express();
const multer = require('multer');

// Configurar multer para manejar la carga de archivos
const upload = multer({ dest: 'uploads/' });

// Manejar la carga de archivos seg�n la opci�n seleccionada
app.post('/opcion1', upload.single('file'), (req, res) => {
    // Procesar el archivo cargado en req.file
    // ...
    res.send('Archivo cargado correctamente en la opci�n 1.');
});

app.post('/opcion2', upload.single('file'), (req, res) => {
    // Procesar el archivo cargado en req.file
    // ...
    res.send('Archivo cargado correctamente en la opci�n 2.');
});

app.post('/opcion3', upload.single('file'), (req, res) => {
    // Procesar el archivo cargado en req.file
    // ...
    res.send('Archivo cargado correctamente en la opci�n 3.');
});

app.post('/opcion4', upload.single('file'), (req, res) => {
    // Procesar el archivo cargado en req.file
    // ...
    res.send('Archivo cargado correctamente en la opci�n 4.');
});

app.post('/opcion5', upload.single('file'), (req, res) => {
  // Procesar el archivo cargado en req.file