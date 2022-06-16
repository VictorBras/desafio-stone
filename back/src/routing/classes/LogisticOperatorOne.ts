import * as moment from 'moment';

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
        return moment().add(1, 'day').toISOString();

      case 'Medium':
        return moment().add(3, 'days').toISOString();

      case 'Long':
        return moment().add(4, 'days').toISOString();
    }
  }
}
