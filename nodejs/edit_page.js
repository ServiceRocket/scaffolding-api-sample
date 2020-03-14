const fs = require('fs')
const restClient = require('./rest_client.js')
const dataParser = require('./parse_json.js')

// Confluence login credentials
const username = 'admin'
const password = 'admin'
const basicAuthCredentials = restClient.getBasicAuthCredentials(username, password)

// load your json data, page will change only provided fields from json, get your data from link
// http;//yourwiki//rest/scaffolding/1.0/api/form/wikiPageID
const payload = 'sample_data/software.json'
const wikiPage = 'wikiPageID'

restClient.fetchForm(basicAuthCredentials, wikiPage).then(res => {

    // Payload must be an array or json - array to our wiki page
    // Insert data from json to Scaffolding table-data form.
    restClient.createRecord(basicAuthCredentials, wikiPage, payload)
        .then((res) => console.log('result >>', res))
        .catch((err) => console.error('>>', err))
});
