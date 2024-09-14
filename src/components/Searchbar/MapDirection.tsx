import { useEffect, useState } from "react";
import {
  GoogleMap,
  
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useAppSelector } from "../../redux/hooks";
import { selectLocation } from "../../redux/features/Map/mapSlice";
import SearchBar from "./SearchBar";

const containerStyle = {
  width: "100%",
  height: "100%",
};

type TMapDirectionProps = {
  className: string;
};

const MapDirection = ({ className }: TMapDirectionProps) => {
  const { from, to, mapLoaded, destinationInfo } =
    useAppSelector(selectLocation);

  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    map?.panTo(from);
  }, [from]);



  return (
    <div className=" w-full h-[110vh]">
      <div className="flex gap-5  w-full h-full">
        <SearchBar />
        <div className="w-96 h-full rounded-xl overflow-hidden">
          {mapLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={from}
              zoom={15}
              onLoad={(map) => setMap(map)}
              onUnmount={() => setMap(null)}
              options={{
                streetViewControl: false,
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
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapDirection;
