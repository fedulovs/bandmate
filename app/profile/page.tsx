import React from 'react';
import Image from 'next/image';
import './style.css';
import logo from '../../public/kurwa_logo.png';
import Tags from '../components/tags/tags';

export const Profile = () => {
    return (
        <>
            <h1>Profile</h1>
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
                    <h3>Kurwa</h3>
                    <p className='email'>Email</p>
                    <h3>kurwa@gmail.com</h3>
                    <p className='description'>About</p>
                    <h3>
                        Zombie ipsum reversus ab viral inferno, nam rick grimes
                        malum cerebro. De carne lumbering animata corpora
                        quaeritis. Summus brains sit​​, morbo vel maleficia? De
                        apocalypsi gorger omero undead survivor dictum mauris.
                        Hi mindless mortuis soulless creaturas, imo evil
                        stalking monstra adventus resi dentevil vultus comedat
                        cerebella viventium. Qui animated corpse, cricket bat
                        max brucks terribilem incessu zomby.{' '}
                    </h3>
                    <Tags tagsList={['metal', 'death metal', 'chomik']} />
                </div>
            </div>
        </>
    );
};

export default Profile;
