const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;

const Webflow = require('webflow-api')
require('isomorphic-fetch');

const api = new Webflow({ token: 'eb26dc01a9366ade490b6c589b742109484afdee5262ffa3c8970b5694430096' })
let siteId = '600b1f4c2115e03205c5abf6';
let collectionId = '600f09e9ae7a0d0dbb875d89';
let ids = {};

app.get('/', (req, res) => {
    // res.json({key:"value"});
    fetch('https://spacelaunchnow.me/api/3.5.0/config/spacecraft/?limit=200')
        .then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        })
        .then(function(rockets) {
            api.items({collectionId: collectionId})
                .then((info) => {
                    items = info.items;
                    items.forEach(i => {
                        ids[i["rocket-id"]] = i._id;
                    });

                    console.log("IDS: ", ids);
                    // console.log("rockets: ", rockets);
                    rockets.results.forEach( rocket => {
                        console.log(rocket.id, ids[rocket.id]);

                        if (ids[rocket.id]) {
                            console.log("IN HERE::", rocket.id, ids[rocket.id])
                            api.patchItem({
                                collectionId: collectionId,
                                itemId: ids[rocket.id],
                                fields: {
                                    'name': rocket.name,
                                    '_archived': false,
                                    '_draft': false,
                                    'rocket-id': rocket.id,
                                    'capability': rocket.capability,
                                    'maiden-flight': rocket.maiden_flight,
                                    'human-rated': rocket.human_rated.toString(),
                                    'crew-capacity-2': rocket.crew_capacity,
                                    'in-use': rocket.in_use.toString(),
                                },
                            });
                            delete ids[rocket.id];
                        } else {
                            api.createItem({
                                collectionId: collectionId,
                                fields: {
                                    'name': rocket.name,
                                    '_archived': false,
                                    '_draft': false,
                                    'rocket-id': rocket.id,
                                    'capability': rocket.capability,
                                    'maiden-flight': rocket.maiden_flight,
                                    'human-rated': rocket.human_rated.toString(),
                                    'crew-capacity-2': rocket.crew_capacity,
                                    'in-use': rocket.in_use.toString(),

                                }
                            })
                        }
                    })
                })
        })
// .then(function() {
//     api.publishSite({ siteId: siteId, domains: [domains] });
//
// })



})

app.listen(PORT, () => {
    console.log(`Example app listening at port:${PORT}`)
})