import React from 'react';
import ScreenContainer from "./components/ScreenContainer";
import { Outlet } from 'react-router-dom';

function App() {
    return (
        <>
            <ScreenContainer>
                <Outlet />
            </ScreenContainer>
        </>
    );
}

export default App;