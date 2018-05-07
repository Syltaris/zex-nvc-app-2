const SERVER_URL = "http://52.77.251.137:1337/";

export function strapiCall(route, body, restMethod, successCallback) {
    Promise.resolve(localStorage.getItem('accessToken'))
    .then(jwt =>
        fetch(SERVER_URL+route, {
            body: body,
            method: restMethod,
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            //'Authorization': `Bearer `+ jwt
            }
        })
        .then(resp => resp.json())
        .then(respData => successCallback(respData))
        .catch(err => console.log(err))
    )
}

export function logAction(actionName, userId) {
    var body = JSON.stringify({
        date: new Date(),
        userId: userId,
        interactionType: actionName
    });
    strapiCall('qvlogs', body, 'POST', () => {});
}

export function strapiBlob(hash, successCallback) {
    Promise.resolve(localStorage.getItem('accessToken'))
    .then(jwt =>
        fetch(SERVER_URL+hash, {
            method: 'GET',
            credentials: 'same-origin', // include, same-origin, *omit
            headers: {
            'Accept': 'application/pdf',
            'Content-Type': 'application/pdf',
            //'Authorization': `Bearer `+ jwt
            },
            mode: 'no-cors', // no-cors, cors, *same-origin
        })
        .then(resp => resp.blob())
        .then(respData => successCallback(respData))
        .catch(err => console.log(err))
    )
}