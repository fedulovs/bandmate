'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Nav from '../components/Nav/Nav';
import './style.css';
import { getNotificationByRecipientId } from '../firebase/config';
import { INotification } from './types';
import { useAppSelector } from '../store/store';

const Notifications = () => {
    const user = useAppSelector((state: any) => state.user);
    const [notifications, setNotifications] = useState<
        INotification[] | null
    >();

    const getNotifications = useCallback(async () => {
        try {
            const notifications = await getNotificationByRecipientId(user.id);
            setNotifications(notifications);
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
                {notifications?.map((notification) => (
                    <div className='notification-container__notification'>
                        <h4>{notification.userName}</h4>
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
