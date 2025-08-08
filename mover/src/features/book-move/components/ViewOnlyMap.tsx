import React, { useEffect, useState } from "react";

import {
  APIProvider,
  Map,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";

import { useFormikContext } from "formik";
import { ValuesType } from "../forms/formUtils";
import { defaultCetner, defaultZoom, height } from "../utils/mapProps";

const ViewOnlyMap = () => {
  const [key, setKey] = React.useState<string>("");

  return (
    <Map
      key={key}
      style={{ width: "100%", height: height }}
      defaultCenter={defaultCetner}
      defaultZoom={defaultZoom}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
      zoomControl
    >
      <Directions setKey={setKey} />
    </Map>
  );
};

export default ViewOnlyMap;

function Directions({ setKey }: { setKey: (key: string) => void }) {
  const { values } = useFormikContext<ValuesType>();
  const { start_point_name, end_point_name } = values;

  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);

  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  // Use directions service
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;
    if (!start_point_name || !end_point_name) return;

    directionsService
      .route({
        origin: start_point_name,
        destination: end_point_name,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
        setKey(
          `${response.routes?.[0].legs?.[0]?.start_address} ${response.routes?.[0].legs?.[0]?.end_address}`
        );
      })
      .catch((error) => {
        console.error("Directions request failed:", error);
      });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer, start_point_name, end_point_name]);

  return <React.Fragment />;
}
