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
    const [fileMenu, setFileMenu] = React.useState(false);

    const fileMenuRef = React.useRef(null);

    const closeFileMenu = () => {
        setFileMenu(false);
    }

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
                closeFileMenu();
            });
        };
    }

    const deleteCallbackHandler = () => {
        setIsLoading(true);
        deleteCallback(() => {
            setIsLoading(false);
            closeFileMenu();
        });
    }

    const handleOutsideClick = (e) => {
        if (fileMenuRef.current && !fileMenuRef.current.contains(e.target)) {
            closeFileMenu();
        }
    };

    React.useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
    
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    return (
        <div className={`${styles.inputInner}${fileMenu ? ` ${styles.active}` : ""}`} onClick={() => setFileMenu(prev => !prev)} ref={fileMenuRef}>
            <input
                id={id}
                type="file"
                className={styles.file}
                accept={accept || 'image/png, image/jpeg, image/svg+xml'}
                onChange={onInputChange}
            />

            <div className={`${styles.fileLabel} ${inputType[type]}`} onClick={e => e.stopPropagation()}>
                <label htmlFor={id} className={styles.fileLabelHoverButton}>
                    <Upload />

                    <p className={styles.fileLabelText}>Загрузить</p>
                </label>

                {withDelete && <button className={`${styles.fileLabelHoverButton} ${styles.delete}`} onClick={deleteCallbackHandler}>
                    <Delete />

                    <p className={styles.fileLabelText}>Удалить</p>
                </button>}

                {withPreview && preview && <img src={preview} alt="preview" className={styles.fileLabelImg} />}
            </div>

            {isLoading && <Preloader className={styles.fileLoading} small />}
        </div>
    )
}

export default File;