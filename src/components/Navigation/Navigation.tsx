import React from "react";
import {Link} from "react-router-dom";

import styles from "./Navigation.module.css";

const Navigation: React.FC = () => {
    return (
        <div className={styles.navContainer}>
            <div className={styles.navMenu}>
                <div className={styles.navLinks}>
                    <Link to="/">Users</Link>
                </div>
                <div className={styles.navLinks}>
                    <Link to="/tasks">Tasks</Link>
                </div>
            </div>
        </div>
    );
};

export default Navigation;