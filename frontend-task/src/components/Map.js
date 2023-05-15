import React, { useEffect, useRef, useState } from "react";
import {
    GoogleMap,
    LoadScript,
    Autocomplete,
    DirectionsRenderer,
    Marker,
} from "@react-google-maps/api";

import Styles from "../styles/Map.module.css";
import originImg from "../images/origin.png";
import stopImg from "../images/stop.png";
import destinationImg from "../images/destination.png";
import addStopImg from "../images/addstop.png";

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
        let sumDistances = 0;

        for (let leg in results.routes[0].legs) {
            sumDistances += parseFloat(
                results.routes[0].legs[leg].distance.text.split(" ")[0].replaceAll(",", "")
            );
        }
        setDistance(sumDistances);
        setShowDistance(true);
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
                <div className={Styles.leftSide}>
                    <div className={Styles.buttonFlex}>
                        <div className={Styles.inputsBlock}>
                            <div className={Styles.inputBlock}>
                                <div className={Styles.smallTitle}>Origin</div>
                                <Autocomplete>
                                    <div className={Styles.locationInputDiv}>
                                        <img src={originImg} alt="" />
                                        <input
                                            type="text"
                                            placeholder="Origin"
                                            ref={originRef}
                                            className={Styles.locationInput}
                                        />
                                    </div>
                                </Autocomplete>
                            </div>
                            <div className={Styles.inputBlock}>
                                <div className={Styles.smallTitle}>Stop</div>
                                <>
                                    {stops.map((stop, index) => {
                                        console.log(stop);
                                        return (
                                            <li className={Styles.stopLocation} key={index}>
                                                {stop.location}
                                            </li>
                                        );
                                    })}
                                    <Autocomplete>
                                        <div className={Styles.locationInputDiv}>
                                            <img src={stopImg} alt="" />
                                            <input
                                                type="text"
                                                placeholder="Enter a Stop"
                                                ref={stopRef}
                                                className={Styles.locationInput}
                                            />
                                        </div>
                                    </Autocomplete>
                                </>
                                <button onClick={addStop} className={Styles.stopButton}>
                                    <img src={addStopImg} alt="" />
                                    <div>Add another stop</div>
                                </button>
                            </div>
                            <div className={Styles.inputBlock}>
                                <div className={Styles.smallTitle}>Destination</div>
                                <Autocomplete>
                                    <div className={Styles.locationInputDiv}>
                                        <img src={destinationImg} alt="" />
                                        <input
                                            type="text"
                                            placeholder="Destinaton"
                                            ref={destinationRef}
                                            className={Styles.locationInput}
                                        />
                                    </div>
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
                                <div className={Styles.distance}>{distance} kms</div>
                            </div>
                            <div className={Styles.distanceBlock2}>
                                <div>
                                    The distance between <b>{originRef.current.value}</b> and{" "}
                                    <b>{destinationRef.current.value}</b> via the seleted route is{" "}
                                    <b>{distance} kms</b>.
                                </div>
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
