'use client';

import React, { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/kurwa_logo.png';
import './style.css';
import { useAppSelector } from '../../store/store';

interface Props {
    title: string;
    avatar?: string;
}

const Nav = (props: Props) => {
    const authState = useAppSelector((state: any) => state.auth.authState);

    return (
        <div className='top-navigation'>
            <div className='header-container'>
                <h1>{props.title}</h1>
            </div>
            {authState && (
                <div className='top-navigation--image-container'>
                    <Link href='/profile'>
                        <Image
                            className='top-navigation--image-container--avatar'
                            src={logo}
                            width={60}
                            height={60}
                            alt='profile'
                            style={{
                                maxWidth: '100%',
                            }}
                        ></Image>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Nav;
