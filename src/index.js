const express = require("express");
const path = require('path');

const app = express();

app.get('/', async (req, res) => {
    const options = {
        root: path.join('./')
    };
 
    const fileName = 'index.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
});

app.get('/output.css', async (req, res) => {
    const options = {
        root: path.join('./')
    };
 
    const fileName = 'output.css';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
});

app.get('/background.png', async (req, res) => {
    const options = {
        root: path.join('./')
    };
 
    const fileName = 'background.png';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });
});

app.listen(3000, ()=>{console.log("Servidor rodando...")});