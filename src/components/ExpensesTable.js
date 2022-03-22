import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { expensesRemove } from '../actions';

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
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
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
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                  className="btn"
                  onClick={ () => handleEdit(expense.id) }
                >
                  Editar
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  className="btn"
                  onClick={ this.handleClick }
                >
                  Deletar
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
