import {useState,useEffect} from "react";
import {url} from "../actionAddComments";
import './add-comment.scss'
import {connect} from "react-redux";
import {store} from "../store";
import {actionFindComments} from "../user-comment/user-comments";

export async function postMessage(name,message) {
    const data = {
        name:name,
        text:message
    }
    // console.log(JSON.stringify(data))
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),

        })
        if (response.status === 200) {
            store.dispatch(actionFindComments())
            return console.log('Message sent')
        } else if (response.status !== 200) {
            return alert('status is not 200')
        }
    } catch (err) {
        return new alert('jsonPost failed')
    }
}






export const AddComment = (onFind) => {
    const [name,setName] = useState('')
    const [message, setMessage] = useState('')


    return (
       <div className='form'>
            <input placeholder='Your name' onChange={e => setName(e.target.value)} type='text' required minLength={1}/>
           {name === '' ? <div>You must have a name!</div>: <></>}
            <input className='write-comment' placeholder='Write a comment' onChange={e => setMessage(e.target.value)} type='text' required minLength={1}/>
           {message === '' ? <div>The comment should not be empty, write politely and with reason!</div>: <></>}
            <button disabled={name !== '' && message !== '' ? false : true} onClick={() => postMessage(name, message)}>Post</button>
       </div>

    )
}
