import React from 'react';
import { createReactEditorJS } from 'react-editor-js';
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Code from "@editorjs/code";
import Image from "@editorjs/image";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";

import styles from './index.module.css';

import useAdmin from '../../hooks/useAdmin';

const ReactEditorJS = createReactEditorJS();

const Editor = React.forwardRef(({
    placeholder = "",
    id = "",
    minHeight = 60,
    ...props
}, ref) => {
    const {uploadImageOnServerFile, uploadImageOnServerUrl} = useAdmin();

    const handleInitialize = React.useCallback(instance => {
        ref.current = instance;
    }, []);

    const uploadByFile = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        return await uploadImageOnServerFile(formData);
    }

    const uploadByUrl = async (url) => {
        return await uploadImageOnServerUrl(url);
    }

    const EDITOR_TOOLS = {
        embed: Embed,
        table: Table,
        list: List,
        code: Code,
        image: {
            class: Image,
            config: {
                uploader: {
                    uploadByFile,
                    uploadByUrl
                }
            },
        },
        raw: Raw,
        header: Header,
        marker: Marker,
        checklist: CheckList,
        inlineCode: InlineCode,
        simpleImage: SimpleImage,
    };

    return (
        <ReactEditorJS
            onInitialize={handleInitialize}
            tools={EDITOR_TOOLS}
            minHeight={minHeight}
            holder={id}
            placeholder={placeholder}
            {...props}
        >
            <div id={id} className={styles.editor}></div>
        </ReactEditorJS>
    )
})

export default Editor;