"use server";

import { API } from "@/lib/fetch";
import { commonErrorHandler } from "@/lib/utils";
import { Address } from "@/types";
import { revalidatePath } from "next/cache";

const getAddressComponent = (type: string, addressComponents: any) => {
  const component = addressComponents.find((comp: any) =>
    comp.types.includes(type),
  );
  return component
    ? {
        state_long_code: component.long_name,
        state_short_code: component.short_name,
      }
    : null;
};
export async function getPlaceSuggestions(query: string) {
  try {
    if (!query || query.length < 3) {
      return { error: false, data: [] };
    }

    const url = new URL(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&types=geocode&components=country:us&key=${process.env.NEXT_PUBLIC_GOOGLEPLACESKEY}`,
    );

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(
        `Google Places API request failed: ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (data.status === "OK") {
      return { error: false, data: data.predictions };
    } else {
      return { error: true, data: data.error_message };
    }
  } catch (error) {
    console.error("Error fetching Google Places suggestions:", error);
    return { error: true, data: error || error };
  }
}

export const getCoordinatesFromPlaceId = async (placeId: string) => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${process.env.NEXT_PUBLIC_GOOGLEPLACESKEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK") {
      const { lat, lng } = data.result.geometry.location;

      const addressComponents = data.result.address_components;

      const state = getAddressComponent(
        "administrative_area_level_1",
        addressComponents,
      );

      return {
        ...state,
        latitude: lat.toString(),
        longitude: lng.toString(),
      };
    } else {
      console.error("Error fetching place details:", data.status);
      return null;
    }
  } catch (error) {
    console.error("Error fetching place details:", error);
    return null;
  }
};

export const getAddressFromCoordinates = async (lat: number, lng: number) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLEPLACESKEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK") {
      const addressComponents = data.results[0].address_components;

      const state = getAddressComponent(
        "administrative_area_level_1",
        addressComponents,
      );
      return {
        ...state,
        latitude: lat.toString(),
        longitude: lng.toString(),
        address: data.results[0].formatted_address,
      };
    } else {
      console.error("Error fetching place details:", data.status);
      return null;
    }
  } catch (error) {
    console.error("Error fetching address:", error);
    return null;
  }
};

export const postLocation = async (address: Address) => {
  try {
    console.log(address);

    const res = await API.Post("locations", {
      ...address,
      latitude: String(address.latitude),
      longitude: String(address.longitude),
    });
    console.log(res, "res");

    if (res?.data) {
      revalidatePath("our-providers");
      return { error: null, data: res?.statusCode };
    }
    throw new Error(res.message);
  } catch (error: any) {
    return commonErrorHandler(error);
  }
};
