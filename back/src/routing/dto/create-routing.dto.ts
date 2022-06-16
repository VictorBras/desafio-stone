export class CreateRoutingDto {
  originCep: string;
  destinationCep: string;
  packageDimensions: PackageDimensions;
}

export interface PackageDimensions {
  height: number;
  width: number;
  length: number;
}
