'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import logo from '../../../public/kurwa_logo.png';
import './style.css';
import { useAppSelector } from '../../store/store';
import Dropdown from '../common/drpopdown/Dropdown';

interface Props {
    title: string;
    avatar?: string;
}

const Nav = (props: Props) => {
    const authState = useAppSelector((state: any) => state.auth.authState);
    const [dropdownOpened, setDropdownOpened] = useState(false);
    const [hasNotifications, setHasNotifications] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setDropdownOpened(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside as any);
        return () => {
            document.removeEventListener(
                'mousedown',
                handleClickOutside as any
            );
        };
    }, []);

    return (
        <div className='top-navigation'>
            <div className='header-container'>
                <h1>{props.title}</h1>
            </div>
            {authState && (
                <div
                    className='top-navigation--image-container'
                    ref={dropdownRef}
                >
                    <Image
                        className='top-navigation--image-container--avatar'
                        src={logo}
                        width={60}
                        height={60}
                        alt='profile'
                        style={{
                            maxWidth: '100%',
                        }}
                        onClick={() => {
                            setDropdownOpened(!dropdownOpened);
                        }}
                    ></Image>
                    {hasNotifications && <div className='red-dot' />}
                    {dropdownOpened && <Dropdown />}
                </div>
            )}
        </div>
    );
};

export default Nav;
