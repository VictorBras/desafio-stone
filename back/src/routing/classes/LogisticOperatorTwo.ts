import * as momentBusiness from 'moment-business-days';

import { LogisticOperator, PriceRange } from './LogisticOperator';

export class LogisticOperatorTwo extends LogisticOperator {
  protected id = 2;
  protected weightDivider = 5000;

  protected getMultiplier(priceRange: PriceRange): number {
    switch (priceRange) {
      case 'Short':
        return 1;

      case 'Medium':
        return 1.8;

      case 'Long':
        return 4;
    }
  }

  protected getDeliveryTime(priceRange: PriceRange): string {
    switch (priceRange) {
      case 'Short':
        return momentBusiness().businessAdd(1, 'day').toISOString();

      case 'Medium':
        return momentBusiness().businessAdd(2, 'days').toISOString();

      case 'Long':
        return momentBusiness().businessAdd(5, 'days').toISOString();
    }
  }
}
