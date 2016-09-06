import React, {PropTypes} from 'react';
import AchievementListRow from './AchievementListRow.js'
import AchievementFilter from './AchievementFilter.js'

/**
 * AchievementList Component Class
 * @param data Array with items to list
 * @returns {*} React Component
 * @constructor
 */
class AchievementList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: {},
            filteredAchievements: props.data,
            achievements: props.data
        };

        this.onFilterChange = this.onFilterChange.bind(this);
    }

    onFilterChange(filters) {
        const achievements = this.state.achievements || [];
        const filteredAchievements = achievements.filter(achievement => {
            return (Object.keys(filters).length > 0 && ((
                filters.categoryFilter.length === 0 &&
                filters.statusFilter.length === 0) ||
                (filters.categoryFilter.find(category => category.value === achievement.type) &&
                filters.statusFilter.find(status => status.value === achievement.status.value)) ||
                (filters.categoryFilter.find(category => category.value === achievement.type) &&
                filters.statusFilter.length === 0)) ||
                (filters.categoryFilter.length === 0 &&
                filters.statusFilter.find(status => status.value === achievement.status.value))
            );
        });
        this.setState({filteredAchievements});
    }

    render () {
        const achievements = this.state.filteredAchievements;
        const rows = achievements.map(achievement =>
          <AchievementListRow key={achievement.id} achievement={achievement}/>
        );
        return (
          <div>
              <AchievementFilter onFilterChange={this.onFilterChange}/>
              <table>
                  {rows.length > 0 &&
                  <thead>
                      <tr>
                          <th>Status</th>
                          <th>Title</th>
                          <th>Category</th>
                          <th>Body</th>
                      </tr>
                  </thead>
                  }
                  <tbody>
                    {rows.length > 0 ? rows : <p>No results found...</p>}
                  </tbody>
              </table>
          </div>
        );
    }
};

AchievementList.propTypes = {
    data: PropTypes.array.isRequired
};

export default AchievementList;