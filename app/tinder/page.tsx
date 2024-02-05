'use client';
import { useState } from 'react';
import TinderCard from 'react-tinder-card';
import './style.css';

const db = [
    {
        name: 'Kurwa',
        url: 'https://picsum.photos/seed/picsum/400/650',
    },
    {
        name: 'Leaves',
        url: 'https://picsum.photos/seed/picsum/400/650',
    },
    {
        name: 'The Blackouts',
        url: 'https://picsum.photos/seed/picsum/400/650',
    },
    {
        name: 'More Mushrooms',
        url: 'https://picsum.photos/seed/picsum/400/650',
    },
    {
        name: 'Friday Deployment',
        url: 'https://picsum.photos/seed/picsum/400/650',
    },
];

export default function Tinder() {
    const characters = db;
    const [lastDirection, setLastDirection] = useState();

    const swiped = (direction: any, nameToDelete: any) => {
        console.log('removing: ' + nameToDelete);
        setLastDirection(direction);
    };

    const outOfFrame = (name: string) => {
        console.log(name + ' left the screen!');
    };

    return (
        <>
            <h1>Tinder</h1>
            <div className='swiper-container'>
                <div className='card-container'>
                    {characters.map((character) => (
                        <TinderCard
                            className='swipe'
                            key={character.name}
                            onSwipe={(dir) => swiped(dir, character.name)}
                            onCardLeftScreen={() => outOfFrame(character.name)}
                        >
                            <div
                                style={{
                                    backgroundImage:
                                        'url(' + character.url + ')',
                                }}
                                className='card'
                            >
                                <h3>{character.name}</h3>
                            </div>
                        </TinderCard>
                    ))}
                    <div className='swipe-info'>
                        {lastDirection ? (
                            <p>You swiped {lastDirection}</p>
                        ) : (
                            <p />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
