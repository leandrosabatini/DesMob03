import React from 'react';
import ContatosNavigator from './navegacao/ContatosNavigator'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import contatosReducer from './store/contatos-reducer';
import { init } from './helpers/db';

import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

init().then(() => {
    console.log("Criação da base ocorreu com sucesso.");
}).catch((err) => {
    console.log('Criação da base falhou.');
    console.log(err);
});

const rootReducer = combineReducers({
    contatos: contatosReducer
});

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

export default function App() {
    return (
        <Provider store={store}>
            <ContatosNavigator />
        </Provider>
    );
}
