import React from 'react';

import styles from './index.module.css';

import { Delete, Upload } from '../Icons';

import Preloader from '../Preloader';

const inputType = {
    "avatar": styles.avatar
}

const File = ({
    id,
    accept,
    setValue,
    type = "avatar",
    withPreview = false,
    withDelete = false,
    loadedCallback = () => {},
    deleteCallback = () => {}
}) => {
    const [preview, setPreview] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const onInputChange = (e) => {
        if(!e.target.files[0]){
            return;
        }

        setIsLoading(true);
        
        if(setValue){
            setValue(e.target.files[0]);
        }
        
        const fileReader = new FileReader();
        fileReader.readAsDataURL(e.target.files[0]);

        fileReader.onloadend = () => {
            setPreview(fileReader.result);

            loadedCallback(e.target.files[0], () => {
                setIsLoading(false);
                e.target.value = null;
            });
        };
    }

    const deleteCallbackHandler = () => {
        setIsLoading(true);
        deleteCallback(() => setIsLoading(false));
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

            <div className={`${styles.fileLabel} ${inputType[type]}`}>
                <label htmlFor={id} className={styles.fileLabelHoverButton}>
                    <Upload />
                </label>

                {withDelete && <button className={`${styles.fileLabelHoverButton} ${styles.delete}`} onClick={deleteCallbackHandler}>
                    <Delete />
                </button>}

                {withPreview && preview && <img src={preview} alt="preview" className={styles.fileLabelImg} />}
            </div>

            {isLoading && <Preloader className={styles.fileLoading} small />}
        </div>
    )
}

export default File;