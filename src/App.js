import './App.scss';
import {AddComment} from "./add-comment/add-comment";
import {UserComments} from "./user-comment/user-comments";
import {Provider} from "react-redux";

import {store} from "./store";


export const url = "https://jordan.ashton.fashion/api/goods/30/comments"




export function App() {
  return (
      <Provider store={store}>
      <div className='App'>
          <h2>Comments</h2>
          <AddComment />
          <UserComments />
      </div>
      </Provider>
  );
}


