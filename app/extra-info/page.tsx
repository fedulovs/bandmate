'use client';

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { addTagsToUser, getUserById } from '../firebase/config';
import { useRouter } from 'next/navigation';
import { setUserState } from '../store/userSlice';
import './style.css';
import { Button } from '../components/common/button/Button';

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
            <h1 data-testid='extra-info-header'>Choose your favorite styles</h1>
            <div className='tags-container'>
                {tags.map((tag) => (
                    <div
                        className={`tags-container__tag ${
                            tag.isChecked ? 'checked' : ''
                        }`}
                        key={tag.name}
                        onClick={() => handleTagClick(tag)}
                        data-testid='extra-info-tag'
                    >
                        <p>{tag.name}</p>
                    </div>
                ))}
            </div>
            <div className='button-container'>
                <Button
                    classNames='ready-button'
                    buttonType={'regular'}
                    onClick={addTags}
                    data-testid='ready-button'
                >
                    Ready
                </Button>
            </div>
        </div>
    );
};

export default page;
