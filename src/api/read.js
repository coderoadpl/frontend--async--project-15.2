import { makeApiUrl } from './makeApiUrl'
import { objectToArray } from './objectToArray'

export const readAll = (key) => {
    const apiUrl = makeApiUrl(key)

    return fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => objectToArray(data, 'key'))
}

export const readOne = (listKey, taskKey) => {
    const apiUrl = makeApiUrl(`${listKey}/${taskKey}`)

    return fetch(apiUrl)
        .then((response) => response.json())
}

export default readAll
