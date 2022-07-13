import { FeatureCollection, Geometry } from "geojson";
import axios, { AxiosResponse } from "axios";

export type TNominatimFeatureProperties = {
  place_id: number;
  osm_id: number;
  osm_type: string;
  place_rank: number;
  category: string;
  type: string;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: {
    house_number: string;
    road: string;
    suburb: string;
    city: string;
    municipality: string;
    country: string;
    state: string;
    postcode: string;
    county: string;
    country_code: string;
  };
};

export const getNominatimUrl = (lat: string | number, lng: string | number) =>
  `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=geojson`;

export default class Nominatim {
  public static async getCoordinatesInfo(
    lat: string | number,
    lng: string | number
  ): Promise<FeatureCollection<Geometry, TNominatimFeatureProperties>> {
    return axios
      .get(getNominatimUrl(lat, lng))
      .then(
        (
          res: AxiosResponse<
            FeatureCollection<Geometry, TNominatimFeatureProperties>
          >
        ) => res.data
      );
  }
}
