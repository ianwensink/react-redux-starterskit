import React, {PropTypes} from 'react';

/**
 * SelectInput Component
 * @param name
 * @param label
 * @param onChange
 * @param defaultOption
 * @param value
 * @param error
 * @param options
 * @param wrapperClass
 * @returns {*} React Component
 * @constructor
 */
const SelectInput = ({name, label, onChange, defaultOption, value, error, options, wrapperClass = []}) => {
    wrapperClass.push('form-group');

    return (
      <div className={wrapperClass.join(" ")}>
          <label htmlFor={name}>{label}</label>
          <div className="field">
              {/* Note, value is set here rather than on the option - docs: https://facebook.github.io/react/docs/forms.html */}
              <select
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                className="form-control">
                  <option value="">{defaultOption}</option>
                  {options.map((option) => {
                      return <option key={option.value} value={option.value}>{option.text}</option>;
                  })
                  }
              </select>
              {error && <div className="alert alert-danger">{error}</div>}
          </div>
      </div>
    );
};

SelectInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    defaultOption: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object)
};

export default SelectInput;
