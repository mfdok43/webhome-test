export function findReducer (state = {}, { type,payload}) {

    if (type === 'FIND_COMMENTS') {
        return {
            ...state,
            ...payload,
        }
    }

    if (type === 'SPREAD_COMMENTS') {
        return {
            ...state,
                data:[...state?.data, ...payload?.data]
        }
    }

    return state;
}



const actionFind = (payload) => ({ type:'FIND_COMMENTS', payload })
const actionSpread = (payload) => ({ type: 'SPREAD_COMMENTS', payload })



export const actionDataFinder = (type, promise) =>
    async dispatch => {
            let data = await promise

        if (type === 'FIND_COMMENTS') {
            dispatch(actionFind(data))

        } else {dispatch(actionSpread(data))}

    }