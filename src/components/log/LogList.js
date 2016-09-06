import React, {PropTypes} from 'react';
import LogListRow from './LogListRow.js';

/**
 * LogList Component
 * @param data Array with items to list
 * @returns {*} React Component
 * @constructor
 */
const LogList = ({data}) => {
    const rows = data.map(log =>
      <LogListRow key={log.id} log={log}/>
    );
    return (
      <table>
          {rows.length > 0 &&
              <thead>
                  <tr>
                      <th>Title</th>
                      <th>Body</th>
                  </tr>
              </thead>
          }
          <tbody>
            {rows.length > 0 ? rows : <p>No results found...</p>}
          </tbody>
      </table>
    );
};

LogList.propTypes = {
    data: PropTypes.array.isRequired
};

export default LogList;