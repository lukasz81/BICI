export function postActions(url,body = {}) {
    return fetch(url, {
            headers: {
                'Authorization': '*',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(body)
        })
        .then(
            res => {return res.json()},
            error => {return console.error(error)}
        )
}