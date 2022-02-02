import {useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import {url} from "../App";
import "./user-comment.scss"
import ava from '../ava-def.jpg'


export function UserComments() {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [pageCount, setPageCount] = useState(1)
    const [more, setMore] = useState(false)


    let getUrl = url + `?page=${currentPage}`

    const handlePageChange = (selectedObject) => {
        setCurrentPage(selectedObject.selected);
    };


    useEffect(() => {
        fetch(getUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result.data);
                    setPageCount(result.last_page)
                    if (more) {
                        setItems([...items,...result.data]);
                        setMore(false)
                    }
                },

                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )


        console.log(items)
    }, [currentPage])


    const pageLoader = () => {
        setCurrentPage(currentPage+1)
        setMore(true)
    }




    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <div>
                {
                    items.map((item,index) => (
                        <div key={index} className='Comment'>

                            <div className='ava-name'>
                            <strong>{item.name}</strong>
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

                    <button disabled={currentPage === pageCount-1 ? true : false} className='page' onClick={() => pageLoader()}>Set more</button>
                {console.log(currentPage)}
              <div className='paginate'>
                <ReactPaginate
                    pageCount={pageCount}
                    pageRange={2}
                    marginPagesDisplayed={4}
                    onPageChange={handlePageChange}
                    containerClassName={'container'}
                    previousLinkClassName={'page'}
                    breakClassName={'page'}
                    nextLinkClassName={'page'}
                    pageClassName={'page'}
                    disabledClassNae={'disabled'}
                    activeClassName={'active'}
                />
              </div>
            </div>
        );
    }
}
