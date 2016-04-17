/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { Component } from 'react';
import LineItemGroup from '../components/LineItemGroup';
import spendingData from '../data/spending';

export default class extends Component {

  state = {};

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
        <h1>Tax Receipt</h1>
        <div>
          Data from <a href="http://www.usgovernmentspending.com/federal_budget_detail_2015bs22015n_303380817060653231405089_252_051_054_376">usgovernmentspending.com</a>
        </div>
        <div>
          Code at <a href="https://github.com/kareems/tax-receipt">github.com/kareems/tax-receipt</a>
        </div>
        <div>
          <div children={'How much did you pay in income tax for 2015?'} />
          <input type={'text'}
            pattern={'[0-9]*'}
            name={'income_tax'}
            onChange={::this.handleChangeIncomeTax}
          />
        </div>
        <div>
          <div children={'And how much in payroll tax? (Social Security and Medicare tax)'} />
          <input type={'text'}
            pattern={'[0-9]*'}
            name={'payroll_tax'}
            onChange={::this.handleChangePayrollTax}
          />
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
      </div>
    );
  }

}
