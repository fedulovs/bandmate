'use client';
import { useEffect, useState } from 'react';
import TinderCard from 'react-tinder-card';
import {
    getBands,
    addBandsToUser,
    getBandByName,
    createNotificationInDb,
} from '../firebase/config';
import { useAppSelector } from '../store/store';
import { IBand } from '../band/types';
import Nav from '../components/Nav/Nav';
import './style.css';

export const Tinder = () => {
    const [characters, setCharacters] = useState<IBand[]>([]);
    const [swipedRightBands, setSwipedRightBands] = useState<string[]>([]);
    const [lastDirection, setLastDirection] = useState();
    const [visibleCharacter, setVisibleCharacter] = useState<IBand>();
    const [position, setPosition] = useState(characters.length - 1);

    const [leftAnimationStarted, setLeftAnimationStarted] = useState(false);
    const [rightAnimationStarted, setRightAnimationStarted] = useState(false);

    const uid = useAppSelector((state: any) => state.user.id);
    const currentUserName = useAppSelector((state: any) => state.user.name);

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

    useEffect(() => {
        addBandsToUser(uid, swipedRightBands);
        console.log(swipedRightBands);
    }, [swipedRightBands]);

    const swiped = (direction: any, nameToDelete: any) => {
        console.log('removing: ' + nameToDelete);
        setLastDirection(direction);
        if (position >= 1) {
            setPosition((last) => position - 1);
            setVisibleCharacter(characters[position - 1]);
        }

        if (direction === 'right') {
            setSwipedRightBands((prevState) => [...prevState, nameToDelete]);
            setRightAnimationStarted(true);
            notifyUsers(nameToDelete);
            setTimeout(() => {
                setRightAnimationStarted(false);
            }, 1000);
        } else {
            setLeftAnimationStarted(true);
            setTimeout(() => {
                setLeftAnimationStarted(false);
            }, 1000);
        }

        addBandsToUser(uid, swipedRightBands);

        console.log(swipedRightBands);
    };

    const notifyUsers = async (nameToNotify: string) => {
        console.log('notifyUsers has been called');
        let bandMembers: string[] = [];
        try {
            const response = await getBandByName(nameToNotify);

            console.log(`Response from getBandByName:`, response);

            if (response && response.memberIDs) {
                // bandMembers = response.memberIDs;
                // Call notifyBandMebers
                for (let member of response.memberIDs) {
                    await createNotificationInDb({
                        isRead: false,
                        recipientUserId: member,
                        senderUserId: uid,
                        type: 'like',
                        userName: currentUserName,
                        message: `${currentUserName} liked your band`,
                    });
                }
            } else {
                console.log('No members found.');
            }
        } catch (error) {
            console.error('Error in notifyUsers:', error);
        }
    };

    const outOfFrame = async (name: string) => {
        console.log(`${name} left the screen!`);
    };

    return (
        <>
            <Nav title='Band Tinder' />
            <div className='swiper-container'>
                <div
                    className={`swipe-left ${
                        leftAnimationStarted && 'red-start'
                    }`}
                ></div>
                <div className='card-container'>
                    {characters.map((character) => (
                        <TinderCard
                            className='swipe'
                            key={character.name}
                            onSwipe={(dir) => swiped(dir, character.name)}
                            onCardLeftScreen={() => outOfFrame(character.name)}
                            preventSwipe={['up', 'down']}
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
                                    <div className='tinder__tags-container'>
                                        {character.tags.map((tag: string) => (
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
                <div
                    className={`swipe-right ${
                        rightAnimationStarted && 'green-start'
                    }`}
                ></div>
            </div>
        </>
    );
};

export default Tinder;
