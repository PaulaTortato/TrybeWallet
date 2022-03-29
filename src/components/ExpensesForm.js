import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestRates, expensesChange } from '../actions';
import Value from './Form Inputs/Value';
import Description from './Form Inputs/Description';
import Currency from './Form Inputs/Currency';
import Method from './Form Inputs/Method';
import Tag from './Form Inputs/Tag';

const METHOD = ['Paper money', 'Credit card', 'Debit card'];
const TAG = ['Food', 'Leisure', 'Work', 'Transportation', 'Health'];

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
      <form className="form-expenses">
        <Value value={ value } handleChange={ this.handleChange } />
        <Description description={ description } handleChange={ this.handleChange } />
        <Currency currency={ currency } currencies={ currencies } handleChange={ this.handleChange } />
        <Method method={ method } METHOD={ METHOD } handleChange={ this.handleChange } />
        <Tag tag={ tag } TAG={ TAG } handleChange={ this.handleChange } />
        <button type="button" onClick={ this.handleClick } className="btn add-btn">Add expense</button>
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
