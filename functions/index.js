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

// Finalement pas besoin, gérer avec firestore en front...
app.get('/exchange', async (req, res) => {
	try {
		const { loopysValue, askerId, authorId, itemId } = req.body;
		res.status(200).send();
	} catch (err) {
		res.status(500).json({
			statusCode: 500,
			message: err.message,
		});
	}
});

app.get('*', (req, res) => {
	res.status(404).send('404, Not Found.');
});

exports.api = functions.https.onRequest(app);
