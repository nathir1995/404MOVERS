import React from "react";
import Image from "next/image";
import GoogleMapReact from "google-map-react";

import styles from "./PinnedMap.module.scss";
import colors from "@/assets/scss/colors.module.scss";

const comingSoonDot = "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
const currentDot = "https://maps.google.com/mapfiles/ms/icons/green-dot.png";

const PinnedMap = () => {
  const renderMarkers = React.useCallback((map: any, maps: any) => {
    const edmonton = new maps.Marker({
      position: { lat: 53.54, lng: -113.49 },
      map,
      title: "Edmonton",
      icon: { url: comingSoonDot },
    });
    const redDeer = new maps.Marker({
      position: { lat: 52.26, lng: -113.81 },
      map,
      title: "Red Deer",
      icon: { url: comingSoonDot },
    });
    const calgary = new maps.Marker({
      position: { lat: 51.04, lng: -114.07 },
      map,
      title: "Calgary",
      icon: { url: currentDot },
    });
    const lethbridge = new maps.Marker({
      position: { lat: 49.69, lng: -112.83 },
      map,
      title: "Lethbridge",
      icon: { url: comingSoonDot },
    });
    const medicineHat = new maps.Marker({
      position: { lat: 50.04, lng: -110.67 },
      map,
      title: "Medicine Hat",
      icon: { url: comingSoonDot },
    });
    const kelowna = new maps.Marker({
      position: { lat: 49.88, lng: -119.49 },
      map,
      title: "Kelowna",
      icon: { url: comingSoonDot },
    });
    const victoria = new maps.Marker({
      position: { lat: 48.42, lng: -123.36 },
      map,
      title: "Victoria",
      icon: { url: comingSoonDot },
    });
    const vancouver = new maps.Marker({
      position: { lat: 49.26, lng: -123.11 },
      map,
      title: "Vancouver",
      icon: { url: comingSoonDot },
    });

    return [
      edmonton,
      redDeer,
      calgary,
      lethbridge,
      medicineHat,
      kelowna,
      victoria,
      vancouver,
    ];
  }, []);

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
        <GoogleMapReact
          resetBoundsOnResize={true}
          options={{ clickableIcons: true }}
          bootstrapURLKeys={{
            key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
          }}
          defaultCenter={{
            lat: 51.29,
            lng: -116.96,
          }}
          defaultZoom={5.5}
          onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
        ></GoogleMapReact>
      </div>
    </div>
  );
};

export default PinnedMap;
