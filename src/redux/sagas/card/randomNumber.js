import { takeLatest, all, fork, call, put, select } from 'redux-saga/effects';
import Actions from 'actions';
import * as api from 'api';

function* fetchRandomNumber({}) {
  const CARD_PAIRS_VALUE = [];
  let additionalLoop = 0;
  // get random numbers
  for (let i = 0; i < (6 + additionalLoop); i++) {
    var randomNumber = Math.floor(Math.random() * 100) + 1 ;
    if (CARD_PAIRS_VALUE[CARD_PAIRS_VALUE.length - 1] !== randomNumber) {
      CARD_PAIRS_VALUE.push({ number: randomNumber, isClicked: false });
      CARD_PAIRS_VALUE.push({ number: randomNumber, isClicked: false });
    } else {
      additionalLoop = additionalLoop + 1;
    }
  }

  // Shuffle
  let i = 0;
  let j = 0;
  let temp = 0;
  for (i = CARD_PAIRS_VALUE.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = CARD_PAIRS_VALUE[i];
    CARD_PAIRS_VALUE[i] = CARD_PAIRS_VALUE[j];
    CARD_PAIRS_VALUE[j] = temp;
  }

  yield put(Actions.fetchRandomNumberSuccess(CARD_PAIRS_VALUE));
}

function* updateRandomNumber({ updatedData }) {
  yield put(Actions.updateRandomNumberSuccess(updatedData));
}

function* watchFetchRandomNumber() {
  yield takeLatest(Actions.FETCH_RANDOM_NUMBER, fetchRandomNumber);
}

function* watchUpdateRandomNumber() {
  yield takeLatest(Actions.UPDATE_RANDOM_NUMBER, updateRandomNumber);
}

export default function* get() {
  yield all([
    fork(watchFetchRandomNumber),
    fork(watchUpdateRandomNumber),
  ]);
}
