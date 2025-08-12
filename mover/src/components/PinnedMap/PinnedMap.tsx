import React from "react";
import Image from "next/image";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";

import styles from "./PinnedMap.module.scss";
import colors from "@/assets/scss/colors.module.scss";
import { safeMap, hasItems } from "@/utility/arraySafety";

const comingSoonDot = "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
const currentDot = "https://maps.google.com/mapfiles/ms/icons/green-dot.png";

const locations = [
  { lat: 53.54, lng: -113.49, title: "Edmonton", isCurrent: false },
  { lat: 52.26, lng: -113.81, title: "Red Deer", isCurrent: false },
  { lat: 51.04, lng: -114.07, title: "Calgary", isCurrent: true },
  { lat: 49.69, lng: -112.83, title: "Lethbridge", isCurrent: false },
  { lat: 50.04, lng: -110.67, title: "Medicine Hat", isCurrent: false },
  { lat: 49.88, lng: -119.49, title: "Kelowna", isCurrent: false },
  { lat: 48.42, lng: -123.36, title: "Victoria", isCurrent: false },
  { lat: 49.26, lng: -123.11, title: "Vancouver", isCurrent: false },
];

const PinnedMap = () => {
  return (
    <div>
      <h4 style={{ textAlign: "center" }}>
        Operating now in <span style={{ color: colors.primary }}>Calgary</span>,
        more cities coming soon
      </h4>

      <div className={styles.header}>
        <div>
          <Image width={24} height={24} src={currentDot} alt="Current" />
          <p>Current</p>
        </div>
        <div>
          <Image width={24} height={24} src={comingSoonDot} alt="Coming soon" />
          <p>Coming soon</p>
        </div>
      </div>

      <div style={{ height: "500px", width: "100%" }}>
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ''}>
          <Map
            defaultCenter={{ lat: 51.29, lng: -116.96 }}
            defaultZoom={5.5}
            style={{ width: "100%", height: "100%" }}
            gestureHandling="greedy"
          >
            {safeMap(locations, (location, index) => (
              <AdvancedMarker
                key={index}
                position={{ lat: location.lat, lng: location.lng }}
                title={location.title}
              >
                <img
                  src={location.isCurrent ? currentDot : comingSoonDot}
                  alt={location.title}
                  style={{ width: 32, height: 32 }}
                />
              </AdvancedMarker>
            ))}
          </Map>
        </APIProvider>
      </div>
    </div>
  );
};

export default PinnedMap;
