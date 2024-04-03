'use client';

import React, { FormEvent, useState } from 'react';
import '../login/style.css';
import { User, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, createUserInDb } from '../../firebase/config';
import { useRouter } from 'next/navigation';

const SignUp = () => {
    const [uid, setUid] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [authUser, setAuthUser] = useState<null | User>(null);
    const router = useRouter();

    const signUp = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // console.log(userCredential.user.uid);
                // setUid(userCredential.user.uid);
                const userId = userCredential.user.uid;
                createUserInDb(userId, {
                    email: email,
                    name: userName,
                    tags: [],
                });
                setLoggedIn(true);
                router.push('/tinder');
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
                <p>Name*</p>
                <input
                    className='login-form__user-name-input'
                    type='text'
                    placeholder='Enter your name'
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                ></input>
                <p>Email*</p>
                <input
                    className='login-form__email-input'
                    type='email'
                    placeholder='Enter your email'
                    value={email}
                    autoComplete='email'
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <p>Password*</p>
                <input
                    className='login-form__password-input'
                    type='password'
                    placeholder='Enter your password'
                    value={password}
                    autoComplete='current-password'
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
