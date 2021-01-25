import { makeApiUrl } from './makeApiUrl'

export const update = (listKey, taskKey, dataToUpdate) => {
    const apiUrl = makeApiUrl(`${listKey}/${taskKey}`)

    return fetch(apiUrl, {
        method: 'PATCH',
        body: JSON.stringify(dataToUpdate)
    })
        .then((response) => response.json())
}
