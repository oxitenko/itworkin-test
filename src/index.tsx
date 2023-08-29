import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import {Provider} from "react-redux";
import createSagaMiddleware from "redux-saga";
import {configureStore} from "@reduxjs/toolkit";
import rootSaga from "./saga/RootSaga";
import locationReducer from "./redux/locationState";
import characterReducer from "./redux/characterState";

const saga = createSagaMiddleware();
const store = configureStore({
    reducer: {
        location: locationReducer,
        character: characterReducer,
    },
    middleware: [saga]
});

saga.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

