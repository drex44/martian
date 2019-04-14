import React from 'react';
import PropTypes from 'prop-types';

export default class HeaderInputList extends React.Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleAddNew: PropTypes.func.isRequired,
  };

  handleChange = (event, index) => {
    const { name, value, checked } = event.target;
    const headers = this.props.headers;
    if (name == 'active') {
      headers[index][name] = checked;
    } else {
      headers[index][name] = value;
    }
    this.props.handleChange(headers);
  };

  handleDelete = (index) => {
    const headers = [...this.props.headers];
    headers.splice(index, 1);
    this.props.handleChange(headers);
  };

  render() {
    return (
      <>
        {this.props.headers.map((header, index) => (
          <HeaderInput
            key={index}
            header={header}
            handleChange={(e) => this.handleChange(e, index)}
            handleDelete={() => this.handleDelete(index)}
          />
        ))}
        <button className="field button is-outlined is-dark" onClick={this.props.handleAddNew}>
          +
        </button>
      </>
    );
  }
}

function HeaderInput({ handleChange, handleDelete, header }) {
  return (
    <div className="field">
      <div className="field is-grouped">
        <div className="control">
          <input type="checkbox" name="active" onChange={handleChange} checked={header.active} />
        </div>
        <div className="control is-expanded">
          <input
            className="input"
            type="text"
            name="name"
            placeholder="header"
            value={header.name}
            onChange={handleChange}
          />
        </div>
        <div className="control is-expanded">
          <input
            className="input"
            type="text"
            name="value"
            placeholder="value"
            value={header.value}
            onChange={handleChange}
          />
        </div>
        <div className="control">
          <button className="button is-outlined is-danger" onClick={handleDelete}>
            x
          </button>
        </div>
      </div>
    </div>
  );
}

HeaderInput.propTypes = {};
