const NAME = 'CARD';

export const FETCH_RANDOM_NUMBER = `${NAME}/FETCH_RANDOM_NUMBER`;
export const FETCH_RANDOM_NUMBER_SUCCESS = `${NAME}/FETCH_RANDOM_NUMBER_SUCCESS`;

export const UPDATE_RANDOM_NUMBER = `${NAME}/UPDATE_RANDOM_NUMBER`;
export const UPDATE_RANDOM_NUMBER_SUCCESS = `${NAME}/UPDATE_RANDOM_NUMBER_SUCCESS`;

export const getRandomNumberArray = store => store[NAME].randomNumber.data;

export const fetchRandomNumber = () => ({
  type: FETCH_RANDOM_NUMBER,
});

export const fetchRandomNumberSuccess = data => ({
  type: FETCH_RANDOM_NUMBER_SUCCESS,
  data,
});

export const updateRandomNumber = updatedData => ({
  type: UPDATE_RANDOM_NUMBER,
  updatedData,
});

export const updateRandomNumberSuccess = data => ({
  type: UPDATE_RANDOM_NUMBER_SUCCESS,
  data,
});
