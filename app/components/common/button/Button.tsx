import React, { ButtonHTMLAttributes } from 'react';
import './button.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    buttonType: 'regular' | 'login';
    classNames?: string;
}

export const Button = (props: Props) => {
    const { buttonType, classNames, children, ...rest } = props;

    let className = '';
    if (props.buttonType === 'regular') {
        className = 'button-normal';
    } else if (props.buttonType === 'login') {
        className = 'button-login';
    }

    className = `${className} ${classNames || ''}`;

    return (
        <button className={className.trim()} {...rest}>
            {children}
        </button>
    );
};
