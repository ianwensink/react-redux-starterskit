import React, {PropTypes} from 'react';
import {Link} from 'react-router';

/**
 * AchievementListRow Component
 * @param achievement Achievement to build a list item of
 * @returns {*} React Component
 * @constructor
 */
const AchievementListRow = ({achievement}) => {
    return (
      <tr>
          <td>
              <span>
                  <i className={`glyphicon ${achievement.status && achievement.status.class}`}></i>
                  {' '}
                  {achievement.status && achievement.status.label}
              </span>
          </td>
          <td><Link to={`/achievements/${achievement.id}`}>{achievement.title}</Link></td>
          <td>{achievement.type}</td>
          <td className='body'>{achievement.body}</td>
      </tr>
    );
};

AchievementListRow.propTypes = {
    achievement: PropTypes.object.isRequired
};

export default AchievementListRow;