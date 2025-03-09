import React from 'react';

function Button({ children, className, ...props }) {
    return (
        <button
            className={`px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
