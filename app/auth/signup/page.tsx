'use client';

import React, { FormEvent, useState } from 'react';
import '../login/style.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUp = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <form className='login-form' onSubmit={signUp}>
                {/* Second use of h1 on one page 😱 */}
                <h1 className='login-form__header'>Create Account</h1>
                <p>Email</p>
                <input
                    className='login-form__email-input'
                    type='email'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <p>Password</p>
                <input
                    className='login-form__password-input'
                    type='password'
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <button className='login-form__signin-button' type='submit'>
                    Create account
                </button>
            </form>
        </>
    );
};

export default SignUp;
