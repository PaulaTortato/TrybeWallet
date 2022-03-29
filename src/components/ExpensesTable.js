import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { expensesRemove } from '../actions';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

library.add(faPenToSquare, faTrashCan);

class ExpensesTable extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate() {
    const { totalCheck } = this.props;
    totalCheck();
  }

  handleClick({ target }) {
    const { handleDelete } = this.props;
    const { id } = target.parentElement.parentElement;
    handleDelete(id);
  }

  render() {
    const { expenses, handleEdit } = this.props;
    return (
      // Referência para tabelas em js: https://www.w3schools.com/html/html_tables.asp
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>Description</th>
            <th>Tag</th>
            <th>Method of payment</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Rate</th>
            <th>Converted amount</th>
            <th>Currency converted to</th>
            <th>Edit/Remove</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((expense) => (
            <tr key={ expense.id } id={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{Number(expense.value).toFixed(2)}</td>
              {/* Referência para função substring: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/substring */}
              <td>
                {expense.exchangeRates[expense.currency].name.includes('/')
                  ? expense.exchangeRates[expense.currency].name.substring(0,
                    expense.exchangeRates[expense.currency].name.indexOf('/'))
                  : expense.exchangeRates[expense.currency].name}
              </td>
              <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
              <td>
                {Number(expense.exchangeRates[expense.currency].ask * expense.value)
                  .toFixed(2)}
              </td>
              <td>Real</td>
              <td className="btns">
                <button
                  type="button"
                  data-testid="edit-btn"
                  className="btn edit"
                  onClick={ () => handleEdit(expense.id) }
                >
                  <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  className="btn remove"
                  onClick={ this.handleClick }
                >
                  <FontAwesomeIcon icon="fa-solid fa-trash-can" />
                </button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  handleDelete: (id) => dispatch(expensesRemove(id)),
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleDelete: PropTypes.func.isRequired,
  totalCheck: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
