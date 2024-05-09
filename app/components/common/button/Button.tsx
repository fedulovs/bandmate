import React, { ButtonHTMLAttributes } from 'react';
import './button.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    buttonType: 'regular' | 'login';
}

export const Button = (props: Props) => {
    switch (props.buttonType) {
        case 'regular': {
            return (
                <button className='button-normal' {...props}>
                    {props.children}
                </button>
            );
        }
        case 'login': {
            return <button className='button-login'>{props.children}</button>;
        }
        default: {
            return <button className='button-normal'>{props.children}</button>;
        }
    }
};
