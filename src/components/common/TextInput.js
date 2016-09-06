import React, {PropTypes} from 'react';

/**
 * TextInput Component
 * @param name
 * @param label
 * @param onChange
 * @param placeholder
 * @param value
 * @param error
 * @param type
 * @param wrapperClass
 * @param checked
 * @returns {*} React Component
 * @constructor
 */
const TextInput = ({name, label, onChange, placeholder, value, error, type = "text", wrapperClass = [], checked}) => {
    wrapperClass.push('form-group');
    if (error && error.length > 0) {
        wrapperClass.push('has-error');
    }
    const val = typeof checked != 'undefined' ? {checked} : {value};
    return (
      <div className={wrapperClass.join(" ")}>
          <label htmlFor={name}>{label}</label>
          <div className="field">
              <input
                type={type}
                name={name}
                id={name}
                className={type !== 'checkbox' ? 'form-control' : ''}
                placeholder={placeholder}
                {...val}
                onChange={onChange}/>
              {error && <div className="alert alert-danger">{error}</div>}
          </div>
      </div>
    );
};

TextInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.string
};

export default TextInput;
