export function fetchAPI(method, routes="", body = null) {
    routes = "/receipts" + routes
    let bodyData = JSON.stringify(body) 
    let myInit;
    return new Promise((res, rej) => {
        try {
            let myHeaders = new Headers()
            myHeaders.append('Content-Type', 'application/json')
            if (body === null) {
                myInit = {
                    method: method,
                    headers: myHeaders
                }  
            } else {
                myInit = {
                    method: method,
                    body: bodyData,
                    headers: myHeaders
                }
            }
            let req = new Request(routes, myInit)
            fetch(req).then(res => (res.json()))
                .catch(e => console.error('Error:', e))
                .then(response => {
                    try {
                        res(response)
                    } catch (e) { rej(e) }
                })
        } catch (e) { res(e) }
    })
}