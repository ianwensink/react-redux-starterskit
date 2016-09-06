import React, {PropTypes} from 'react';
import {Link} from 'react-router';

/**
 * PageListRow Component
 * @param page Page to build a list item of
 * @returns {*} React Component
 * @constructor
 */
const PageListRow = ({page}) => {
    return (
      <tr>
          <td><Link to={`/${page.id}`}>{page.title}</Link></td>
          <td className='body'>{page.body}</td>
      </tr>
    );
};

PageListRow.propTypes = {
    page: PropTypes.object.isRequired
};

export default PageListRow;