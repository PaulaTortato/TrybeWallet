import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestRates, expensesChange } from '../actions';

const METHOD = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const TAG = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class ExpensesForm extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      value: 0,
      description: '',
      currency: '',
      method: METHOD[0],
      tag: TAG[0],
    };
  }

  componentDidMount() {
    const { handleRequest } = this.props;
    handleRequest();
  }

  handleChange({ target }) {
    const { currencies } = this.props;
    const { currency } = this.state;
    const { id, value } = target;
    if (currency === '') {
      this.setState({ currency: currencies[0] });
    }
    this.setState({
      [id]: value,
    });
  }

  handleClick() {
    const { handleRequest, expenses, handleExpensesChange,
      totalCheck, exchangeRates } = this.props;
    const { value, description, currency, method, tag } = this.state;
    handleRequest();
    let id = 0;
    if (expenses.length > 0) {
      id = expenses[expenses.length - 1].id + 1;
    }
    handleExpensesChange({
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    });
    this.setState({
      value: 0,
      description: '',
      currency: '',
      method: METHOD[0],
      tag: TAG[0],
    }, () => totalCheck());
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="value">
          Valor
          <input
            type="number"
            data-testid="value-input"
            id="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            type="text"
            data-testid="description-input"
            id="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda
          <select
            data-testid="currency-input"
            id="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((option) => (
              <option key={ option } data-testid={ option }>{option}</option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Método
          <select
            data-testid="method-input"
            id="method"
            value={ method }
            onChange={ this.handleChange }
          >
            {METHOD.map((option) => <option key={ option }>{option}</option>)}
          </select>
        </label>
        <label htmlFor="tag">
          Categoria
          <select
            data-testid="tag-input"
            id="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            {TAG.map((option) => <option key={ option }>{ option }</option>)}
          </select>
        </label>
        <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  exchangeRates: state.wallet.exchangeRates,
});

const mapDispatchToProps = (dispatch) => ({
  handleRequest: () => dispatch(requestRates()),
  handleExpensesChange: (expense) => dispatch(expensesChange(expense)),
});

ExpensesForm.defaultProps = {
  currencies: [],
  exchangeRates: {},
};

ExpensesForm.propTypes = {
  exchangeRates: PropTypes.objectOf(PropTypes.object),
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string),
  handleRequest: PropTypes.func.isRequired,
  handleExpensesChange: PropTypes.func.isRequired,
  totalCheck: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
