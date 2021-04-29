import React from 'react';
import ReactDOM from 'react-dom';
import { Global, css } from '@emotion/react';
import firebase from 'firebase/app';
import App from './App';
import { AuthProvider } from './context/auth-context';

const firebaseConfig = {
  apiKey: 'AIzaSyBzlAwZde0VTiQcUbh5Wun1pTfWaFLeceY',
  authDomain: 'bookstore-9f560.firebaseapp.com',
  projectId: 'bookstore-9f560',
  storageBucket: 'bookstore-9f560.appspot.com',
  messagingSenderId: '137947577646',
  appId: '1:137947577646:web:b2b06fbc6aed486edf0ebf',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function AppProvider({ children }: any) {
  return <AuthProvider>{children}</AuthProvider>;
}

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <Global
        styles={css`
          html,
          body,
          #root {
            height: 100%;
          }
          body {
            margin: 0;
            font-family: 'Roboto', sans-serif;
          }
        `}
      />
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
