import React, { Component } from 'react';

class Value extends Component {
  render() {
    const { value, handleChange } = this.props;
    return (
    <div className="mb-3">
    <label htmlFor="value" className="form-label">
      Valor
      <input
        type="number"
        data-testid="value-input"
        className="form-control"
        id="value"
        value={ value }
        onChange={ handleChange }
      />
    </label>
  </div>
  )}
}

export default Value;
