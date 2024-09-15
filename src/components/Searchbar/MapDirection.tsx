import { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  Autocomplete,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectLocation,
  setDestination,
  setFrom,
} from "../../redux/features/Map/mapSlice";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MapPin } from "lucide-react";
import { Label } from "../ui/label";
import { getLocationName } from "../../utils/locationName";
import { motion } from "framer-motion";
import { useTheme } from "../ThemeProvider";


type TMapDirectionProps = {
  className: string;
};

const MapDirection = ({ className }: TMapDirectionProps) => {
 const {actualTheme} = useTheme()
  const dispatch = useAppDispatch();
  const { from, to, mapLoaded, destinationInfo } =
    useAppSelector(selectLocation);

  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    map?.panTo(from);
  }, [from]);

  const [currentOrigin,setCurrentOrigin] = useState("")
  const [currentDestination,setCurrentDestination] = useState("")

  const onPlaceChanged = async () => {
    
    dispatch(
      setDestination({
        origin: currentOrigin || "",
        destination: currentDestination || "",
      })
    );

    const directionService = new google.maps.DirectionsService();
    if (currentOrigin && currentDestination) {
    
      const results = await directionService.route({
        origin: currentOrigin,
        destination: currentDestination,
        travelMode: google.maps.TravelMode.DRIVING,
      });

      console.log({results})

      const distance = results.routes[0].legs[0].distance?.text;
      const duration = results.routes[0].legs[0].duration?.text;

      if (results.routes.length) {
        dispatch(
          setDestination({
            origin: currentOrigin || "",
            destination: currentDestination || "",
            directionResponse: results,
            distance,
            duration,
          })
        );
      }
    }
  };
  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(setFrom({ from: { lat: latitude, lng: longitude } }));
          const locationName = (await getLocationName(
            from
          )) as unknown as string;
          dispatch(setDestination({ origin: locationName }));
          setCurrentOrigin(locationName);
          await onPlaceChanged();
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };



  return (
    <div className={className}>
      <div className="flex gap-5  w-full h-full">
        <motion.div
          layout
          className="w-full h-full rounded-xl overflow-hidden bg-white"
        >
          {mapLoaded ? (
            <>
              <div className="space-y-4 p-4 pb-5 bg-background">
                <div>
                  <Label htmlFor="origin">Origin</Label>
                  <div className="flex">
                    <Autocomplete
                      className="w-full"
                      onPlaceChanged={onPlaceChanged}
                    >
                      <Input
                        onBlur={(e) => setCurrentOrigin(e.target.value)}
                        defaultValue={destinationInfo.origin}
                        placeholder="Enter your origin"
                      />
                    </Autocomplete>
                    <Button
                      type="button"
                      variant="outline"
                      className="ml-2"
                      onClick={handleCurrentLocation}
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="destination">Destination</Label>
                  <Autocomplete
                    className="w-full"
                    onPlaceChanged={onPlaceChanged}
                  >
                    <Input
                      onBlur={(e) => setCurrentDestination(e.target.value)}
                      defaultValue={destinationInfo.destination}
                      id="destination"
                      placeholder="Enter your destination"
                    />
                  </Autocomplete>
                </div>
              </div>
              <GoogleMap
                mapContainerStyle={{
                  width: "100%",
                  height: "100%",
                  mixBlendMode: actualTheme === "dark" ? "difference" : "normal",
                }}
                center={from}
                zoom={15}
                onLoad={(map) => setMap(map)}
                onUnmount={() => setMap(null)}
                options={{
                  mapTypeControl: false,
                }}
              >
                <Marker position={from} title="Pickup" />
                {destinationInfo.directionResponse && (
                  <DirectionsRenderer
                    directions={destinationInfo.directionResponse}
                  />
                )}
              </GoogleMap>
            </>
          ) : (
            <></>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MapDirection;


export const nightModeMapStyles = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];