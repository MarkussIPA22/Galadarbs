import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const containerStyle = {
    width: "100%",
    height: "500px",
};

export default function GymFinder() {
    const [userPosition, setUserPosition] = useState(null);
    const [gyms, setGyms] = useState([]);
    const [apiKey, setApiKey] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchApiKey = async () => {
            try {
                const res = await fetch("/api/google/maps-key");
                const data = await res.json();
                setApiKey(data.key);
            } catch (err) {
                console.error(t("Failed to fetch Google API key:"), err);
            }
        };
        fetchApiKey();
    }, []);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: apiKey || "",
        libraries: ["places"],
    });

    const findGyms = () => {
        if (!navigator.geolocation) {
            alert(t("Your browser does not support location."));
            return;
        }

        navigator.geolocation.getCurrentPosition((pos) => {
            const userLoc = {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
            };
            setUserPosition(userLoc);

            const map = new window.google.maps.Map(
                document.createElement("div"),
                { center: userLoc, zoom: 15 }
            );

            const service = new window.google.maps.places.PlacesService(map);
            service.nearbySearch(
                { location: userLoc, radius: 10000, type: ["gym"] },
                (results, status) => {
                    if (
                        status ===
                        window.google.maps.places.PlacesServiceStatus.OK
                    ) {
                        setGyms(results);
                    }
                }
            );
        });
    };

    if (!isLoaded) return <p>{t("Loading")}</p>;

    return (
        <div>
            <button
                onClick={findGyms}
                className="px-4 py-2 bg-blue-600 text-white rounded"
            >
                ({t("Find Nearby Gyms")}
            </button>

            <GoogleMap
                mapContainerStyle={containerStyle}
                center={userPosition || { lat: 0, lng: 0 }}
                zoom={userPosition ? 14 : 2}
            >
                {userPosition && <Marker position={userPosition} label="You" />}
                {gyms.map((gym, idx) => (
                    <Marker
                        key={idx}
                        position={gym.geometry.location}
                        title={gym.name}
                    />
                ))}
            </GoogleMap>
        </div>
    );
}
