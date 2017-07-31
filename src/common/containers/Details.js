import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-advanced';

import * as actions from '../actions';

import ResultItem from '../components/ResultItem';

import './Details.css';

class Details extends Component {

  componentWillMount() {
    this.props.fetchItem(this.props.match.params.id);

    if (this.props.item) {
      this.props.searchByTerm(this.props.item.title);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.item) {
      this.props.searchByTerm(nextProps.item.title);
    }
  }

  render() {
    if (!this.props.item) {
      return (<Loader show={!this.props.item ? true : false} message={'Carregando...'} />);
    }

    return (
        <div className="details">
          <div className="header row">
            <div className="picture col-sm-12 col-md-8" >
              <img src={this.props.item.picture} />
            </div>

            <div className="info col-sm-12 col-md-4 text-left">
              <p className="extra-details">
                {this.props.item.condition} - {this.props.item.sold_quantity} vendidos
              </p>
              <p className="title">
                {this.props.item.title}
              </p>
              <p className="price">
                {this.props.item.price.currency} {this.props.item.price.decimals}
              </p>
              <button role="button" className="btn btn-primary">Comprar</button>
            </div>
          </div>

          <div className="description">
            <h1>Descripción del producto</h1>
            <div>
              <div dangerouslySetInnerHTML={{ __html: this.props.item.description }} />
            </div>
          </div>
        </div>
    );
  }
}

function mapStateToProps({ fetch }) {

  return { item: fetch.item };
}

export default connect(mapStateToProps, actions)(Details);