import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ExpensesForm from '../components/ExpensesForm';
import ExpensesTable from '../components/ExpensesTable';
import EditForm from '../components/EditForm';
import '../styles/Wallet.css';
import Header from '../components/Header';

class Wallet extends React.Component {
  constructor() {
    super();
    this.totalCheck = this.totalCheck.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.editFinish = this.editFinish.bind(this);
    this.state = {
      total: 0,
      edit: false,
      editId: '',
    };
  }

  componentDidMount() {
    this.totalCheck();
  }

  totalCheck() {
    const { expenses } = this.props;
    let total = 0;
    if (expenses.length === 0) {
      this.setState({ total });
    } else {
      expenses.forEach((expense) => {
        total += expense.value * expense.exchangeRates[expense.currency].ask;
      });
      this.setState({ total });
    }
  }

  handleEdit(id) {
    this.setState({ edit: true, editId: id });
  }

  editFinish() {
    this.setState({ edit: false, editId: '' });
  }

  render() {
    const { email } = this.props;
    const { total, edit, editId } = this.state;
    return (
      <main>
        <Header email={ email } total={ total } />
        <section>
          {edit ? (
            <EditForm
              totalCheck={ this.totalCheck }
              editId={ editId }
              editFinish={ this.editFinish }
            />)
            : <ExpensesForm totalCheck={ this.totalCheck } />}
        </section>
        <section>
          <ExpensesTable totalCheck={ this.totalCheck } handleEdit={ this.handleEdit } />
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Wallet);
