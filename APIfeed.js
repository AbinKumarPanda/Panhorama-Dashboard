// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
// request.open('GET', 'https://ghibliapi.herokuapp.com/films', true)
request.open('GET', 'https://api.spacexdata.com/v4/rockets/', true)

request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)

    if (request.status >= 200 && request.status < 400) {
        data.forEach(rocket => {
            // Create a div with a "Sample Card" class
            const card = document.createElement('div')
            card.setAttribute('class', 'sample-card')

            // Create an h3 and set the text content to the film's title
            // const h2 = document.createElement('h2')
            // h2.textContent = rocket.name
            document.getElementById('Name').append(`${rocket.name}`)

            for (const [key, value] of Object.entries(rocket)) {
                console.log(`${key}: ${value}`);
                const p = document.createElement('p')
                p.textContent = `${key} : ${value.meters} / ${value.feet}  `
                card.appendChild(p)
            }

            // Create a p and set the text content to the film's description
            // const p = document.createElement('p')
            // p.textContent = `HEIGHT ${rocket.height.meters} / ${rocket.height.feet}`
            //
            //
            // card.appendChild(p)

            console.log(rocket)
            document.getElementById("Cards-Container").appendChild(card);
        })
    } else {
        console.log('error')
    }
}

// Send request
request.send()