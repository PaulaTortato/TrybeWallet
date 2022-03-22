import React, { Component } from 'react';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    return (
      <header className="header">
        <h1>Carteira</h1>
        <div className="info">
          <h5 data-testid="email-field">
            { `Email: ${email}` }
          </h5>
          <h5 data-testid="total-field">
            { `Despesa Total: $${total.toFixed(2)} BRL` }
          </h5>
        </div>
      </header>
    )}
}

export default Header;
