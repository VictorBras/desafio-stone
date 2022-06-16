import * as moment from 'moment';

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
        return moment().add(1, 'day').toISOString();

      case 'Medium':
        return moment().add(2, 'days').toISOString();

      case 'Long':
        return moment().add(5, 'days').toISOString();
    }
  }
}
