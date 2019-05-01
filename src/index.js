import React from 'react';
import express from 'express';
import renderer from './helpers/renderer';

const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
    res.send(renderer(req));
});

app.listen(4000, () => {
    console.info('App listening on port 4000');
})
