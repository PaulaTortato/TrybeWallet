export const USER_LOGIN = 'USER_LOGIN';
export const EXPENSES_CHANGE = 'EXPENSES_CHANGE';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_FAIL = 'REQUEST_FAIL';

export const userLogin = (payload) => ({
  type: USER_LOGIN,
  payload,
});

export const expensesChange = (payload) => ({
  type: EXPENSES_CHANGE,
  payload,
});

const requestSuccess = (payload) => ({
  type: REQUEST_SUCCESS,
  payload,
});

const requestFail = (payload) => ({
  type: REQUEST_FAIL,
  payload,
});

export const requestRates = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(requestSuccess(data));
  } catch (error) {
    dispatch(requestFail(error));
  }
};
