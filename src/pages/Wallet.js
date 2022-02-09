import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      total: 0,
    };
  }

  render() {
    const { email } = this.props;
    const { total } = this.state;
    return (
      <div>
        <header>
          <h1>Carteira</h1>
          <section>
            <h4 data-testid="email-field">
              Email:
              { ' ' }
              { email }
            </h4>
            <h4 data-testid="total-field">
              Despesa Total: $
              { total }
              { ' ' }
              <span data-testid="header-currency-field">BRL</span>
            </h4>
          </section>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
