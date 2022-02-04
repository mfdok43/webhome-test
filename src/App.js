import './App.scss';
import {AddComment} from "./add-comment/add-comment";
import {CUserComments} from "./user-comment/user-comments";
import {Provider} from "react-redux";

import {store} from "./store";



export function App() {
  return (
      <Provider store={store}>
      <div className='App'>
          <h2>Comments</h2>
          <AddComment />
          <CUserComments />
      </div>
      </Provider>
  );
}


