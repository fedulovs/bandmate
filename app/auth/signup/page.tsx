'use client';

import React, { FormEvent, useState } from 'react';
import '../login/style.css';
import { User, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, createUserInDb, getUserById } from '../../firebase/config';
import { setUserState } from '../../store/userSlice';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/app/store/store';
import { setAuthState } from '@/app/store/authSlice';
import { Button } from '@/app/components/common/button/Button';

const SignUp = () => {
    const [uid, setUid] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [authUser, setAuthUser] = useState<null | User>(null);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const signUp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const userId = userCredential.user.uid;

            await createUserInDb(userId, {
                bands: [],
                email: email,
                name: userName,
                tags: [],
                about: '',
            });

            const user = await getUserById(userId);
            if (user) {
                dispatch(setUserState(user));
                dispatch(setAuthState(true));
            }

            setLoggedIn(true);
            router.push('/extra-info');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <form className='login-form' onSubmit={signUp}>
                {/* Second use of h1 on one page 😱 */}
                <h1 className='login-form__header'>Create Account</h1>
                <p data-testid='name-text'>Name*</p>
                <input
                    className='login-form__user-name-input'
                    type='text'
                    placeholder='Enter your name'
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    data-testid='name-input'
                ></input>
                <p data-testid='email-text'>Email*</p>
                <input
                    className='login-form__email-input'
                    type='email'
                    placeholder='Enter your email'
                    value={email}
                    autoComplete='email'
                    onChange={(e) => setEmail(e.target.value)}
                    data-testid='email-input'
                ></input>
                <p data-testid='password-text'>Password*</p>
                <input
                    className='login-form__password-input'
                    type='password'
                    placeholder='Enter your password'
                    value={password}
                    autoComplete='current-password'
                    onChange={(e) => setPassword(e.target.value)}
                    data-testid='password-input'
                ></input>
                <Button
                    classNames='login-form__signin-button'
                    buttonType='regular'
                    type='submit'
                    data-testid='submit-button'
                >
                    Create account
                </Button>
            </form>
        </>
    );
};

export default SignUp;
