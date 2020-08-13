import Actions from 'actions';

const getDefaultState = () => ({ data: [] });

function randomNumber(state, action) {
  if (typeof state === 'undefined') {
    return getDefaultState();
  }

  switch (action.type) {
    case Actions.FETCH_RANDOM_NUMBER:
      return {
        data: [],
      };
    case Actions.FETCH_RANDOM_NUMBER_SUCCESS:
      return {
        isFetching: false,
        errors: [],
        data: action.data,
      };
    case Actions.UPDATE_RANDOM_NUMBER:
      return {
        data: [...state.data],
      };
    case Actions.UPDATE_RANDOM_NUMBER_SUCCESS:
      return {
        isFetching: false,
        errors: [],
        data: action.data,
      };
    default:
      return state;
  }
}

export default randomNumber;
