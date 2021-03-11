const express = require('express')
const app = express()
const cors = require('cors')
// require('dotenv').config()
const PORT = process.env.PORT || 3000;

const Webflow = require('webflow-api')
require('isomorphic-fetch');

const api = new Webflow({ token: process.env.TOKEN })
let domains = process.env.DOMAINS
let siteId = process.env.SITEID
let collectionId = process.env.COLLECTIONID
let ids = {};


app.use(cors());

app.get('/', (req, res) => {
    // calls the endpoint to get JSON response
    fetch('https://spacelaunchnow.me/api/3.5.0/config/spacecraft/?limit=200')
        .then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        })
        .then(function(rockets) {
            // calls Webdflow api to get collection items
            api.items({collectionId: collectionId})
                .then((info) => {
                    //collects the item ids
                    info.items.forEach(i => {
                        ids[i["rocket-id"]] = i._id;
                    });
                    // console.log("IDS: ", ids);
                    // loops thru the response from spacelaunchnow and sets up the data for the CMS
                    rockets.results.forEach( rocket => {
                        let  fields = {
                            'name': rocket.name,
                            '_archived': false,
                            '_draft': false,
                            'rocket-id': rocket.id,
                            'capability': rocket.capability,
                            'maiden-flight': rocket.maiden_flight,
                            'human-rated': rocket.human_rated.toString(),
                            'crew-capacity-2': rocket.crew_capacity,
                            'image-url-2': rocket.image_url,
                            'in-use': rocket.in_use.toString(),
                            'agency-name-2': rocket.agency.name,
                            'abbrev-2': rocket.agency.abbrev,
                            'agency-type-2': rocket.agency.type,
                            'agency-description-2': rocket.agency.description,
                            'agency-admin-2': rocket.agency.administrator,
                            'agency-founding-year-2': rocket.agency.founding_year,
                            'agency-launchers-2': rocket.agency.launchers,
                            'country-2': rocket.agency.country_code,
                        }
                        if (ids[rocket.id]) {
                            // adds data to existing collection items
                            api.patchItem({
                                collectionId: collectionId,
                                itemId: ids[rocket.id],
                                fields: fields,
                            });
                            delete ids[rocket.id];
                        } else {
                            // creates new items
                            api.createItem({
                                collectionId: collectionId,
                                fields: fields
                            })
                        }
                    })
                })
        })
        .then(function() {
            api.publishSite({ siteId: siteId, domains: [domains] });
        })
        .then(function() {
            res.end('<a href="https://www.robotmermaid.com/">Hi</a>');
        })
})

app.listen(PORT, () => {
    console.log(`App listening at port:${PORT}`)
})
app.on('clientError', function(err) {
    console.log('ERROR', err);
});

