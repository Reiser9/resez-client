import React from 'react';

import styles from './index.module.css';

const Preloader = ({small = false, fill = false, page = false}) => {
	return(
		<div className={`${styles.preloaderInner}${fill ? ` ${styles.fill}` : ""}${page ? ` ${styles.page}` : ""}`}>
			<div className={`${styles.preloader}${small ? ` ${styles.small}` : ""}`}></div>
		</div>
	)
}

export default Preloader;