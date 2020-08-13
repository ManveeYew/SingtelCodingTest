import { all, fork } from 'redux-saga/effects';
import randomNumber from './randomNumber';

export default function* card() {
  yield all([
    fork(randomNumber),
  ]);
}
