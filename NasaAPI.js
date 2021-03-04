const Webflow = require('webflow-api')
require('isomorphic-fetch');
const api = new Webflow({ token: 'eb26dc01a9366ade490b6c589b742109484afdee5262ffa3c8970b5694430096' })
let siteId = '600b1f4c2115e03205c5abf6';
let collectionId = '600f09e9ae7a0d0dbb875d89';
let ids = {};
let sol = 1;
// let domains = ['ondines-space-project-b7af6c657a1f9e414']
// let fields = {
//     '_archived': false,
//     '_draft': false,
//     'id': rocket.id,
//     'url': rocket.url,
//     'name': rocket.name,
//     'serial-number': rocket.serial_number,
//     'description': rocket.description,
//     'agency': rocket.configuration.agency.name,
//     'agency-type':  rocket.configuration.agency.type,
//     'in use': rocket.in_use.toString(),
//     'image_url': rocket.image_url
//
// }


// const sites = api.sites();
// sites.then(s => console.log(s));
// https://spacelaunchnow.me/api/3.5.0/?format=api
// fetch(`https://spacelaunchnow.me/api/3.5.0/event/upcoming`)


fetch(`https://spacelaunchnow.me/api/3.5.0/config/spacecraft/`)
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(function(data) {
        console.log(data.results.length)
        // console.log(data.results)
        let rockets = data.results;
        rockets.forEach(rocket => {
            console.log(rocket.id);
        })
    })

// https://dev.to/nirmal_kumar/retrieve-entire-data-from-paginated-api-recursively-3pl4
const limitPerPage=20;
const apiUrl="https://spacelaunchnow.me/api/3.5.0/config/spacecraft/";

const getUsers = async function(pageNo = 1) {
    let actualUrl = apiUrl + `?page=${pageNo}&limit=${limitPerPage}`;
    var apiResults = await fetch(actualUrl)
        .then(resp => {
            return resp.json();
        });
    return apiResults;
}

const getEntireList = async function(pageNo = 1) {
    const results = await getUsers(pageNo);
    console.log("Retreiving data from API for page : " + pageNo);
    if (results.length>0) {
        return results.concat(await getEntireList(pageNo+1));
    } else {
        return results;
    }
};
(async ()=>{
    const entireList=await getEntireList();
    console.log(entireList.results.length);
})()

    // .then(function(response) {
    // console.log(response);
    //     if (response.status >= 400) {
    //         throw new Error("Bad response from server");
    //     }
    //     return response.json();
    // })
    // .then(function(rockets) {
    //     api.items({collectionId: collectionId})
    //         .then((info) => {
    //             items = info.items;
    //             items.forEach(i => {
    //                 ids[i.spxid] = i._id;
    //             });
    //
    //             console.log("IDS: ", ids);
    //             console.log("rockets: ", rockets);
    //
    //         })
    // })
// // .then(function() {
// //     api.publishSite({ siteId: siteId, domains: [domains] });
// //
// // })

