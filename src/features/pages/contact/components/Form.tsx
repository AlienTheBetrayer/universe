import { useState } from 'react';
import './Form.css';

interface FormInputs {
    name: string;
    email: string;
    message: string;
}

export const Form = () => {
    const [inputs, setInputs] = useState<FormInputs>({ name: '', email: '', message: '' });

    return (
        <form className='contact-form' action='mailto:alienthebusinessman@gmail.com' method='post' encType='text/plain'>
            <div>
                <input type='text' name='name' required placeholder='Name' value={inputs.name} onChange={(e) => setInputs(prev => ({...prev, name: e.target.value}))} />
                <button type='button' onClick={() => setInputs(prev => ({...prev, name: ''}))}>✕</button>
            </div>

            <div>
                <input type='email' name='email' required placeholder='Email' value={inputs.email} onChange={(e) => setInputs(prev => ({...prev, email: e.target.value}))} />
                <button type='button' onClick={() => setInputs(prev => ({...prev, email: ''}))}>✕</button>
            </div>

            <div className='contact-form-message-container'>
                <textarea name='message' required placeholder='Message' value={inputs.message} onChange={(e) => setInputs(prev => ({...prev, message: e.target.value}))} />
                <button type='button' onClick={() => setInputs(prev => ({...prev, message: ''}))}>✕</button>
            </div>

            <button type='submit'>Send</button>
        </form>
    )
}