import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer, { rootSaga } from './modules';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
	reducer: rootReducer,
	middleware: [sagaMiddleware],
	devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
