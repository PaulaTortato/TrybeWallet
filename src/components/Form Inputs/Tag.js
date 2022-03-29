import React, { Component } from 'react';

class Tag extends Component {
  render() {
    const { tag, TAG, handleChange, edit } = this.props;
    return (
      <div className="mb-3">
          <label htmlFor="tag" className={ edit ? "form-label edit-text" : "form-label" }>
            Tag
            <select
              data-testid="tag-input"
              className="form-control"
              id="tag"
              value={ tag }
              onChange={ handleChange }
            >
              {TAG.map((option) => <option key={ option }>{ option }</option>)}
            </select>
          </label>
        </div>
  )}
}

export default Tag;
