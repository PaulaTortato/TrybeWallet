import React, { Component } from 'react';

class Method extends Component {
  render() {
    const { method, METHOD, handleChange, edit } = this.props;
    return (
      <div className="mb-3">
      <label htmlFor="method" className={ edit ? "form-label edit-text" : "form-label" }>
        Method
        <select
          data-testid="method-input"
          className="form-control"
          id="method"
          value={ method }
          onChange={ handleChange }
        >
          {METHOD.map((option) => <option key={ option }>{option}</option>)}
        </select>
      </label>
    </div>
  )}
}

export default Method;
