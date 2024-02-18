import React from 'react';
import Image from 'next/image';
import './style.css';
import background from '../../../public/background.jpg';

const Login = () => {
    return (
        <>
            <div className='login-container'>
                <div className='aside'>
                    <Image
                        className='background-image'
                        src={background}
                        width={600}
                        height={1100}
                        alt='login-background'
                    ></Image>
                </div>
                <form className='login-form'>
                    <h2>Log In</h2>
                    <p>Email</p>
                    <input className='login-form__email-input'></input>
                    <p>Password</p>
                    <input className='login-form__password-input'></input>
                    <button className='login-form__signin-button'>
                        Sign In
                    </button>
                </form>
            </div>
        </>
    );
};

export default Login;
