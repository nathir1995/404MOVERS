import React from "react";
import { Card } from "reactstrap";
import GoogleMapReact from "google-map-react";
import { EndDotImg, StartDotImg } from "configs/map";

const MapCard = ({ move }) => {
  const { start_lat, start_lang } = move;
  const { end_lat, end_lang } = move;

  const start = React.useMemo(
    () => ({
      lat: parseFloat(start_lat),
      lng: parseFloat(start_lang),
    }),
    [start_lat, start_lang]
  );
  const end = React.useMemo(
    () => ({
      lat: parseFloat(end_lat),
      lng: parseFloat(end_lang),
    }),
    [end_lat, end_lang]
  );

  const renderMarkers = React.useCallback(
    (map, maps) => [
      new maps.Marker({
        position: start,
        map,
        icon: { url: StartDotImg },
      }),
      new maps.Marker({
        position: end,
        map,
        icon: { url: EndDotImg },
      }),
    ],
    [start, end]
  );

  return (
    <Card style={{ height: "calc(100% - 2.2rem)" }}>
      <GoogleMapReact
        resetBoundsOnResize={true}
        options={{
          clickableIcons: true,
          fullscreenControl: false,
          gestureHandling: "greedy",
        }}
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        }}
        defaultCenter={start}
        defaultZoom={14}
        onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
      ></GoogleMapReact>
    </Card>
  );
};

export default MapCard;
