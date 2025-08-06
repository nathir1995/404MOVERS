// import React from "react";

// import { MuiStepSliderControlType } from "@/components/MultiStepSliderComponent/types";
// import { useFormikContext } from "formik";
// import GoogleMapReact from "google-map-react";
// import {
//   EndDotImg,
//   StartDotImg,
//   defaultCetner,
//   defaultZoom,
//   height,
// } from "../utils/mapProps";
// import { ValuesType } from "./formUtils";

// import CurrentLocationButton from "../components/CurrentLocationButton";
// import PlacesAutocomplete from "../components/PlacesAutocomplete";

// const PickupLocationForm = ({
//   controls,
// }: {
//   controls: MuiStepSliderControlType;
// }) => {
//   const [map, setMap] = React.useState<any>(null);
//   const [currentLocationRequestStatus, setCurrentLocationRequestStatus] =
//     React.useState<"idle" | "success" | "error">("idle");

//   const formik = useFormikContext<ValuesType>();

//   const panToCurrentPosition = () => {
//     if (!navigator.geolocation) return;
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const lat = position.coords.latitude;
//         const lng = position.coords.longitude;
//         map?.panTo?.({ lat, lng });
//         setCurrentLocationRequestStatus("success");
//       },
//       () => {
//         setCurrentLocationRequestStatus("error");
//       }
//     );
//   };

//   const { end_lat, end_lang } = formik.values;
//   const renderEndMarker = React.useCallback(
//     (map: any, maps: any) => {
//       if (end_lang === "" || end_lat === "") return [];
//       return [
//         new maps.Marker({
//           position: { lat: end_lat, lng: end_lang },
//           map,
//           icon: { url: EndDotImg },
//         }),
//       ];
//     },
//     [end_lat, end_lang]
//   );

//   const onAutoCompleteChange = ({ lat, lng }: { lat: number; lng: number }) => {
//     map?.panTo?.({ lat, lng });
//   };

//   return (
//     <>
//       <div style={{ height: height, width: "100%", position: "relative" }}>
//         <GoogleMapReact
//           resetBoundsOnResize={true}
//           options={{
//             clickableIcons: true,
//             fullscreenControl: false,
//             gestureHandling: "greedy",
//           }}
//           bootstrapURLKeys={{
//             key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
//             libraries: ["places"],
//           }}
//           defaultCenter={
//             formik.values.start_lat !== "" && formik.values.start_lang
//               ? {
//                   lat: formik.values.start_lat,
//                   lng: formik.values.start_lang,
//                 }
//               : defaultCetner
//           }
//           onChange={(map) => {
//             formik.setFieldValue("start_lat", map.center.lat);
//             formik.setFieldValue("start_lang", map.center.lng);
//           }}
//           // onDragEnd={(map) => {
//           //   formik.setFieldValue("start_lat", map.center.lat());
//           //   formik.setFieldValue("start_lang", map.center.lng());
//           // }}
//           onGoogleApiLoaded={({ map: _map, maps }) => {
//             setMap(_map);
//             return renderEndMarker(_map, maps);
//           }}
//           defaultZoom={defaultZoom}
//           yesIWantToUseGoogleMapApiInternals
//         ></GoogleMapReact>
//         <img
//           src={StartDotImg}
//           alt="Start"
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-37.5%, -90%)",
//             pointerEvents: "none",
//           }}
//         />
//         <CurrentLocationButton
//           status={currentLocationRequestStatus}
//           onClick={panToCurrentPosition}
//         />
//         {map !== null && (
//           <PlacesAutocomplete type="start" onSelect={onAutoCompleteChange} />
//         )}
//       </div>
//     </>
//   );
// };

// export default PickupLocationForm;
