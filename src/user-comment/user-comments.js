import {useState} from "react";
import ReactPaginate from "react-paginate";
import {url} from "../actionAddComments";
import "./user-comment.scss"
import './pagination.scss'
import ava from '../ava-def.jpg'
import {connect} from "react-redux";
// import {actionFindComments} from "../actionAddComments";
import {store} from "../store";
import {actionPromise} from "../promiseReducer";

let currentPage=421

let getUrl = url + `?page=${currentPage}`

export const actionFindComments = () =>
    actionPromise('findComments', fetch(getUrl)
        .then(result => result.json()))





export function UserComments({comments:{data=[],last_page}={}}) {

const [currentPage, setCurrentPage] = useState(1)

   const handlePageChange = (selectedObject) => {
   setCurrentPage(selectedObject.selected+1);
    };

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

              <div className='paginate'>
                <ReactPaginate
                    pageCount={last_page}
                    forcePage={currentPage-1}
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


export const CUserComments = connect(state => ({comments: state.promise?.findComments?.payload}))(UserComments)
store.dispatch(actionFindComments())


// export function UserComments() {
//     const [items, setItems] = useState([]);
//     const [error, setError] = useState(null);
//     const [isLoaded, setIsLoaded] = useState(false);
//     const [currentPage, setCurrentPage] = useState(1)
//     const [pageCount, setPageCount] = useState(1)
//     const [more, setMore] = useState(false)
//     const [total, setTotal] = useState(0)
//
//
//     let getUrl = url + `?page=${currentPage}`
//
//     const handlePageChange = (selectedObject) => {
//         setCurrentPage(selectedObject.selected+1);
//     };
//
//
//     useEffect(() => {
//         fetch(getUrl)
//             .then(result => result.json())
//             .then(
//                 (result) => {
//                     setIsLoaded(true);
//                     setItems(result.data);
//                     setPageCount(result.last_page)
//                     setTotal(result.total)
//                     if (more) {
//                         setItems([...items,...result.data]);
//                         setMore(false)
//                     }
//                 },
//                 (error) => {
//                     setIsLoaded(true);
//                     setError(error);
//                 }
//             )
//
//
//         // console.log(items)
//     }, [currentPage,setTotal])
//
//
//     const pageLoader = () => {
//         setCurrentPage(currentPage+1)
//         setMore(true)
//     }
//
//
//
//
//     if (error) {
//         return <div>Ошибка: {error.message}</div>;
//     } else if (!isLoaded) {
//         return <div>Загрузка...</div>;
//     } else {
//         return (
//             <div>
//                 {
//                     items.map((item,index) => (
//                         <div key={index} className='Comment'>
//
//                             <div className='ava-name'>
//
//                                 <strong> {item.name.length > 20 ? item.name.substring(0, 16) + "...": item.name}</strong>
//                                 <img className='avatar' src={ava} alt='avatar'/>
//                             </div>
//
//
//
//                             <div className='text-date'>
//                                 <div  className='text-comment'>{item.text}</div>
//
//                                 <div className='date'>
//                                     <strong>{new Date(item.updated_at).toUTCString().slice(5, -13)} at {new Date(item.updated_at).toLocaleTimeString().slice(0, -3)}</strong>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//
//                 <button disabled={currentPage === pageCount ? true : false} className='see-more-button' onClick={() => pageLoader()}>Seе more</button>
//                 {/*{console.log(currentPage)}*/}
//                 <div className='paginate'>
//                     <ReactPaginate
//                         pageCount={pageCount}
//                         forcePage={currentPage-1}
//                         marginPagesDisplayed={4}
//                         onPageChange={handlePageChange}
//                         containerClassName={'container'}
//                         previousLinkClassName={'page'}
//                         breakClassName={'page'}
//                         nextLinkClassName={'page'}
//                         pageClassName={'page'}
//                         disabledClassName={'disabled'}
//                         activeClassName={'active'}
//                     />
//                 </div>
//             </div>
//         );
//     }
// }
