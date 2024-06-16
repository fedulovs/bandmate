'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import logo from '../../../public/kurwa_logo.png';
import './style.css';
import { useAppSelector } from '../../store/store';
import Dropdown from '../common/drpopdown/Dropdown';
import { getNotificationByRecipientId } from '@/app/firebase/config';

interface Props {
    title: string;
    avatar?: string;
}

const Nav = (props: Props) => {
    const authState = useAppSelector((state: any) => state.auth.authState);
    const user = useAppSelector((state: any) => state.user);
    const [dropdownOpened, setDropdownOpened] = useState(false);
    const [notificationAmount, setNotificationAmount] = useState(0);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const getNotifications = useCallback(async () => {
        try {
            const notifications = await getNotificationByRecipientId(user.id);

            const unreadCount = notifications.filter(
                (notification) => !notification.isRead
            ).length;

            setNotificationAmount(unreadCount);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    }, []);

    useEffect(() => {
        getNotifications();
    }, [getNotifications]);

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
                    {notificationAmount > 0 && (
                        <div className='red-dot'>
                            <div className='red-dot__notification-number'>
                                {notificationAmount}
                            </div>
                        </div>
                    )}
                    {dropdownOpened && <Dropdown />}
                </div>
            )}
        </div>
    );
};

export default Nav;
