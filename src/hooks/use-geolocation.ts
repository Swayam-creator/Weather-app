import { Coordinates } from "@/api/types";
import { useEffect, useState } from "react";

interface GeolocationState {
    coordinates: Coordinates | null;
    error: string | null;
    isloading: boolean;
}

export function useGeolocation() {
    const [locationData, setLocationData] = useState<GeolocationState>({
        coordinates: null,
        error: null,
        isloading: true,
    });

    const getLocation = () => {
        setLocationData((prev) => ({ ...prev, error: null, isloading: true }));

        if (!navigator.geolocation) {
            setLocationData({
                coordinates: null,
                error: "Geolocation is not supported by your browser",
                isloading: false,
            });
            return; // Added return to prevent further execution
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocationData({
                    coordinates: {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    },
                    error: null,
                    isloading: false,
                });
            },
            (error) => {
                let errorMessage: string;
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = "Location permission denied. Please enable location access.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "Location information is unavailable.";
                        break;
                    case error.TIMEOUT:
                        errorMessage = "Location request timed out.";
                        break;
                    default:
                        errorMessage = "An unknown error occurred.";
                }
                setLocationData({
                    coordinates: null,
                    error: errorMessage,
                    isloading: false,
                });
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            }
        );
    };

    useEffect(() => {
        getLocation();
    }, []);

    return {
        ...locationData,
        getLocation,
    };
}
