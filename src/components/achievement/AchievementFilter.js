import React, {PropTypes} from 'react';
import AdvancedSelect from 'react-select';
import achievementTypes from '../../models/achievementTypes';
import statusTypes from '../../models/statusTypes';

/**
 * AchievementFilter React Component Class
 */
class AchievementFilter extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            filters: {
                categoryFilter: [],
                statusFilter: []
            }
        };

        this.onCategoryFilterChange = this.onCategoryFilterChange.bind(this); // Bind 'this' to function to 'this' in method is Class and not event target
        this.onStatusFilterChange = this.onStatusFilterChange.bind(this); // Bind 'this' to function to 'this' in method is Class and not event target
    }

    /**
     * Method gets called when the category filter select's value changes
     * @param value
     * @returns {*}
     */
    onCategoryFilterChange(value) {
        const filters    = this.state.filters;
        filters.categoryFilter = Array.isArray(value) ? value : [];  // Redux select component calls onChange with value object, not Event object
        this.props.onFilterChange(filters); // Call onFilterChange method of parent component
        return this.setState({filters});
    }

    /**
     * Method gets called when the category filter select's value changes
     * @param value
     * @returns {*}
     */
    onStatusFilterChange(value) {
        const filters = this.state.filters;
        filters.statusFilter = Array.isArray(value) ? value : []; // Redux select component calls onChange with value object, not Event object
        this.props.onFilterChange(filters); // Call onFilterChange method of parent component
        return this.setState({filters});
    }

    render() {
        return (
          <div>
              <h3>Filter achievements</h3>
              <form className="form-inline">
                  <div className="form-group">
                      <label htmlFor="statusFilter">{"Status"}</label>
                      <div className="field">
                          <AdvancedSelect
                            name="statusFilter"
                            value={this.state.filters.statusFilter}
                            options={statusTypes}
                            onChange={this.onStatusFilterChange}
                            multi={true}/>
                      </div>
                  </div>
                  <div className="form-group">
                      <label htmlFor="categoryFilter">{"Categories"}</label>
                      <div className="field">
                          <AdvancedSelect
                            name="categoryFilter"
                            value={this.state.filters.categoryFilter}
                            options={achievementTypes}
                            onChange={this.onCategoryFilterChange}
                            multi={true}/>
                      </div>
                  </div>
              </form>
          </div>
        );
    }
};

AchievementFilter.contextTypes = {
    router: PropTypes.object.isRequired
};

AchievementFilter.propTypes = {
};

export default AchievementFilter;