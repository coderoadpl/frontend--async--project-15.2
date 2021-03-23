import { makeApiUrl } from './makeApiUrl'
import { makeAuthorizedRequest } from '../auth'

export const remove = (listKey, taskKey) => {
    const apiUrl = makeApiUrl(`${listKey}/${taskKey}`)

    return makeAuthorizedRequest(apiUrl, {
        method: 'DELETE',
    })
}

export default remove
