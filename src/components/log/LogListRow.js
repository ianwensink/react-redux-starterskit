import React, {PropTypes} from 'react';
import {Link} from 'react-router';

/**
 * LogListRow Component
 * @param log Log item to build a list item of
 * @returns {*} React Component
 * @constructor
 */
const LogListRow = ({log}) => {
    return (
      <tr>
          <td><Link to={`/logs/${log.id}`}>{log.title}</Link></td>
          <td className='body'>{log.body}</td>
      </tr>
    );
};

LogListRow.propTypes = {
    log: PropTypes.object.isRequired
};

export default LogListRow;