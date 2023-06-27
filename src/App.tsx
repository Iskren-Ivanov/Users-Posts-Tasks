import React from 'react';
import Navigation from './components/Navigation/Navigation';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router/Router';
import { Provider } from "react-redux";
import store from "./Redux/store";

const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Navigation />
            <Router />
        </BrowserRouter>
    </Provider>
);

export default App;
