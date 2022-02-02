import {useState,useEffect} from 'react'
import ReactPaginate from "react-paginate";
import './App.scss';
import {AddComment} from "./add-comment";
import {UserComments} from "./user-comments";

export const url = "https://jordan.ashton.fashion/api/goods/30/comments"


export function App() {
  return (
      <div>
          <h2>Comments</h2>
          <AddComment />
          <UserComments />
      </div>

  );
}

