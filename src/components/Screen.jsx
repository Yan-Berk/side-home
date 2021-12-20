import React from "react";
import Header from "./Header";

const Screen = (props) => {
    return (
        <>
            <Header title={props.title} />
            <div className="screen">
                {props.children}
            </div>
        </>);
};

export default Screen;
