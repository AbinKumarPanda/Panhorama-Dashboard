const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;
const Webflow = require('webflow-api')
require('isomorphic-fetch');
require('dotenv').config()

const api = new Webflow({ token: process.env.TOKEN })
let domains = process.env.DOMAINS
let siteId = process.env.SITEID
let collectionId = process.env.COLLECTIONID

api.items({collectionId: collectionId})
    .then((info) => {
        info.items.forEach(i => {
            console.log("NAME: ", i.name);
            api.removeItem({ collectionId: collectionId, itemId: i._id})
        });
    }).then(function() {
            api.publishSite({ siteId: siteId, domains: [domains] });
        })

app.listen(PORT, () => {
    console.log(`App listening at port:${PORT}`)
})
app.on('clientError', function(err) {
    console.log('ERROR', err);
});

