function processJSONResponse(res) {
    if (!res.ok) {
        throw new Error(`This request was not successful: ${res.statusText} (${res.status})`);
    }
    return res.json();
};

function handleError(err) {
    console.error('Error in fetch', err);
    throw err;
};

export default {
    get: (url) => {
        return fetch(url)
            .then(processJSONResponse)
            .catch(handleError);
    },
    post: (url, data) => {
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            header: {'Content-Type': 'application/json'}
        })
        .then(processJSONResponse)
        .catch(handleError);
    }
};