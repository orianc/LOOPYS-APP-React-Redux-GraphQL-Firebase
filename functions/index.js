/* eslint-disable indent */
/* eslint-disable no-tabs */
/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: true }));

app.use(express.json());

app.get('*', (req, res) => {
	res.status(404).send('404, Not Found.');
});

exports.api = functions.https.onRequest(app);

// const functions = require('firebase-functions');
// const express = require('express');
// const cors = require('cors');

// const app = express();

// app.use(cors({ origin: true }));

// app.use(express.json());

// app.get('*', (req, res) => {
// 	res.status(404).send('404, Not Found.');
// });

// exports.api = functions.https.onRequest(app);
