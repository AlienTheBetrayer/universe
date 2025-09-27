import { useState } from 'react';
import './Form.css';

export const Form = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');


    return (
        <form className='contact-form' action='mailto:alienthebusinessman@gmail.com' method='post' encType='text/plain'>
            <div>
                <input type='text' name='name' required placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                <button type='button' onClick={() => setName('')}>✕</button>
            </div>

            <div>
                <input type='email' name='name' required placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <button type='button' onClick={() => setEmail('')}>✕</button>
            </div>

            <div className='contact-form-message-container'>
                <textarea name='message' required placeholder='Message' value={message} onChange={(e) => setMessage(e.target.value)}/>
                <button type='button'onClick={() => setMessage('')} >✕</button>
            </div>

            <button type='submit'>Send</button>
        </form>
    )
}