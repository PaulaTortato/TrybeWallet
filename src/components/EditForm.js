import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestRates, expensesEdit } from '../actions';
import Value from './Form Inputs/Value';
import Description from './Form Inputs/Description';
import Currency from './Form Inputs/Currency';
import Method from './Form Inputs/Method';
import Tag from './Form Inputs/Tag';

const METHOD = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const TAG = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class EditForm extends React.Component {
  constructor() {
    super();
    this.getExpense = this.getExpense.bind(this);
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
    this.getExpense();
  }

  getExpense() {
    const { expenses, editId } = this.props;
    const isChanging = expenses.find((expense) => expense.id === editId);
    this.setState({
      value: isChanging.value,
      description: isChanging.description,
      currency: isChanging.currency,
      method: isChanging.method,
      tag: isChanging.tag,
    });
  }

  handleClick() {
    const { handleExpensesChange, totalCheck, editId, editFinish } = this.props;
    const { value, description, currency, method, tag } = this.state;
    handleExpensesChange({
      id: editId,
      value,
      description,
      currency,
      method,
      tag,
    });
    this.setState({
      value: 0,
      description: '',
      currency: '',
      method: METHOD[0],
      tag: TAG[0],
    }, () => {
      totalCheck();
      editFinish();
    });
  }

  handleChange({ target }) {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <form className="form-edit">
        <Value value={ value } handleChange={ this.handleChange } />
        <Description description={ description } handleChange={ this.handleChange } />
        <Currency currency={ currency } currencies={ currencies } handleChange={ this.handleChange } />
        <Method method={ method } METHOD={ METHOD } handleChange={ this.handleChange } />
        <Tag tag={ tag } TAG={ TAG } handleChange={ this.handleChange } />
        <button type="button" onClick={ this.handleClick } className="btn">Editar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  handleRequest: () => dispatch(requestRates()),
  handleExpensesChange: (expense) => dispatch(expensesEdit(expense)),
});

EditForm.defaultProps = {
  currencies: [],
};

EditForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.object),
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleRequest: PropTypes.func.isRequired,
  handleExpensesChange: PropTypes.func.isRequired,
  totalCheck: PropTypes.func.isRequired,
  editId: PropTypes.number.isRequired,
  editFinish: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
