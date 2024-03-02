import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/kurwa_logo.png';
import './style.css';

interface Props {
    title: string;
    avatar?: string;
}

const Nav = (props: Props) => {
    return (
        <div className='top-navigation'>
            <div className='header-container'>
                <h1>{props.title}</h1>
            </div>
            <div className='image-container'>
                <Link href='/profile'>
                    <Image
                        className='avatar'
                        src={logo}
                        width={60}
                        height={60}
                        alt='profile'
                    ></Image>
                </Link>
            </div>
        </div>
    );
};

export default Nav;
