import { useQuery } from "@tanstack/react-query";
import Geocode from "react-geocode";

Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!);
Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");
// Geocode.enableDebug();

export const useLatLngToAddress = (
  lat: number | string,
  lng: number | string
) => {
  return useQuery<string>({
    queryKey: [lat, lng],
    queryFn: async () => {
      const response = await Geocode.fromLatLng(lat.toString(), lng.toString());
      return response.results[0].formatted_address;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: lat !== "" && lng !== "",
  });
};
