import _ from 'lodash';

import React, { Component } from 'react';

import AlternativeProducts from '../components/AlternativeProducts';
import LineItemGroup from '../components/LineItemGroup';

import productData from '../data/products';
import spendingData from '../data/spending';

import './index.scss';


export default class extends Component {

  state = {};

  componentWillMount() {
    this.products = _.flatMap(productData, (group) => {
      return group.items;
    });
  }

  handleChangeIncomeTax(evt) {
    this.setState({incomeTax: evt.target.value});
  }

  handleChangePayrollTax(evt) {
    this.setState({payrollTax: evt.target.value});
  }

  render() {
    const itemizedSpending = _.reduce(spendingData.activities, (total, group) => {
      return total + _.reduce(group.activities, (groupTotal, activity) => {
        return groupTotal + activity.spending;
      }, 0);
    }, 0);
    const unitemizedSpending = spendingData.total_spending - itemizedSpending;

    let incomeTax = parseFloat(this.state.incomeTax);
    let payrollTax = parseFloat(this.state.payrollTax);

    return (
      <div>
        <h1 className='main-title'>Uncle Sam to Uncle Bezos converter</h1>
        <div className='subtitle'>
          <p>
            See what the feds spent your 2015 tax bill on.
          </p>
          <p>
            <strong>Then scroll all the way down</strong> and see a random list of things you could have bought from Amazon with that money.
          </p>
        </div>

        <div className='input-section'>
          <div className='input-section__wrap'>
            <div className='input-section__input-wrap'>
              <input className='input-section__input'
                type='text'
                pattern='[0-9]*'
                name='income_tax'
                id='income_tax_input'
                onChange={::this.handleChangeIncomeTax}
              />
            </div>
            <label className='input-section__label' children='How much income tax did you pay in 2015?' htmlFor='income_tax_input' />
          </div>
          <div className='input-section__wrap'>
            <div className='input-section__input-wrap'>
              <input className='input-section__input'
                type='text'
                pattern='[0-9]*'
                name='payroll_tax'
                id='payroll_tax_input'
                onChange={::this.handleChangePayrollTax}
              />
            </div>
            <label className='input-section__label' children='And payroll tax? (Social Security + Medicare)' htmlFor='payroll_tax_input' />
          </div>
        </div>
        <div>
          {
            _.map(spendingData.activities, (group, i) => {
              return (
                <LineItemGroup key={`group-${i}`}
                  groupSpendingData={group}
                  incomeTax={incomeTax}
                  payrollTax={payrollTax}
                  totalSpending={spendingData.total_spending}
                />
              );
            })
          }
          <LineItemGroup incomeTax={incomeTax}
            payrollTax={payrollTax}
            totalSpending={spendingData.total_spending}
            groupSpendingData={{
              name: 'Not listed above',
              activities: [
                {name: 'All other federal expenditures',  spending: unitemizedSpending},
                {name: 'New debt taken on to cover this year’s gap between spending and revenue', spending: spendingData.deficit_spending},
              ],
            }}
          />
        </div>
        <AlternativeProducts incomeTax={incomeTax} payrollTax={payrollTax} products={this.products} />

        <div className='fine-print'>
          Data from <a href="http://www.usgovernmentspending.com/federal_budget_detail_2015bs22015n_303380817060653231405089_252_051_054_376">usgovernmentspending.com</a>
        </div>
      </div>
    );
  }

}
