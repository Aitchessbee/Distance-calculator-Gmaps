import Map from "./components/Map";
import LeftAside from "./components/LeftAside";
import Navbar from "./components/Navbar";
import Styles from "./styles/App.module.css";

function App() {
    return (
        <div>
            <Navbar />
            <div>
                <div className={Styles.centerText}>
                    Let's calculate <b>distance</b> from Google maps
                </div>
                <Map />
            </div>
        </div>
    );
}

export default App;
