import React from 'react';
import './dropdown.css';
import Link from 'next/link';
import { useAppSelector } from '@/app/store/store';

const Dropdown = () => {
    const user = useAppSelector((state: any) => state.user);

    return (
        <div className='dropdown-container'>
            <Link href='/profile'>
                <ul className='dropdown-item'>Profile</ul>
            </Link>
            <p className='bands-heading'>Bands</p>
            <Link href='/band'>
                {user.bands.map((band: string) => (
                    <ul className='dropdown-item dropdown-band'>{band}</ul>
                ))}
            </Link>
            <Link href='/auth/login'>
                <ul className='dropdown-item'>Exit</ul>
            </Link>
        </div>
    );
};

export default Dropdown;
