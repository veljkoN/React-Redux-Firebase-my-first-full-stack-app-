import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TodoApp from './TodoApp';
import { Provider } from 'react-redux'
import { createStore, combineReducers,applyMiddleware, compose } from 'redux'  //applay middleware je zbog thunk
import { createTodoReduer } from './store/ReduxStore'
import thunk from 'redux-thunk'    //thunk
import { reduxFirestore, getFirestore } from 'redux-firestore'  //ovo je paket koji sam instalirao da bi se povezao na firestore
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';  //i ovaj paket sam insalirao isto kao ovaj gore
import fbConfig from './config/fbConfig'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import authReducer from './store/authReducer';



const allReducers = combineReducers({
    auth:authReducer,
    todos:createTodoReduer,
    firestore:firestoreReducer,
    firebase:firebaseReducer    
})
export const store=createStore(allReducers,
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirebase,getFirestore })),
        reduxFirestore(fbConfig),
        reactReduxFirebase(fbConfig, {useFirestoreForProfile:true, userProfile: 'users', attachAuthIsReady:true})  //useFirestoreForProfile i userProfile koristim da bih u firabase nasao podatke o user-u
    ) 
)  

store.firebaseAuthIsReady.then(() => {    
  ReactDOM.render(                       
      <Provider store={store}>
       <TodoApp />
      </Provider>,
    document.getElementById('root')
  );
})





