'use client';
import React, { useEffect, useState } from 'react';
import { addAboutToUser, getBandByName } from '../firebase/config';

import Image from 'next/image';
import logo from '../../public/band_photo.jpg';
import Tags from '../components/tags/tags';
import Nav from '../components/Nav/Nav';
import { useAppDispatch, useAppSelector } from '../store/store';
import { useRouter, useSearchParams } from 'next/navigation';
import { Edit } from '../components/svg';
import './style.css';
import { setUserState } from '../store/userSlice';
import { Button } from '../components/common/button/Button';
import { IBand } from './types';

export const Band = () => {
    const searchParams = useSearchParams();
    const user = useAppSelector((state: any) => state.user);
    const [bandName, setBandName] = useState<string | null>(
        searchParams.get('name')
    );
    const [band, setBand] = useState<null | IBand>(null);
    const [isEditingAbout, setIsEditingAbout] = useState(false);
    const [editedAbout, setEditedAbout] = useState('');
    const router = useRouter();
    const dispatch = useAppDispatch();

    // Reacts to change of params
    useEffect(() => {
        const nameParam = searchParams.get('name');
        setBandName(nameParam || '');
    }, [searchParams]);

    useEffect(() => {
        if (bandName) {
            (async () => {
                try {
                    const response = await getBandByName(bandName);
                    if (response !== null) {
                        setBand(response);
                        setEditedAbout(response.description || '');
                    } else {
                        console.error('Band not found');
                    }
                } catch (error) {
                    console.error(error);
                }
            })();
        } else {
            console.error('No band name provided');
        }
    }, [bandName]);

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
                        layout={'fill'}
                        objectFit={'cover'}
                        sizes='100vw'
                        alt='avatar'
                    ></Image>
                    <h1 className='band-name'>{band?.name}</h1>
                </div>
                <div className='band-data-container'>
                    <p className='name'>Members</p>
                    <h3>
                        {band?.members.map((member, index) => (
                            <>
                                {member}
                                {index !== band.members.length - 1 && <br />}
                            </>
                        ))}
                    </h3>
                    <div className='band-description-container'>
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
                        <h3 className='description-text'>{editedAbout}</h3>
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
                    <Tags tagsList={band?.tags} />
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
