import React from 'react';
import { render } from 'react-dom';

const counter = (state = 0, action) => {
     switch (action.type) {
          case 'INCREMENT':
               state+=1;
               break;
          case 'DECREMENT':
               state-=1;
               break;
          default:
               break;
     }
     return state;
};

const createStore = (reducer) => {
     let state;
     let listeners = [];
     const getState = () => state;
     const dispatch = (action) => {
          state = reducer(state, action);
          listeners.forEach( l => l());
     }
     const subscribe = (listener) => {
          listeners.push(listener);
          // Auto unsubscribe function
          return () => {
               listeners = listeners.filter(l => l !== listener);
          }
     }
     dispatch({});
     return { getState, dispatch, subscribe };
};

const Counter = ({value, onIncrement, onDecrement}) => {
     return (<div>
          <h1>{value}</h1>
          <button onClick={onIncrement}>+</button>
          <button onClick={onDecrement}>-</button>
          </div>); 
}
const store = createStore(counter);

const myRender = () => {
     render(<Counter value={store.getState()}
          onIncrement={() => (store.dispatch({type: 'INCREMENT'}))}
          onDecrement={() => (store.dispatch({type: 'DECREMENT'}))}
          />, 
     document.querySelector('.appMountPoint'));
}
store.subscribe(myRender);

myRender();

