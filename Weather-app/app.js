const request = require('postman-request');

const baseUrl = 'http://api.weatherstack.com/'
const APIkey = '0d0a6ae0b592d383d88df91fa6cd2e47'

request({
    url:
        `${baseUrl}current
? access_key = ${APIkey}
& query = New York
`}, (res, err) => {

    console.log(JSON.parse(res).current)

})

