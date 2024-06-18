
import { checkIsValidSortObject } from '../api/validation/sortQuery.validation'



export const paramsStringify = (paramsObj) => {
    if (!paramsObj) return ''
    return (
        '?' +
        Object.keys(paramsObj)
            .map((key) => key + '=' + encodeURIComponent(paramsObj[key]))
            .join('&')
    )
}

export const multiFieldSortObjectParser = (query) => {
    try {
        if (!query) return
        const { error } = checkIsValidSortObject(query)
        if (error) return
        const sortFields = query._sort.split(',') // Giả sử giá trị của query string là 'field1,field2'
        const orders = query._order.split(',') // Giả sử giá trị của query string là 'field1,field2'

        return sortFields.reduce((sort, field, index) => {
            sort[field] = orders[index] // Sắp xếp tăng dần trên các trường
            return sort
        }, {})
    } catch (error) {
        throw error
    }
}
