import React from 'react';
import PropTypes from 'prop-types';

import './Breadcrumb.css';

function renderCrumbs(crumbs) {
  return crumbs.map((crumb, index) => {    
    const style = `breadcrumb-item ${index === (crumbs.length -1) ? 'active' : ''}`;
    return (
      <a href="#" className={style} key={crumb}>{crumb}</a>
    );
  });
}

const Bredcrumb = ({
  crumbs,
}) => (
    <nav className="breadcrumb">
      {renderCrumbs(crumbs)}
    </nav>
  );

Bredcrumb.propTypes = {
  crumbs: PropTypes.array.isRequired
};

export default Bredcrumb;
