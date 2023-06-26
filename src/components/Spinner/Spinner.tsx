import React from "react";
import {Spin} from "antd";
import styles from './Spinner.module.css';

const Spinner: React.FC = () => (
    <div className={styles.spinnerContainer}>
        <Spin size="large"/>
    </div>
);

export default Spinner;
