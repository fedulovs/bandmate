'use client';

import React, { FormEvent, useState } from 'react';
import Image from 'next/image';
import './style.css';
import background from '../../../public/background.jpg';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <div className='login-container'>
                <div className='aside'>
                    <h1 className='aside__header'>Bandmate</h1>
                    <div className='image-container'>
                        <Image
                            className='background-image'
                            src={background}
                            alt='login-background'
                            objectFit='cover'
                        ></Image>
                    </div>
                </div>
                <div className='form-container'>
                    <form className='login-form' onSubmit={signIn}>
                        {/* Second use of h1 on one page 😱 */}
                        <h1 className='login-form__header'>Log In</h1>
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
                        <button
                            className='login-form__signin-button'
                            type='submit'
                        >
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
