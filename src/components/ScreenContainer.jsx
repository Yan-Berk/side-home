import React from 'react';

const ScreenContainer = (props) => {
    return (
        <>
            <div className="screen-container">{props.children}</div>
        </>
    )
};

export default ScreenContainer;
