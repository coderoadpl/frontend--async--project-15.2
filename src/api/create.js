import { makeApiUrl } from './makeApiUrl'

export const create = (key, dataToSave) => {
    const apiUrl = makeApiUrl(key)

    return fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(dataToSave)
    })
        .then((response) => response.json())
}

export default create
