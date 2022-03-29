import React, { Component } from 'react';

class Currency extends Component {
  render() {
    const { currencies, currency, handleChange, edit } = this.props;
    return (
      <div className="mb-3">
          <label htmlFor="currency" className={ edit ? "form-label edit-text" : "form-label" }>
            Currency
            <select
              data-testid="currency-input"
              className="form-control"
              id="currency"
              value={ currency }
              onChange={ handleChange }
            >
              {currencies.map((option) => (
                <option key={ option } data-testid={ option }>{option}</option>
              ))}
            </select>
          </label>
      </div>
  )}
}

export default Currency;
