Scaffolding API Sample
======================
This repository contains code sample for using Scaffolding API. 

For more information about Scaffolding API docs, 
please go to [ServiceRocket documentation](ServiceRocket Documentation)

[ServiceRocket Documentation]: https://docs.servicerocket.com/display/SCAF/Scaffolding+REST+API

If you need to extend the script, for example, providing a parent page (ancestor) while creating a wiki, you may change method in `rest_client.js` like:   
```
function createPageWithTemplate(basicAuth, template, spaceKey, pageTitle, ancestorsId) {
    const options = createRequestOptions(basicAuth, '/rest/api/content', 'POST')
    const payload = {
        "type": "page",
        "title": pageTitle,
        "space": {
            "key": spaceKey
        },
        "ancestors": [
            {
                "id": ancestorsID
            }
        ],
        "body": {
            "storage": {
                "value": template,
                "representation": "storage"
            }
        }
    }

    return sendRequest(options, payload)
}
```
When calling the method, add additional parameter for parent id (ancestor id):  
```
restClient.createPageWithTemplate(basicAuthCredentials, template, test, pageTitle, ancestorsId).then(async (res) => {
...
```
Other details about data that can be provided via API:

[API Content](https://developer.atlassian.com/cloud/confluence/rest/#api-api-content-post)