const fs = require('fs');
const restClient = require('./rest_client.js');
const test = 'Test'; // Test space

// Confluence login credentials
const username = 'admin'
const password = 'admin'
const basicAuthCredentials = restClient.getBasicAuthCredentials(username, password)

// get your xml template editing the existing page
const template = `<ac:structured-macro 	ac:name="live-template" ac:schema-version="1"><ac:parameter ac:name="template">Product</ac:parameter><ac:parameter ac:name="type">template</ac:parameter></ac:structured-macro>`
// load your json data
const payload = 'sample_data/software.json'
const pageTitle = 'Page Title'

// Create page within 'Test' space using constructed page title and live-template macro
restClient.createPageWithTemplate(basicAuthCredentials, template, test, pageTitle).then(async (res) => {
    if (res.statusCode !== 200) {
        console.error(">> Fail to create page.")
        console.error(`>> Error ${res.statusCode}:`, res.data.message)
        return
    }

    // Get page id for newly created page
    const pageId = res.data.id
    console.log("wiki page id: " + pageId)

    // Insert data from json.
    restClient.createRecord(basicAuthCredentials, pageId, payload)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => console.error(err))
})
