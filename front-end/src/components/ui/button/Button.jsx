import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({
                    children,
                    onClick,
                    variant = 'primary',
                    disabled = false,
                    className = '',
                    type = 'button',
                    ...props
                }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${styles.button} ${styles[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    variant: PropTypes.oneOf(['primary', 'secondary', 'text']),
    disabled: PropTypes.bool,
    className: PropTypes.string,
    type: PropTypes.oneOf(['button', 'submit', 'reset'])
};

export default Button;