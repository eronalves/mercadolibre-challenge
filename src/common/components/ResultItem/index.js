import React from 'react';
import { Link } from 'react-router-dom'

import './ResultItem.css';

const ResultItem = ({item, actions}) => {

  const renderFreeShipping = (item) => {
    if (item.free_shipping) {
      return (
        <img src="assets/ic_shipping.png" />
      );
    }
  }

  return (
    <div className="result-item-box">
      <Link to={`items/${item.id}`} key={item.id} className="result-item row"> 
        <div className="picture col-sm-3 text-center">
          <img src={item.picture} />
        </div>
        <div className="description col-sm-6 text-left">
          <h1>
            {item.price.currency} {item.price.decimals} {renderFreeShipping(item)}
          </h1>
          <p>{item.title}</p>
        </div>
        <div className="city col-sm-2 text-center">
          <p>{item.city_name}</p>
        </div>        
      </Link>
      <hr />
    </div>
  );
};

export default ResultItem;