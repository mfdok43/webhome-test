import './App.scss';
import {AddComment} from "./add-comment/add-comment";
import {UserComments} from "./user-comment/user-comments";

export const url = "https://jordan.ashton.fashion/api/goods/30/comments"


export function App() {
  return (
      <div className='App'>
          <h2>Comments</h2>
          <AddComment />
          <UserComments />
      </div>

  );
}


