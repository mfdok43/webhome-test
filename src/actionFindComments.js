import {actionDataFinder} from "./redux";

const url = "https://jordan.ashton.fashion/api/goods/30/comments"


export const actionFindComments = (type, currentPage) =>
    actionDataFinder(type, fetch(url + `?page=${currentPage}`)
        .then(result => result.json()))