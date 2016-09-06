import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

/**
 * PageForm Component
 * @param page Page to manage
 * @param pageTypes Array of page types options
 * @param overviewTypes Array of overview types options
 * @param onSave Method to call when saving the page
 * @param onDelete Method to call when deleting the page
 * @param onChange Method to call when changing a value of the form
 * @param saving bool True when save action is currently running, false when not
 * @param editing bool True when editing an existing page, false when creating a new one
 * @param errors Object containing form errors
 * @param deleteState State to track delete confirmation
 * @returns {*} React Component
 * @constructor
 */
const PageForm = ({page, pageTypes, overviewTypes, onSave, onDelete, onChange, saving = false, editing = false, errors, deleteState = 0}) => {
    return (
      <form>
          <TextInput
            name="title"
            label="Title"
            value={page.title}
            onChange={onChange}
            error={errors.title}/>

          <SelectInput
            name="type"
            label="Page Type"
            value={page.type}
            defaultOption="Select Page type"
            options={pageTypes}
            onChange={onChange}
            error={errors.type}/>

          <SelectInput
            name="overview_type"
            label="Overview Type"
            value={page.overview_type}
            defaultOption="Select Overview type"
            options={overviewTypes}
            onChange={onChange}
            wrapperClass={page.type !== 'overview' ? ['hidden'] : []}
            error={errors.overview_type}/>

          <TextInput
            name="body"
            label="Body text"
            value={page.body}
            onChange={onChange}
            error={errors.body}/>

          <TextInput
            type="checkbox"
            name="access"
            label="Accessible page (uncheck to make page login protected)"
            checked={page.access}
            onChange={onChange}
            error={errors.access}/>

          <TextInput
            type="checkbox"
            name="show_nav"
            label="Show in navigation"
            checked={page.show_nav}
            onChange={onChange}
            error={errors.show_nav}/>

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
            value={deleteState === 2 ? 'Deleting...' : (deleteState === 1 ? 'Confirm deleting' : 'Delete this page')}
            className="btn btn-danger"
            onClick={onDelete}/>}
      </form>
    );
};

PageForm.propTypes = {
    page: PropTypes.object.isRequired,
    pageTypes: PropTypes.array.isRequired,
    overviewTypes: PropTypes.array.isRequired,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    saving: PropTypes.bool,
    editing: PropTypes.bool,
    deleteState: PropTypes.number,
    errors: PropTypes.object
};

export default PageForm;