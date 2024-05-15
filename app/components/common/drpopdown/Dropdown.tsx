import React from 'react';
import './dropdown.css';
import Link from 'next/link';

const Dropdown = () => {
    return (
        <div className='dropdown-container'>
            <Link href='/profile'>
                <ul className='dropdown-item'>Profile</ul>
            </Link>
            <ul className='dropdown-item'>Band</ul>
            <ul className='dropdown-item'>Exit</ul>
        </div>
    );
};

export default Dropdown;
