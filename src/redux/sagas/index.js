import { all, fork } from 'redux-saga/effects';
import card from './card';

export default function* root() {
  yield all([
    fork(card),
  ]);
}
