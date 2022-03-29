import React, { Component } from 'react';

class Value extends Component {
  render() {
    const { value, handleChange, edit } = this.props;
    return (
    <div className="mb-3">
    <label htmlFor="value" className={ edit ? "form-label edit-text" : "form-label" }>
      Amount
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
