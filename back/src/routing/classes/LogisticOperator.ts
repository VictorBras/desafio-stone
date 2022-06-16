import { PackageDimensions } from '../dto/create-routing.dto';
import { Solution } from '../interfaces/routing.interface';

export type PriceRange = 'Short' | 'Medium' | 'Long';

export abstract class LogisticOperator {
  protected abstract id: number;
  protected abstract weightDivider: number;

  getSolution(
    distance: number,
    packageDimensions: PackageDimensions,
  ): Solution {
    const costVolume = this.calculateCostPerCubicWeight(packageDimensions);
    const priceRange = this.getPriceRange(distance);
    const price = costVolume * this.getMultiplier(priceRange);
    const deliveryTime = this.getDeliveryTime(priceRange);

    return {
      deliveryTime,
      price,
      logisticOperator: this.id,
    };
  }

  private calculateCostPerCubicWeight(
    packageDimensions: PackageDimensions,
  ): number {
    const { height, length, width } = packageDimensions;

    const volume = (height * length * width) / this.weightDivider;

    return volume > 6 ? volume : 6;
  }

  private getPriceRange(distance: number): PriceRange {
    if (distance <= 100) {
      return 'Short';
    } else if (distance > 100 && distance <= 500) {
      return 'Medium';
    } else {
      return 'Long';
    }
  }

  protected abstract getMultiplier(priceRange: PriceRange): number;
  protected abstract getDeliveryTime(priceRange: PriceRange): string;
}
