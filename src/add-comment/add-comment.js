import {useState,useEffect} from "react";
import './add-comment.scss'
import {connect} from "react-redux";
import {store} from "../redux/store";
import {actionFindComments} from "../user-comment/user-comments";

const url = "https://jordan.ashton.fashion/api/goods/30/comments"

export async function postMessage(name,message,last_page) {

    let currentPage = last_page

    const data = {
        name:name,
        text:message
    }
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),

        })
        if (response.status === 200) {
            store.dispatch(actionFindComments('FIND_COMMENTS',currentPage))
            return console.log('Message sent')
        } else if (response.status !== 200) {
            return  new Error('status is not 200')
        }
    } catch (err) {
        return new Error('jsonPost failed')
    }
}






export const AddComment = ({comments:{last_page}={}}) => {
    const [name,setName] = useState('')
    const [message, setMessage] = useState('')


    return (
       <div className='form'>
            <input placeholder='Your name' onChange={e => setName(e.target.value)} type='text' required minLength={1}/>
           {name === '' ? <div>You must have a name!</div>: <></>}
            <input className='write-comment' placeholder='Write a comment' onChange={e => setMessage(e.target.value)} type='text' required minLength={1}/>
           {message === '' ? <div>The comment should not be empty, write politely and with reason!</div>: <></>}
            <button disabled={name !== '' && message !== '' ? false : true} onClick={() => postMessage(name, message,last_page)}>Post</button>
       </div>

    )
}

export const CAddComment = connect(state => ({comments: state.promise}))(AddComment)
