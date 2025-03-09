import React from 'react';

function Card({ children, className, ...props }) {
    return (
        <div className={`border rounded-md p-4 shadow-sm ${className}`} {...props}>
            {children}
        </div>
    );
}

export default Card;
