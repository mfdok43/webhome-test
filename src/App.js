import './App.scss';
import {CAddComment} from "./add-comment";
import {CUserComments} from "./user-comment";
import {Provider} from "react-redux";

import {store} from "./redux";


export function App() {
  return (
      <Provider store={store}>
      <div className='App'>
          <h2>Comments</h2>
          <CAddComment />
          <CUserComments />
      </div>
      </Provider>
  );
}


