'use client';
import React, { useState } from 'react';
import { addAboutToUser } from '../firebase/config';

import Image from 'next/image';
import logo from '../../public/band_photo.jpg';
import Tags from '../components/tags/tags';
import Nav from '../components/Nav/Nav';
import { useAppDispatch, useAppSelector } from '../store/store';
import { useRouter } from 'next/navigation';
import { Edit } from '../components/svg';
import './style.css';
import { setUserState } from '../store/userSlice';
import { Button } from '../components/common/button/Button';

export const Band = () => {
    const user = useAppSelector((state: any) => state.user);
    const [isEditingAbout, setIsEditingAbout] = useState(false);
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
            <Nav title='Band' />
            <div className='band-profile-container'>
                <div className='profile--image-container'>
                    <Image
                        className='band-avatar'
                        src={logo}
                        // width={0}
                        // height={0}
                        layout={'fill'}
                        objectFit={'cover'}
                        sizes='100vw'
                        alt='avatar'
                    ></Image>
                    <h1 className='band-name'>Kurwa</h1>
                </div>
                <div className='band-data-container'>
                    <p className='name'>Members</p>
                    <h3>
                        Horia - vocals, bass
                        <br />
                        Sergey - guitars
                        <br />
                        Tom - guitars
                        <br />
                        Pablo - drums
                    </h3>
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
                    <p className='tags-title'>Tags</p>
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

export default Band;
