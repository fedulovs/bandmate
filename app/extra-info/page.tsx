'use client';

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { addTagsToUser, getUserById } from '../firebase/config';
import { useRouter } from 'next/navigation';
import { setUserState } from '../store/userSlice';
import './style.css';

const page = () => {
    const [tags, setTags] = useState([
        { name: 'metall 🤘🏻', isChecked: false },
        { name: 'pop 🎤', isChecked: false },
        { name: 'rock 🎸', isChecked: false },
        { name: 'jazz 🎺', isChecked: false },
        { name: 'classical 🎻', isChecked: false },
        { name: 'country 🪕', isChecked: false },
        { name: 'electronic 👾', isChecked: false },
        { name: 'funk 🌶', isChecked: false },
    ]);

    const userId = useAppSelector((state: any) => state.user.id);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleTagClick = (clickedTag: any) => {
        const updatedTags = tags.map((tag) =>
            tag.name === clickedTag.name
                ? { ...tag, isChecked: !tag.isChecked }
                : tag
        );
        setTags(updatedTags);
    };

    const addTags = async () => {
        const checkedTags = tags.filter((tag) => tag.isChecked);
        const checkedTagNames = checkedTags.map((tag) => tag.name);

        addTagsToUser(userId, checkedTagNames);

        const user = await getUserById(userId);
        if (user) {
            dispatch(setUserState(user));
        }

        router.push('/profile');
    };

    return (
        <div className='page-container'>
            <h1>Choose your favorite styles</h1>
            <div className='tags-container'>
                {tags.map((tag) => (
                    <div
                        className={`tags-container__tag ${
                            tag.isChecked ? 'checked' : ''
                        }`}
                        key={tag.name}
                        onClick={() => handleTagClick(tag)}
                    >
                        <p>{tag.name}</p>
                    </div>
                ))}
            </div>
            <div className='button-container'>
                <button className='ready-button' onClick={addTags}>
                    Ready
                </button>
            </div>
        </div>
    );
};

export default page;
