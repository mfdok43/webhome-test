import {useState,useEffect} from 'react'
import ReactPaginate from "react-paginate";
import './App.scss';

function UserComments() {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [pageCount, setPageCount] = useState(1)

    const url = `https://jordan.ashton.fashion/api/goods/30/comments?page=${currentPage}`

    const handlePageChange = (selectedObject) => {
        setCurrentPage(selectedObject.selected);
    };


    useEffect(() => {
        fetch(url)
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
                        <strong>{item.updated_at}</strong>
                    </div>
                ))}
                <label>Go to page</label>
                <input type="text" onChange={(e) => setCurrentPage(e.target.value)} />


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



export const AddComment = () =>
    <div>
      <input placeholder='Write a rewiew' type='text'/>
      <button>Post</button>
    </div>


export function App() {
  return (
      <div>
          <h2>Comments</h2>
          <AddComment />
          <UserComments />
      </div>

  );
}

