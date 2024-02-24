import React from 'react';
import Image from 'next/image';
import './style.css';
import background from '../../../public/background.jpg';

const Login = () => {
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
                    <form className='login-form'>
                        // Second use of h1 on one page 😱
                        <h1 className='login-form__header'>Log In</h1>
                        <p>Email</p>
                        <input
                            className='login-form__email-input'
                            placeholder='Enter your email'
                        ></input>
                        <p>Password</p>
                        <input
                            className='login-form__password-input'
                            placeholder='Enter your password'
                        ></input>
                        <button className='login-form__signin-button'>
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
