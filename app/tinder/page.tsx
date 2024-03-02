'use client';
import { useEffect, useState } from 'react';
import TinderCard from 'react-tinder-card';
import { getBands, initializeApi } from '../firebase/config';
import { Band } from '../band/types';
import './style.css';
import Nav from '../components/Nav/Nav';

initializeApi();

export const Tinder = () => {
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
            <Nav title='Band Tinder' />
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
};

export default Tinder;
