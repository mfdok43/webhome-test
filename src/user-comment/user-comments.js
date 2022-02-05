import {useRef, useState,useEffect} from "react";
import ReactPaginate from "react-paginate";
import "./user-comment.scss"
import './pagination.scss'
import {connect} from "react-redux";
import {store} from "../redux";
import {actionFindComments} from "../actionFindComments";
import {Comment} from "./comment";


export function UserComments({comments:{data= [],last_page,current_page}={},findComments}) {


    const [state, setState] = useState(current_page || 1)
    const currentPage = useRef( 1)

    useEffect(() => {
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
               <Comment key={index} item={item} />
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
