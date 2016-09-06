import React, {PropTypes} from 'react';
import PageListRow from './PageListRow.js';

/**
 * PageList Component
 * @param data Array with items to list
 * @returns {*} React Component
 * @constructor
 */
const PageList = ({data}) => {
    const rows = data.map(page =>
      <PageListRow key={page.id} page={page}/>
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

PageList.propTypes = {
    data: PropTypes.array.isRequired
};

export default PageList;