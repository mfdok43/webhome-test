import {useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import {url} from "./App";

export function UserComments() {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [pageCount, setPageCount] = useState(1)

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
                },

                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
        console.log(items)
    }, [currentPage])



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
                            <h3>{item.name}</h3>
                            <p>{item.text}</p>
                            <div>
                                <strong>{new Date(item.updated_at).toLocaleDateString()}</strong>
                                <div>{new Date(item.updated_at).toLocaleTimeString()}</div>
                            </div>
                        </div>
                    ))}
                {/*<label>Go to page</label>*/}
                {/*<input type="text" onChange={(e) => setCurrentPage(e.target.value)} />*/}


                <ReactPaginate
                    pageCount={pageCount}
                    pageRange={2}
                    marginPagesDisplayed={8}
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
        );
    }
}

