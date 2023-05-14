import React, { useEffect, useRef, useState } from "react";
import {
    GoogleMap,
    LoadScript,
    Autocomplete,
    DirectionsRenderer,
    Marker,
} from "@react-google-maps/api";

import Styles from "../styles/Map.module.css";

/* global google */

const containerStyle = {
    width: "100%",
    height: "500px",
};

const center = {
    lat: 28.7,
    lng: 77.1,
};

function Map() {
    const originRef = useRef();
    const destinationRef = useRef();
    const stopRef = useRef();

    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [distance, setDistance] = useState("");
    const [showDistance, setShowDistance] = useState(false);

    const [stops, setStops] = useState([]);

    // const [duration, setDuration] = useState("");

    const calculateRoute = async () => {
        if (originRef.current.value === "" || destinationRef.current.value === "") {
            return;
        }
        const directionsService = new google.maps.DirectionsService();
        const results = await directionsService.route({
            origin: originRef.current.value,
            destination: destinationRef.current.value,
            waypoints: stops,
            travelMode: google.maps.TravelMode.DRIVING,
        });
        setDirectionsResponse(results);
        setDistance(results.routes[0].legs[0].distance.text);
        setShowDistance(true);
        // setDuration(results.routes[0].legs[0].duration.text);
    };

    const addStop = () => {
        setStops((prevStops) => [
            ...prevStops,
            { location: stopRef.current.value, stopover: true },
        ]);
    };

    useEffect(() => {
        console.log(stops);
    }, [stops]);

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyAYBivEevsC3sXYWfY6n9803tvASqB0TUI"
            libraries={["places"]}
        >
            <div className={Styles.mainFlex}>
                <div>
                    <div className={Styles.buttonFlex}>
                        <div className={Styles.inputsBlock}>
                            <div className={Styles.inputBlock}>
                                <div className={Styles.smallTitle}>Origin</div>
                                <Autocomplete>
                                    <input
                                        type="text"
                                        placeholder="Origin"
                                        ref={originRef}
                                        className={Styles.locationInput}
                                    />
                                </Autocomplete>
                            </div>
                            <div className={Styles.inputBlock}>
                                <div className={Styles.smallTitle}>Stop</div>
                                <Autocomplete>
                                    <>
                                        {stops.map((stop, index) => {
                                            console.log(stop);
                                            return (
                                                <li className={Styles.stopLocation} key={index}>
                                                    {stop.location}
                                                </li>
                                            );
                                        })}
                                        <input
                                            type="text"
                                            placeholder="Enter a Stop"
                                            ref={stopRef}
                                            className={Styles.locationInput}
                                        />
                                    </>
                                </Autocomplete>
                                <button onClick={addStop} className={Styles.stopButton}>
                                    + Add another stop
                                </button>
                            </div>
                            <div className={Styles.inputBlock}>
                                <div className={Styles.smallTitle}>Destination</div>
                                <Autocomplete>
                                    <input
                                        type="text"
                                        placeholder="Destinaton"
                                        ref={destinationRef}
                                        className={Styles.locationInput}
                                    />
                                </Autocomplete>
                            </div>
                        </div>
                        <div>
                            <button onClick={calculateRoute} className={Styles.calculateButton}>
                                Calculate
                            </button>
                        </div>
                    </div>

                    {showDistance && (
                        <div className={Styles.outputBlock}>
                            <div className={Styles.distanceBlock1}>
                                <div className={Styles.distanceTitle}>Distance</div>
                                <div className={Styles.distance}>{distance}</div>
                            </div>
                            <div className={Styles.distanceBlock2}>
                                The distance between <b>{originRef.current.value}</b> and{" "}
                                <b>{destinationRef.current.value}</b> via the seleted route is{" "}
                                <b>{distance}</b>.
                            </div>
                        </div>
                    )}
                </div>
                <div className={Styles.map}>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={5}
                        options={{
                            zoomControl: false,
                            streetViewControl: false,
                            mapTypeControl: false,
                            fullscreenControl: false,
                        }}
                    >
                        {/* Child components, such as markers, info windows, etc. */}
                        <></>
                        <Marker position={center} />
                        {directionsResponse && (
                            <DirectionsRenderer directions={directionsResponse} />
                        )}
                    </GoogleMap>
                </div>
            </div>
        </LoadScript>
    );
}

export default React.memo(Map);
