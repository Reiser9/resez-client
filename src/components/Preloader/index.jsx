import React from 'react';

import styles from './index.module.css';

const Preloader = ({small = false, fill = false, page = false, className, ...props}) => {
	return(
		<div className={`${styles.preloaderInner}${fill ? ` ${styles.fill}` : ""}${page ? ` ${styles.page}` : ""}${className ? ` ${className}` : ""}`} {...props}>
			<div className={`${styles.preloader}${small ? ` ${styles.small}` : ""}`}></div>
		</div>
	)
}

export default Preloader;