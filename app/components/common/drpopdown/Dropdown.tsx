import React from 'react';
import './dropdown.css';
import Link from 'next/link';
import { useAppSelector } from '@/app/store/store';
import { query } from 'firebase/firestore';

const Dropdown = () => {
    const user = useAppSelector((state: any) => state.user);

    return (
        <div className='dropdown-container'>
            <Link href='/profile'>
                <ul className='dropdown-item'>Profile</ul>
            </Link>
            <p className='bands-heading'>Bands</p>

            {user.bands.map((band: string) => (
                <Link href={{ pathname: '/band', query: { name: band } }}>
                    <ul className='dropdown-item dropdown-band'>{band}</ul>
                </Link>
            ))}

            <Link href='/auth/login'>
                <ul className='dropdown-item'>Exit</ul>
            </Link>
        </div>
    );
};

export default Dropdown;
