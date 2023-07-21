import React from 'react';

import styles from './index.module.css';

const inputType = {
    "avatar": styles.avatar
}

const File = ({id, accept, setValue, type = "avatar"}) => {
    const [preview, setPreview] = React.useState("");

    const onInputChange = (e) => {
        if(!e.target.files[0]){
            return;
        }
        
        setValue(e.target.files[0]);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(e.target.files[0]);

        fileReader.onloadend = () => {
            setPreview(fileReader.result);
        };
    }

    return (
        <div className={styles.inputInner}>
            <input
                id={id}
                type="file"
                className={styles.file}
                accept={accept || 'image/png, image/jpeg, image/svg+xml'}
                onChange={onInputChange}
            />

            <label htmlFor={id} className={`${styles.fileLabel} ${inputType[type]}`}>
                {preview && <img src={preview} alt="preview" className={styles.fileLabelImg} />}
            </label>
        </div>
    )
}

export default File;