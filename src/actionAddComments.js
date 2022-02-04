import {actionPromise} from "./promiseReducer";

// export const url = 'http://shop-roles.asmer.fs.a-level.com.ua'
export const url = "https://jordan.ashton.fashion/api/goods/30/comments"

const getGQL = url =>
    async (query, variables = {}) => {
        let obj = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.authToken ? 'Bearer ' + localStorage.authToken : {},
            },
            body: JSON.stringify({ query, variables })
        })
        let a = await obj.json()
        if (!a.data && a.errors)
            throw new Error(JSON.stringify(a.errors))
        return a.data[Object.keys(a.data)[0]]
    }

const gql = getGQL(url + '/graphql');


export const actionFindComments = () =>
    actionPromise('findComments', fetch(url)
        .then(result => result.json()))


// export const actionRootCats = () =>
//     actionPromise('rootCats', gql(`query {
//             CategoryFind(query: "[{\\"parent\\":null}]"){
//                 _id name
//             }
//         }`))



