const request = require('request');

request('https://api.spacexdata.com/v4/rockets/5e9d0d95eda69955f709d1eb', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log(body);

});
// figure out how to post to cms
request('https://api.webflow.com/collections/600f09e9ae7a0d0dbb875d89/items?access_token=eb26dc01a9366ade490b6c589b742109484afdee5262ffa3c8970b5694430096&api_version=1.0.0&limit=1', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body);
});

// https://stackabuse.com/the-node-js-request-module/


// const request = require('request');
// request('https://api.spacexdata.com/v4/rockets/5e9d0d95eda69955f709d1eb', { json: true }, (err, res, body) => {
//     if (err) { return console.log(err); }
//     console.log(body);
// });
//
// request('https://api.webflow.com/collections/600f09e9ae7a0d0dbb875d89/items?access_token=eb26dc01a9366ade490b6c589b742109484afdee5262ffa3c8970b5694430096&api_version=1.0.0&limit=1', { json: true }, (err, res, body) => {
//     if (err) { return console.log(err); }
//     console.log(body.url);
//     console.log(body);
// });

// https://stackabuse.com/the-node-js-request-module/