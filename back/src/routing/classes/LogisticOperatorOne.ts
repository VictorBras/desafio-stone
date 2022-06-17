import * as momentBusiness from 'moment-business-days';

import { LogisticOperator, PriceRange } from './LogisticOperator';

export class LogisticOperatorOne extends LogisticOperator {
  protected id = 1;
  protected weightDivider = 6000;

  protected getMultiplier(priceRange: PriceRange): number {
    switch (priceRange) {
      case 'Short':
        return 1.2;

      case 'Medium':
        return 2.4;

      case 'Long':
        return 5;
    }
  }

  protected getDeliveryTime(priceRange: PriceRange): string {
    switch (priceRange) {
      case 'Short':
        return momentBusiness().businessAdd(1, 'day').toISOString();

      case 'Medium':
        return momentBusiness().businessAdd(3, 'days').toISOString();

      case 'Long':
        return momentBusiness().businessAdd(4, 'days').toISOString();
    }
  }
}
