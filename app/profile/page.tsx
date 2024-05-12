'use client';
import React, { useState } from 'react';
import { addAboutToUser } from '../firebase/config';

import Image from 'next/image';
import logo from '../../public/kurwa_logo.png';
import Tags from '../components/tags/tags';
import Nav from '../components/Nav/Nav';
import { useAppDispatch, useAppSelector } from '../store/store';
import { useRouter } from 'next/navigation';
import { Edit } from '../components/svg';
import './style.css';
import { setUserState } from '../store/userSlice';
import { Button } from '../components/common/button/Button';

export const Profile = () => {
    const [isEditingAbout, setIsEditingAbout] = useState(false);
    const user = useAppSelector((state: any) => state.user);
    const [editedAbout, setEditedAbout] = useState(user.about);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const addAbout = () => {
        addAboutToUser(user.id, editedAbout);
        setIsEditingAbout(false);

        dispatch(setUserState(user));
    };

    return (
        <>
            <Nav title='Profile' />
            <div className='profile-container'>
                <div className='profile--image-container'>
                    <Image
                        className='avatar'
                        src={logo}
                        width={200}
                        height={200}
                        alt='Avatar'
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                        }}
                    ></Image>
                </div>
                <div className='data-container'>
                    <p className='name'>Display name</p>
                    <h3>{user.name}</h3>
                    <p className='email'>Email</p>
                    <h3>{user.email}</h3>
                    <div className='description-container'>
                        <p className='description'>About</p>
                        <Button
                            buttonType='regular'
                            classNames='description-container__edit-button'
                            onClick={() => setIsEditingAbout(!isEditingAbout)}
                        >
                            <Edit className='edit-button__icon' />
                        </Button>
                    </div>
                    {!isEditingAbout ? (
                        <h3>{editedAbout}</h3>
                    ) : (
                        <div className='data-container__edit-about-container'>
                            <textarea
                                className='data-container__edit-about__text'
                                placeholder='Tell more about yourself'
                                rows={4}
                                value={editedAbout}
                                onChange={(e) => setEditedAbout(e.target.value)}
                            ></textarea>
                            <Button
                                classNames='data-container__edit-about__submit-button'
                                buttonType='regular'
                                onClick={() => {
                                    addAbout();
                                }}
                            >
                                Submit
                            </Button>
                        </div>
                    )}

                    <Tags tagsList={user.tags} />
                    <div className='start-tinder-container'>
                        <Button
                            classNames='start-tinder-container__button'
                            buttonType='regular'
                            onClick={() => router.push('/tinder')}
                        >
                            Let's go!
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
