import React from 'react';
import inputStyles from '../styles/Input.module.css';

const Input = React.forwardRef(({ ...props }, ref) => {
    return (
        <input
            ref={ref}
            className={inputStyles.input}
            {...props}
        />
    );
});

export default Input;