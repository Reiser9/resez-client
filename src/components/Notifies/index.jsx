import React from "react";
import { useSelector } from "react-redux";

import styles from "./index.module.css";

import Notify from "./Notify";

const Notifies = () => {
    const { notifiesLocal } = useSelector((state) => state.notify);

    return (
        <>
            {notifiesLocal.length > 0 && (
                <div className={styles.notifyContent}>
                    {notifiesLocal.map((data) => (
                        <Notify key={data.id} data={data} />
                    ))}
                </div>
            )}
        </>
    );
};

export default Notifies;
