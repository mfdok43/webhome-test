import {useRef, useState,useEffect} from "react";
import ReactPaginate from "react-paginate";
import "./user-comment.scss"
import './pagination.scss'
import ava from '../ava-def.jpg'
import {connect} from "react-redux";
import {actionPromise,store} from "../redux";


const url = "https://jordan.ashton.fashion/api/goods/30/comments"



export const actionFindComments = (type, currentPage) =>
    actionPromise(type, fetch(url + `?page=${currentPage}`)
        .then(result => result.json()))


export function UserComments({comments:{data= [],last_page,current_page}={},findComments}) {


    const [state, setState] = useState(current_page || 1)
    const currentPage = useRef( 1)

    useEffect(() => {
        console.log(current_page,'kurent')
        currentPage.current = current_page || 1
        setState (current_page)
    },[current_page])


    const handlePageChange = (selectedObject) => {
        currentPage.current = selectedObject.selected+1 //пагинация считается с 0 а бэк с 1
        // console.log(currentPage.current)
        findComments("FIND_COMMENTS", currentPage.current)
    };


    const seeMore = () => {
        ++currentPage.current
        findComments('SPREAD_COMMENTS',currentPage.current)
    }


        return (
            <div>
                {
                    data.map((item,index) => (
                        <div key={index} className='Comment'>

                            <div className='ava-name'>

                                <strong> {item.name.length > 20 ? item.name.substring(0, 16) + "...": item.name}</strong>
                                <img className='avatar' src={ava} alt='avatar'/>
                            </div>


                            <div className='text-date'>
                                <div  className='text-comment'>{item.text}</div>

                                <div className='date'>
                                    <strong>{new Date(item.updated_at).toUTCString().slice(5, -13)} at {new Date(item.updated_at).toLocaleTimeString().slice(0, -3)}</strong>
                                </div>
                            </div>
                        </div>
                    ))}


                <button disabled={currentPage.current === last_page ? true : false} className='see-more-button' onClick={() => {
                    seeMore()
                }}>Seе more</button>
              <div className='paginate'>
                <ReactPaginate
                    pageCount={last_page}
                    forcePage={currentPage.current-1} //пагинация считается с 0 а бэк с 1
                    marginPagesDisplayed={4}
                    onPageChange={handlePageChange}
                    containerClassName={'container'}
                    previousLinkClassName={'page'}
                    breakClassName={'page'}
                    nextLinkClassName={'page'}
                    pageClassName={'page'}
                    disabledClassName={'disabled'}
                    activeClassName={'active'}
                />
              </div>
            </div>
        );
    }


export const CUserComments = connect(state => ({comments: state.promise}),{findComments:actionFindComments})(UserComments)
store.dispatch(actionFindComments('FIND_COMMENTS'))


//
// const currentPage = useRef(current_page || 1)
//
//
//
// // useEffect(() => {
// //     currentPage.current = current_page
// // },[l])
//
// const handlePageChange = (selectedObject) => {
//     currentPage.current = selectedObject.selected+1 //пагинация считается с 0 а бэк с 1
//     findComments("FIND_COMMENTS", currentPage.current)
// };
//
//
//
// const seeMore = () => {
//     ++currentPage.current
//     findComments('SPREAD_COMMENTS',currentPage.current)
// }
//
//
//
//
// const [currentPage,setCurrentPage] = useState(1)
//
// useEffect(() => {
//     setCurrentPage ( currentPage)
// },[])
//
// const handlePageChange = (selectedObject) => {
//     setCurrentPage (selectedObject.selected+1)
//     console.log(currentPage)
//     findComments("FIND_COMMENTS", currentPage)
// };
//
//
//
// const seeMore = () => {
//     setCurrentPage(currentPage => currentPage + 1)
//     findComments('SPREAD_COMMENTS',currentPage)
// }
