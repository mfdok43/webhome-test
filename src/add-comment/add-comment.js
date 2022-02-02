import {useState} from "react";
import {url} from "../App";
import './add-comment.scss'

async function postMessage(name,message) {

    const data = {
        name:name,
        text:message
    }
    console.log(JSON.stringify(data))
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),

        })
        if (response.status === 200) {
            return await response.json()
        } else if (response.status !== 200) {
            return new Error('status is not 200')
        }
    } catch (err) {
        return new Error('jsonPost failed')
    }

}



export const AddComment = () => {
    const [name,setName] = useState('')
    const [message, setMessage] = useState('')


    return (
        <form>
            <input placeholder='Your name' onChange={e => setName(e.target.value)} type='text' required/>
            <input className='write-comment' placeholder='Write a comment' onChange={e => setMessage(e.target.value)} type='text'/>
            <button disabled={name !== '' && message !== '' ? false : true} onClick={() => postMessage(name,message)}>Post</button>
        </form>

    )
}
