import React from 'react';
import StoreProvider from "./store/StoreProvider";
import Header from "./components/Header/Header";

const App = () => {
    return (
        <StoreProvider>
            <Header/>
        </StoreProvider>
    );
}
export default App;