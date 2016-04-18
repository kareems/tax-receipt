import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import './AlternativeProducts.scss';

class AlternativeProducts extends Component {

  static propTypes = {
    products: PropTypes.array,
  };

  static defaultProps = {
    incomeTax: 0,
    payrollTax: 0,
  };

  render() {
    const taxIsNan = isNaN(this.props.incomeTax) && isNaN(this.props.payrollTax);
    let taxPaid = 0;
    if (!taxIsNan) {
      taxPaid = (this.props.incomeTax || 0) + (this.props.payrollTax || 0);
    }
    const productCount = this.props.products.length;
    let usedProductIndices = {};
    let amountRemaining = taxPaid;

    let displayedProducts = [];
    let output = [];
    if (!taxIsNan) {
      while (_.size(usedProductIndices) < productCount && amountRemaining > 1) {
        const i = Math.floor(Math.random() * (productCount - 0) + 0);
        if (!usedProductIndices[i]) {
          usedProductIndices[i] = true;
          if (this.props.products[i].price < amountRemaining) {
            amountRemaining -= this.props.products[i].price;
            displayedProducts.push(this.props.products[i]);
          }
        }
      }
      displayedProducts = _.sortBy(displayedProducts, (product) => {return product.price * -1});
      output = _.map(displayedProducts, (product, j) => {
        return (
          <div key={`product-${j}`} className='c-alternative-products__product'>
            <div className='c-alternative-products__product-price' children={`$${product.price.toFixed(2).replace('.00', '')}`} />
            <a className='c-alternative-products__product-name' target={'_blank'} href={product.url} children={product.name} />
          </div>
        );
      });
    }
    else {
      output.push(
        <div className='c-alternative-products__placeholder' key='placeholder' children='Enter your info in the tax fields up top.' />
      );
    }

    return (
      <div className='c-alternative-products'>
        <h3 className='c-alternative-products__heading' children='Your federal tax bill would buy you this Amazon shopping spree:' />
        <div children={output} />
      </div>
    );
  }

}

export default AlternativeProducts;
