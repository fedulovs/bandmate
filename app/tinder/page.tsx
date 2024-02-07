'use client';
import { useState } from 'react';
import TinderCard from 'react-tinder-card';
import './style.css';

const db = [
    {
        name: 'Kurwa',
        url: 'https://picsum.photos/seed/picsum/400/650',
        tags: ['metal', 'death metal', 'chomik'],
    },
    {
        name: 'Leaves',
        url: 'https://picsum.photos/seed/picsum/400/650',
        tags: ['doom metal'],
    },
    {
        name: 'The Blackouts',
        url: 'https://picsum.photos/seed/picsum/400/650',
        tags: ['rock', 'alternative'],
    },
    {
        name: 'More Mushrooms',
        url: 'https://picsum.photos/seed/picsum/400/650',
        tags: ['progressive rock', 'rock'],
    },
    {
        name: 'Friday Deployment',
        url: 'https://picsum.photos/seed/picsum/400/650',
        tags: ['grunge'],
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
                                <div className='tags-container'>
                                    {character.name ===
                                        characters[characters.length - 1]
                                            .name &&
                                        character.tags.map((tag) => (
                                            <p className='tag'>#{tag}</p>
                                        ))}
                                </div>
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
