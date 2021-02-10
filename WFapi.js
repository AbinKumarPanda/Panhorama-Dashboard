const Webflow = require('webflow-api')
require('isomorphic-fetch');
const api = new Webflow({ token: 'eb26dc01a9366ade490b6c589b742109484afdee5262ffa3c8970b5694430096' })
let siteId = '600b1f4c2115e03205c5abf6';
let collectionId = '600f09e9ae7a0d0dbb875d89';
let ids = {};
// let domains = ['ondines-space-project-b7af6c657a1f9e414']

// const sites = api.sites();
// sites.then(s => console.log(s));

fetch('https://api.spacexdata.com/v4/rockets')
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
                    ids[i.spxid] = i._id;
                });

                console.log("IDS: ", ids);
                // console.log("rockets: ", rockets);
                rockets.forEach( rocket => {
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
                                'height': rocket.height.meters + ' meters / ' + rocket.height.feet + ' feet',
                                'diameter': rocket.diameter.meters + ' meters / ' + rocket.diameter.feet + ' feet',
                                'mass': rocket.mass.kg + ' kg / ' + rocket.mass.lb + ' lbs',
                                'first-flight': rocket.first_flight,
                                'engine': rocket.engines.number + ' / ' + rocket.engines.type,
                                'propellants': rocket.engines.propellant_1 + ' / ' +  rocket.engines.propellant_2,
                                'cost-per-launch': '$' + rocket.cost_per_launch,
                                'active-2': rocket.active.toString(),
                                'payload-to-leo': rocket.payload_weights[0].kg + ' kg / ' + rocket.payload_weights[0].lb + ' lbs',
                                'payload-to-gto': rocket.payload_weights[1]?.kg + ' kg / ' + rocket.payload_weights[1]?.lb + ' lbs',
                                'payload-to-mars': rocket.payload_weights[2]?.kg + ' kg / ' + rocket.payload_weights[2]?.lb + ' lbs',

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
                                'spxid': rocket.id,
                                'height': rocket.height.meters + ' meters / ' + rocket.height.feet + ' feet',
                                'diameter': rocket.diameter.meters + ' meters / ' + rocket.diameter.feet + ' feet',
                                'mass': rocket.mass.kg + ' kg / ' + rocket.mass.lb + ' lbs',
                                'first-flight': rocket.first_flight,
                                'engine': rocket.engines.number + ' / ' + rocket.engines.type,
                                'propellants': rocket.engines.propellant_1 + ' / ' +  rocket.engines.propellant_2,
                                'cost-per-launch': '$' + rocket.cost_per_launch,
                                'active-2': rocket.active.toString(),
                                'payload-to-leo': rocket.payload_weights[0].kg + ' kg / ' + rocket.payload_weights[0].lb + ' lbs',
                                'payload-to-gto': rocket.payload_weights[1].kg + ' kg / ' + rocket.payload_weights[1].lb + ' lbs',
                                'payload-to-mars': rocket.payload_weights[2].kg + ' kg / ' + rocket.payload_weights[2].lb + ' lbs',

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

