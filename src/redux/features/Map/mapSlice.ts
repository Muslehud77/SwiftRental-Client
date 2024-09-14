import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface TLocation {
  lat: number;
  lng: number;
}

type TDestinationInfo = {
  origin: string;
  destination: string;
  distance: string;
  duration: string;
  directionResponse: google.maps.DirectionsResult | null;
};

type TState = {
  from: TLocation;
  to: TLocation | null;
  mapLoaded: boolean;
  destinationInfo: TDestinationInfo;
};

const initialState: TState = {
  from: { lat: -3.745, lng: -38.523 },
  to: null,
  mapLoaded: false,
  destinationInfo: {
    origin: "",
    destination: "",
    distance: "",
    duration: "",
    directionResponse: null,
  },
};

export const mapSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setMapLoaded: (state, action: PayloadAction<Pick<TState, "mapLoaded">>) => {
      state.mapLoaded = action.payload.mapLoaded;
    },

    setDestination: (
      state,
      action: PayloadAction<Partial<TDestinationInfo>>
    ) => {
      const data = action.payload;
      if (data.origin) {
        state.destinationInfo.origin = data.origin;
      }
      if (data.destination) {
        state.destinationInfo.destination = data.destination;
      }
      if (data.distance) {
        state.destinationInfo.distance = data.distance;
      }
      if (data.duration) {
        state.destinationInfo.duration = data.duration;
      }
      if (data.directionResponse) {
        state.destinationInfo.directionResponse = data.directionResponse;
      }

    },

    setFrom: (state, action: PayloadAction<Pick<TState, "from">>) => {
      state.from = action.payload.from;
    },
    setTo: (state, action: PayloadAction<Pick<TState, "to">>) => {
      state.to = action.payload.to;
    },
    clearLocation: (state) => {
      state.from = { lat: -3.745, lng: -38.523 };
      state.to = null;
    },
  },
});

export const { setFrom, setTo, clearLocation, setMapLoaded, setDestination } =
  mapSlice.actions;

export default mapSlice.reducer;

export const selectLocation = (state: RootState) => state.location;
