'use client';
import { useEffect, useState } from 'react';
import TinderCard from 'react-tinder-card';
import { getBands, initializeApi } from '../firebase/config';
import { Band } from '../band/types';
import './style.css';

const db = [
    {
        name: 'Kurwa',
        avatar: 'https://picsum.photos/seed/picsum/400/650',
        tags: ['metal', 'death metal', 'chomik'],
    },
    {
        name: 'Leaves',
        avatar: 'https://picsum.photos/seed/picsum/400/650',
        tags: ['doom metal'],
    },
    {
        name: 'The Blackouts',
        avatar: 'https://picsum.photos/seed/picsum/400/650',
        tags: ['rock', 'alternative'],
    },
    {
        name: 'More Mushrooms',
        avatar: 'https://picsum.photos/seed/picsum/400/650',
        tags: ['progressive rock', 'rock'],
    },
    {
        name: 'Friday Deployment',
        avatar: 'https://picsum.photos/seed/picsum/400/650',
        tags: ['grunge'],
    },
];

initializeApi();

export default function Tinder() {
    const [characters, setCharacters] = useState<Band[]>([]);
    const [lastDirection, setLastDirection] = useState();
    const [visibleCharacter, setVisibleCharacter] = useState<Band>();
    const [position, setPosition] = useState(characters.length - 1);

    useEffect(() => {
        (async () => {
            try {
                const response = await getBands();
                setCharacters(response);
                setVisibleCharacter(response[position]);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    const swiped = (direction: any, nameToDelete: any) => {
        console.log('removing: ' + nameToDelete);
        setLastDirection(direction);
        if (position >= 1) {
            setPosition((last) => position - 1);
            setVisibleCharacter(characters[position - 1]);
        }
    };

    const outOfFrame = (name: string) => {
        console.log(name + ' left the screen!');
    };

    return (
        <>
            <h1>Band Tinder</h1>
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
                                        'url(' + character.avatar + ')',
                                }}
                                className='card'
                            >
                                <h3>{character.name}</h3>
                                {character.tags && (
                                    <div className='tags-container'>
                                        {character.tags.map((tag) => (
                                            <p className='tag'>#{tag}</p>
                                        ))}
                                    </div>
                                )}
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
