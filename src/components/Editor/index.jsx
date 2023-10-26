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
import { CustomMath } from './CustomMathTool';
import { CustomFiles } from './CustomFiles';

import styles from './index.module.css';

import useAdmin from '../../hooks/useAdmin';

const ReactEditorJS = createReactEditorJS();

const Editor = React.forwardRef(({
    placeholder = "",
    id = "",
    minHeight = 60,
    ...props
}, ref) => {
    const {uploadImageOnServerFile, uploadImageOnServerUrl, uploadFile} = useAdmin();

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

    const uploadFileHandler = async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        return await uploadFile(formData);
    }

    const EDITOR_TOOLS = {
        embed: Embed,
        header: {
            class: Header,
            inlineToolbar : true
        },
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
        marker: Marker,
        checklist: CheckList,
        inlineCode: InlineCode,
        simpleImage: SimpleImage,
        math: CustomMath,
        files: {
            class: CustomFiles,
            config: {
                uploadRequest: uploadFileHandler
            },
        },
    }

    const localLang = {
        messages: {
            ui: {
                "blockTunes": {
                    "toggler": {
                        "Click to tune": "Нажмите, чтобы настроить",
                        "or drag to move": "или перетащите"
                    },
                },
                "inlineToolbar": {
                    "converter": {
                        "Convert to": "Конвертировать в"
                    }
                },
                "toolbar": {
                    "toolbox": {
                        "Add": "Добавить"
                    }
                }
            },
            toolNames: {
                "Text": "Параграф",
                "Heading": "Заголовок",
                "List": "Список",
                "Image": "Изображение",
                "Checklist": "Чеклист",
                "Code": "Код",
                "Raw HTML": "HTML",
                "Table": "Таблица",
                "Link": "Ссылка",
                "Marker": "Маркер",
                "Bold": "Полужирный",
                "Italic": "Курсив",
                "InlineCode": "Моноширинный"
            },
            tools: {
                warning: {
                    "Title": "Название",
                    "Message": "Сообщение",
                },
                link: {
                    "Add a link": "Вставьте ссылку"
                },
                stub: {
                    "The block can not be displayed correctly.": "Блок не может быть отображен"
                },
                header: {
                    "Heading 1": "Заголовок 1",
                    "Heading 2": "Заголовок 2",
                    "Heading 3": "Заголовок 3",
                    "Heading 4": "Заголовок 4",
                    "Heading 5": "Заголовок 5",
                    "Heading 6": "Заголовок 6"
                },
                image: {
                    'Select an Image': 'Загрузить изображение',
                    'Caption': 'Описание',
                    "With border": "С обводкой",
                    "Stretch image": "Расстянуть",
                    "With background": "С задним фоном"
                },
                table: {
                    "Add column to left": "Добавить колонку слева",
                    "Add column to right": "Добавить колонку справа",
                    "Add row above": "Добавить строку выше",
                    "Add row below": "Добавить строку ниже",
                    "Delete column": "Удалить колонку",
                    "Delete row": "Удалить строку",
                    "With headings": "С заголовками",
                    "Without headings": "Без заголовками"
                },
                list: {
                    "Ordered": "Упорядоченный",
                    "Unordered": "Неупорядоченный"
                },
                code: {
                    "Enter a code": "Введите код"
                }
            },
            blockTunes: {
                "delete": {
                    "Delete": "Удалить",
                    "Click to delete": "Подтвердить"
                },
                "moveUp": {
                    "Move up": "Переместить вверх"
                },
                "moveDown": {
                    "Move down": "Переместить вниз"
                }
            }
        }
    }

    return (
        <ReactEditorJS
            onInitialize={handleInitialize}
            tools={EDITOR_TOOLS}
            minHeight={minHeight}
            holder={id}
            placeholder={placeholder}
            i18n={localLang}
            {...props}
        >
            <div id={id} className={styles.editor}></div>
        </ReactEditorJS>
    )
})

export default Editor;