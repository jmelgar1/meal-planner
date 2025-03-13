import React from 'react';
import buttonStyles from '../styles/Button.module.css';

const Button = ({ children, ...props }) => {
    return (
        <button className={buttonStyles.button} {...props}>
            {children}
        </button>
    );
};

export default Button;
