import { makeApiUrl } from './makeApiUrl'
import { objectToArray } from './objectToArray'
import { makeAuthorizedRequest } from '../auth'

export const readAll = (key) => {
    const apiUrl = makeApiUrl(key)

    return makeAuthorizedRequest(apiUrl)
        .then((data) => objectToArray(data, 'key'))
}

export const readOne = (listKey, taskKey) => {
    const apiUrl = makeApiUrl(`${listKey}/${taskKey}`)

    return makeAuthorizedRequest(apiUrl)
}

export default readAll
