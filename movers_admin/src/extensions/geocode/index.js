import Geocode from "react-geocode";

import { GOOGLE_MAP_API_KEY } from "configs/global";

Geocode.setApiKey(GOOGLE_MAP_API_KEY);
Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");
// Geocode.enableDebug();

export const getAddressFromLatLng = (lat, lng) =>
  Geocode.fromLatLng(lat, lng).then(
    (response) => {
      const address = response.results[0].formatted_address;
      return address;
    },
    (error) => {
      console.error(error);
    }
  );
