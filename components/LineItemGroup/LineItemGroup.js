import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import './LineItemGroup.scss';

class LineItemGroup extends Component {

  static propTypes = {
    groupSpendingData: PropTypes.array,
    totalSpending: PropTypes.number,
  };

  static defaultProps = {
    incomeTax: 0,
    payrollTax: 0,
    totalSpending: 0,
  };

  render() {
    const taxIsNan = isNaN(this.props.incomeTax) && isNaN(this.props.payrollTax);
    let taxPaid = 0;
    if (!taxIsNan) {
      taxPaid = (this.props.incomeTax || 0) + (this.props.payrollTax || 0);
    }

    return (
      <div>
        <h3 children={this.props.groupSpendingData.name} />
        <div>
          {
            _.map(this.props.groupSpendingData.activities, (lineItem, i) => {
              // Get the percentage of overall spending that this lineItem represents, and
              // then convert that into a fraction of the user's tax bill.
              let displayedAmount = '–';
              if (!taxIsNan) {
                const amountPaid = (lineItem.spending / this.props.totalSpending) * taxPaid;
                if (amountPaid < 10) {
                  displayedAmount = `$${amountPaid.toFixed(2)}`;
                }
                else {
                  displayedAmount = `$${Math.round(amountPaid)}`;
                }
              }

              return (
                <div key={`line-item-${i}`}>
                  <div children={lineItem.name} />
                  <div children={displayedAmount} />
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }

}

export default LineItemGroup;
