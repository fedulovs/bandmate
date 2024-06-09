'use client';

import React, { useState } from 'react';
import Nav from '../components/Nav/Nav';
import './style.css';

const Notifications = () => {
    const [notifications, setNotifications] = useState([
        { userName: 'John', isRead: false, message: 'Yoooo' },
        {
            userName: 'Doe',
            isRead: false,
            message: 'This is second notification',
        },
    ]);

    return (
        <div>
            <Nav title='Notifications' />
            <div className='notification-container'>
                {notifications.map((notification) => (
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
