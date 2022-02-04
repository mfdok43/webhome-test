import {actionPromise} from "./redux";

const url = "https://jordan.ashton.fashion/api/goods/30/comments"



export const actionFindComments = (type, currentPage) =>
    actionPromise(type, fetch(url + `?page=${currentPage}`)
        .then(result => result.json()))