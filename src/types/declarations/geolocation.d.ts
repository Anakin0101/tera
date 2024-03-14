declare module '@react-native-community/geolocation' {
  export interface GeolocationPosition {
    coords: {
      latitude: number;
      longitude: number;
      altitude: number | null;
      accuracy: number;
      altitudeAccuracy: number | null;
      heading: number | null;
      speed: number | null;
    };
    timestamp: number;
  }

  interface GeolocationError {
    code: number;
    message: string;
    PERMISSION_DENIED: number;
    POSITION_UNAVAILABLE: number;
    TIMEOUT: number;
  }

  export const enum GeolocationErrorCode {
    PERMISSION_DENIED = 1,
    POSITION_UNAVAILABLE,
    TIMEOUT,
  }

  export function getCurrentPosition(
    success: (position: GeolocationPosition) => void,
    error?: (error: GeolocationError) => void,
    options?: {
      enableHighAccuracy?: boolean;
      timeout?: number;
      maximumAge?: number;
    },
  ): void;
}
