import { makeApiUrl } from './makeApiUrl'
import { makeAuthorizedRequest } from '../auth'

export const update = (listKey, taskKey, dataToUpdate) => {
    const apiUrl = makeApiUrl(`${listKey}/${taskKey}`)

    return makeAuthorizedRequest(apiUrl, {
        method: 'PATCH',
        body: JSON.stringify(dataToUpdate)
    })
}

export default update
