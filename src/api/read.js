import { makeApiUrl } from './makeApiUrl'

export const readAll = (key) => {
    const apiUrl = makeApiUrl(key)

    return fetch(apiUrl)
        .then((response) => response.json())
}

export default readAll
