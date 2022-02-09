import React from 'react';
import { connect } from 'react-redux';
import { userLogin } from '../actions';

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
    }
  }

  inputCheck() {
    const { password, email } = this.state;
    // Referências para o regex do email: https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
    // e: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular_Expressions
    if (email.match(/^[^\s@]+@[^\s@]+\.com+$/) && password.length >= 6) {
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
    handleLogin(this.state.email);
    history.push('/carteira');
  }

  render() {
    const { disabled } = this.state;
    return (
    <form>
      <h1>Login</h1>
      <label htmlFor="email">
        Email
        <input type="email" id="email" data-testid="email-input" onChange={ this.handleChange } onKeyUp={ this.handleChange } />
      </label>
      <label htmlFor="password">
        Senha
        <input type="password" id="password" data-testid="password-input" onChange={ this.handleChange } onKeyUp={ this.handleChange } />
      </label>
      <button type="submit" disabled={ disabled } onClick={ this.handleSubmit }>Entrar</button>
    </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleLogin: (email) => dispatch(userLogin(email)),
})

export default connect(null, mapDispatchToProps)(Login);
