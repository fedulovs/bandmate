'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Nav from '../components/Nav/Nav';
import './style.css';
import {
    getNotificationByRecipientId,
    readNotification,
} from '../firebase/config';
import { INotification } from './types';
import { useAppSelector } from '../store/store';

const Notifications = () => {
    const user = useAppSelector((state: any) => state.user);
    const [notifications, setNotifications] = useState<
        INotification[] | null
    >();

    const getNotifications = useCallback(async () => {
        try {
            const fetchedNotifications = await getNotificationByRecipientId(
                user.id
            );
            setNotifications(fetchedNotifications);

            await readNotification(user.id);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    }, []);

    useEffect(() => {
        getNotifications();
    }, [getNotifications]);

    return (
        <div>
            <Nav title='Notifications' />
            <div className='notification-container'>
                {notifications?.map((notification, index) => (
                    <div
                        className='notification-container__notification'
                        key={index}
                    >
                        <div className='notification-container__username'>
                            <h4>{notification.userName}</h4>
                            {!notification.isRead && (
                                <div className='notification-container__red-dot'></div>
                            )}
                        </div>
                        <p className='notification-container__notification__message'>
                            {notification.message}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notifications;
