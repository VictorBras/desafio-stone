import { Client, LatLngLiteral } from '@googlemaps/google-maps-services-js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DistancesService {
  googleMapsAPI = process.env.GOOGLE_MAPS_TOKEN;

  async calculateDistance(
    deliveryAddress: string,
    collectionAddress: string,
  ): Promise<number> {
    const [deliveryCoord, collectionCoord] = await Promise.all([
      this.getAddressCoordinate(deliveryAddress),
      this.getAddressCoordinate(collectionAddress),
    ]);

    return this.getDistanceBetweenCoords(collectionCoord, deliveryCoord);
  }

  private async getAddressCoordinate(address: string): Promise<LatLngLiteral> {
    const client = new Client({});

    const { data } = await client.geocode({
      params: {
        key: this.googleMapsAPI,
        address,
      },
    });

    return data.results[0].geometry.location;
  }

  /**
   * Spherical law of cosines
   */
  getDistanceBetweenCoords(
    origin: LatLngLiteral,
    destination: LatLngLiteral,
  ): number {
    const earthRadius = 6371e6;

    const φ1 = degToRad(origin.lat);
    const φ2 = degToRad(destination.lat);
    const Δλ = degToRad(destination.lng - origin.lat);

    return (
      Math.acos(
        Math.sin(φ1) * Math.sin(φ2) +
          Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δλ),
      ) * earthRadius
    );

    function degToRad(deg: number) {
      return deg * (Math.PI / 180);
    }
  }
}
