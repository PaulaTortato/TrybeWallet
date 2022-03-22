import React, { Component } from 'react';

class Description extends Component {
  render() {
    const { description, handleChange } = this.props;
    return (
      <div className="mb-3">
      <label htmlFor="description" className="form-label">
        Descrição
        <input
          type="text"
          data-testid="description-input"
          className="form-control"
          id="description"
          value={ description }
          onChange={ handleChange }
        />
      </label>
    </div>
  )}
}

export default Description;
