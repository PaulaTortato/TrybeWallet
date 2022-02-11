// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  REQUEST_SUCCESS,
  EXPENSES_ADD,
  EXPENSES_REMOVE,
  EXPENSES_EDIT,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  exchangeRates: {},
};

const wallet = (state = INITIAL_STATE, action) => {
  // Agradecimento ao colega Rafael de Jesus por explicar a forma certa de organizar o estado: https://trybecourse.slack.com/archives/C02EZT1EJSY/p1644517474488849
  switch (action.type) {
  case REQUEST_SUCCESS:
    return {
      ...state,
      exchangeRates: action.payload,
      // Referência para pegar os valores do objeto: https://stackoverflow.com/questions/26795643/how-to-convert-object-containing-objects-into-array-of-objects
      currencies: Object.values(action.payload)
        .filter((currency) => currency.codein !== 'BRLT').map((option) => option.code),
    };
  case EXPENSES_ADD:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case EXPENSES_REMOVE:
    return {
      ...state,
      expenses: [...state.expenses
        .filter((expense) => expense.id !== Number(action.payload))],
    };
  case EXPENSES_EDIT:
    state.expenses.find((expense) => expense.id === action.payload.id)
      .value = action.payload.value;
    state.expenses.find((expense) => expense.id === action.payload.id)
      .description = action.payload.description;
    state.expenses.find((expense) => expense.id === action.payload.id)
      .method = action.payload.method;
    state.expenses.find((expense) => expense.id === action.payload.id)
      .tag = action.payload.tag;
    state.expenses.find((expense) => expense.id === action.payload.id)
      .currency = action.payload.currency;
    return {
      ...state,
      expenses: [...state.expenses],
    };
  default:
    return state;
  }
};

export default wallet;
