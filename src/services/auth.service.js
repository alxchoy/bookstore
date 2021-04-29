import firebase from 'firebase/app';
import 'firebase/auth';

export const createUser = ({ email, password }) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);

export const loginUser = ({ email, password }) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export const logoutUser = () => firebase.auth().signOut();
