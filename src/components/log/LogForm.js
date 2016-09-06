import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';

/**
 * LogForm Component
 * @param log Log to manage
 * @param onSave Method to call when saving the log item
 * @param onDelete onDelete Method to call when deleting the log item
 * @param onChange onChange Method to call when changing a value of the form
 * @param saving bool True when save action is currently running, false when not
 * @param editing bool True when editing an existing log item, false when creating a new one
 * @param errors Object containing form errors
 * @param deleteState State to track delete confirmation
 * @returns {*} React Component
 * @constructor
 */
const LogForm = ({log, onSave, onDelete, onChange, saving = false, editing = false, errors, deleteState = 0}) => {
    return (
      <form>
          <TextInput
            name="title"
            label="Title"
            value={log.title}
            onChange={onChange}
            error={errors.title}/>

          <TextInput
            name="body"
            label="Body text"
            value={log.body}
            onChange={onChange}
            error={errors.body}/>

          <input
            type="submit"
            disabled={saving}
            value={saving ? 'Saving...' : 'Save'}
            className="btn btn-primary"
            onClick={onSave}/>

          <input
            type="submit"
            disabled={saving}
            value={saving ? 'Saving...' : 'Save and keep editing'}
            className="btn"
            onClick={e => onSave(e, true)}/>

          {editing && <input
            type="submit"
            disabled={deleteState === 2}
            value={deleteState === 2 ? 'Deleting...' : (deleteState === 1 ? 'Confirm deleting' : 'Delete this log')}
            className="btn btn-danger"
            onClick={onDelete}/>}
      </form>
    );
};

LogForm.propTypes = {
    log: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    saving: PropTypes.bool,
    editing: PropTypes.bool,
    deleteState: PropTypes.number,
    errors: PropTypes.object
};

export default LogForm;