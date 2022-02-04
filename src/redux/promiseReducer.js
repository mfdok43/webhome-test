export function promiseReducer (state = {}, { type,payload}) {
    console.log(state,payload)
    if (type === 'FIND_COMMENTS') {
        return {
            ...state,
            ...payload,
        }
    }

    if (type === 'SPREAD_COMMENTS') {
        return {
            ...state,
                data:[...state?.data, ...payload.data]
        }
    }

    return state;
}
const actionResolved = (payload) => ({ type:'FIND_COMMENTS', payload })
const actionSpread = (payload) => ({ type: 'SPREAD_COMMENTS', payload })



export const actionPromise = (type, promise) =>
    async dispatch => {
            let data = await promise

        if (type === 'FIND_COMMENTS') {
            dispatch(actionResolved(data))
        } else {dispatch(actionSpread(data))}

    }