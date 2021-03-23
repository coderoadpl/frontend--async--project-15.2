import { makeApiUrl } from './makeApiUrl'
import { makeAuthorizedRequest } from '../auth'

export const create = (key, dataToSave) => {
    const apiUrl = makeApiUrl(key)

    return makeAuthorizedRequest(apiUrl, {
        method: 'POST',
        body: JSON.stringify(dataToSave)
    })
}

export default create
