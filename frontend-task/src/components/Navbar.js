import Logo from "../images/Graviti Logo 1.png";
import Styles from "../styles/Navbar.module.css";

function Navbar() {
    return (
        <div className={Styles.navbar}>
            <img src={Logo} alt="" />
        </div>
    );
}

export default Navbar;
