'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    User,
    onAuthStateChanged,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../firebase/config';
import { setAuthState } from '../../store/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import './style.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [authUser, setAuthUser] = useState<null | User>(null);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });
    }, []);

    const signIn = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                setLoggedIn(true);
                dispatch(setAuthState(true));
                router.push('/tinder');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
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
                <button className='login-form__signin-button' type='submit'>
                    Log In
                </button>
            </form>
        </>
    );
};

export default Login;
