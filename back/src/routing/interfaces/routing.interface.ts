export interface Routing {
  id: string;
  fastestOperator: number;
  cheapestOperator: number;
  solutions: Solution[];
}

export interface Solution {
  deliveryTime: string;
  logisticOperator: number;
  price: number;
}
