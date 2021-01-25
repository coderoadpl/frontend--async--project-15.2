import { makeApiUrl } from './makeApiUrl'

export const remove = (listKey, taskKey) => {
    const apiUrl = makeApiUrl(`${listKey}/${taskKey}`)

    return fetch(apiUrl, {
        method: 'DELETE',
    })
        .then((response) => response.json())
}

export default remove
