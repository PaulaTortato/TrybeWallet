// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_SUCCESS, EXPENSES_CHANGE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  options: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_SUCCESS:
    return {
      ...state,
      // Referência para pegar os valores do objeto: https://stackoverflow.com/questions/26795643/how-to-convert-object-containing-objects-into-array-of-objects
      currencies: Object.entries(action.payload)
        .map((currency) => ({ [currency[0]]: currency[1] })),
      options: Object.values(action.payload)
        .filter((currency) => currency.codein !== 'BRLT').map((option) => option.code),
    };
  case EXPENSES_CHANGE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  default:
    return state;
  }
};

export default wallet;
