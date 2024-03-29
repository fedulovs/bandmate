'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import logo from '../../public/kurwa_logo.png';
import Tags from '../components/tags/tags';
import Nav from '../components/Nav/Nav';
import './style.css';
import { useAppSelector } from '../store/store';

export const Profile = () => {
    const user = useAppSelector((state: any) => state.user);

    console.log(`User: ${user.tags}`);

    console.log(`Tags: ${user.tags}`);

    return (
        <>
            <Nav title='Profile' />
            <div className='profile-container'>
                <div className='image-container'>
                    <Image
                        className='avatar'
                        src={logo}
                        width={200}
                        height={200}
                        alt='Avatar'
                    ></Image>
                </div>
                <div className='data-container'>
                    <p className='name'>Display name</p>
                    <h3>{user.name}</h3>
                    <p className='email'>Email</p>
                    <h3>{user.email}</h3>
                    <p className='description'>About</p>
                    <h3>
                        Zombie ipsum reversus ab viral inferno, nam rick grimes
                        malum cerebro. De carne lumbering animata corpora
                        quaeritis. Summus brains sit​​, morbo vel maleficia? De
                        apocalypsi gorger omero undead survivor dictum mauris.
                        Hi mindless mortuis soulless creaturas, imo evil
                        stalking monstra adventus resi dentevil vultus comedat
                        cerebella viventium. Qui animated corpse, cricket bat
                        max brucks terribilem incessu zomby.
                    </h3>
                    <Tags tagsList={user.tags} />
                </div>
            </div>
        </>
    );
};

export default Profile;
