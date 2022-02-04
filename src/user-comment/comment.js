import ava from "../ava-def.jpg";

export const Comment = ({item={}}) => {
    return (
        <div className='Comment'>

            <div className='ava-name'>

                <strong> {item.name.length > 20 ? item.name.substring(0, 16) + "...": item.name}</strong>
                <img className='avatar' src={ava} alt='avatar'/>
            </div>


            <div className='text-date'>
                <div  className='text-comment'>{item.text}</div>

                <div className='date'>
                    <strong>{new Date(item.updated_at).toUTCString().slice(5, -13)} at {new Date(item.updated_at).toLocaleTimeString().slice(0, -3)}</strong>
                </div>
            </div>
        </div>
    )
}