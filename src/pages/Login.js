import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLogin } from '../actions';
import '../styles/Login.css';

const MIN_CHAR = 6;

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.inputCheck = this.inputCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
  }

  inputCheck() {
    const { password, email } = this.state;
    // Referências para o regex do email: https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
    // e: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular_Expressions
    if (email.match(/^[^\s@]+@[^\s@]+\.com$/) && password.length >= MIN_CHAR) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  handleChange({ target }) {
    const { value } = target;
    if (target.id === 'email') {
      this.setState({ email: value }, () => this.inputCheck());
    } else {
      this.setState({ password: value }, () => this.inputCheck());
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { history, handleLogin } = this.props;
    const { email } = this.state;
    handleLogin(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, disabled } = this.state;
    return (
      <main className="main">
        <h1>TybeWallet</h1>
        <form className="form">
          <h3 className="form-title">Login</h3>
          <label htmlFor="email" className="form-label">
            Email
            <input
              type="email"
              id="email"
              data-testid="email-input"
              className="form-control"
              value={ email }
              onChange={ this.handleChange }
              onKeyUp={ this.handleChange }
            />
          </label>
          <label htmlFor="password" className="form-label">
            Senha
            <input
              type="password"
              id="password"
              data-testid="password-input"
              className="form-control"
              value={ password }
              onChange={ this.handleChange }
              onKeyUp={ this.handleChange }
            />
            <div id="passwordHelpBlock" className="form-text">
            Your password must be 6 characters long.
            </div>
          </label>
          <button
            type="submit"
            disabled={ disabled }
            onClick={ this.handleSubmit }
            className="btn button"
          >
            Entrar
          </button>
        </form>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleLogin: (email) => dispatch(userLogin(email)),
});

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
