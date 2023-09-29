import React from 'react';
import { Tooltip } from 'antd';

import base from '../../styles/base.module.css';
import typography from '../../styles/typography.module.css';
import pws from '../../styles/pageWithSidebar.module.css';
import styles from './index.module.css';

import { Block, Clip, Cross, Delete, DotsHorizontal, Microphone, Mobile, Plus, Search, Send } from '../../components/Icons';

import TitleWrapper from '../../components/Wrapper/TitleWrapper';
import WithSidebarWrapper from '../../components/Wrapper/WithSidebarWrapper';
import BackButton from '../../components/BackButton';
import HoverMenu from '../../components/HoverMenu';
import IconButton from '../../components/IconButton';
import MenuLink from '../../components/HoverMenu/MenuLink';
import DialogMessageItem from '../../components/DialogMessageItem';
import Input from '../../components/Input';
import Button from '../../components/Button';
import DialogItem from '../../components/DialogItem';

const Messanger = () => {
    const [message, setMessage] = React.useState("");
    const [actionMenu, setActionMenu] = React.useState(false);
    const [messageSelected, setMessageSelected] = React.useState(false);

    return (
        <TitleWrapper pageTitle="ResEz - Мессенджер">
            <WithSidebarWrapper>
                <div className={pws.wrapper}>
                    <div className={`${pws.contentFull} ${styles.messangerWrapper}`}>
                        <div className={styles.messanger}>
                            <div className={styles.messangerContent}>
                                <div className={styles.messangerTopBar}>
                                    <div className={base.titleWrapper}>
                                        <BackButton />

                                        {messageSelected && <div className={styles.selectedMessages}>
                                            <p className={styles.selectedMessagesText}>Выделено: 1</p>

                                            <Cross />
                                        </div>}
                                    </div>

                                    {!messageSelected && <div className={styles.messangerTopBarInfo}>
                                        <p className={typography.h4}>Ветров Егор</p>

                                        <div className={styles.messangerTopBarOnline}>
                                            <p className={typography.text2}>был в сети 5 минут назад</p>

                                            <Mobile />
                                        </div>
                                    </div>}

                                    <div className={base.titleWrapper}>
                                        {messageSelected && <>
                                            <Button type="light" small>
                                                Ответить
                                            </Button>

                                            <Button type="light" small>
                                                Переслать
                                            </Button>
                                        </>}

                                        <HoverMenu
                                            button={
                                                <IconButton small type="light" onClick={() => setActionMenu(prev => !prev)}>
                                                    <DotsHorizontal />
                                                </IconButton>
                                            }
                                            value={actionMenu}
                                            setValue={setActionMenu}
                                        >
                                            <MenuLink danger>
                                                <Delete />

                                                Удалить переписку
                                            </MenuLink>

                                            <MenuLink danger>
                                                <Block />

                                                Заблокировать
                                            </MenuLink>
                                        </HoverMenu>
                                    </div>
                                </div>

                                <div className={styles.messangerDialog}>
                                    <DialogMessageItem name="Егор" time="11:45" text="ну может тогда уже часа в 2-3, а то мне выходить скоро" />
                                    <DialogMessageItem name="Эльман" time="13:15" text="Да, давай" />
                                    <DialogMessageItem name="Егор" time="14:55" text="Ок" />
                                    <DialogMessageItem name="Эльман" time="14:55" text="Ну все, я жду" />
                                    <DialogMessageItem name="Егор" time="14:55" text="Гооооо" />
                                    <DialogMessageItem name="Эльман" time="14:55" text="Звоню, ты не берешь трубку" />
                                    <DialogMessageItem name="Егор" time="14:55" text="Ну а пошел ты нахер звонить мне" />
                                    <DialogMessageItem name="Эльман" time="14:55" text="Нет, не пойду" />
                                    <DialogMessageItem name="Егор" time="14:55" text="Ыыыыы :)" />
                                    <DialogMessageItem name="Эльман" time="14:55" text="Че лыбу давишь" />
                                    <DialogMessageItem name="Егор" time="14:55" text="Выбоина, отстань" />
                                    <DialogMessageItem name="Эльман" time="14:55" text="Я тебя в блок кину" />
                                    <DialogMessageItem name="Егор" time="14:55" text="Рискни здоровьем, дрыщ" />
                                    <DialogMessageItem name="Эльман" time="14:55" text="Пон, в дс то пойдем?" />
                                    <DialogMessageItem name="Егор" time="14:55" text="ну го" />
                                    <DialogMessageItem name="Эльман" time="14:55" text="Гоооооо" />
                                    <DialogMessageItem onClick={() => setMessageSelected(prev => !prev)} name="Егор" time="14:55" text="Звоню" />
                                    <DialogMessageItem name="Эльман" time="14:55" text="Принимаю" />
                                </div>

                                <form className={styles.messangerDialogSendInner} onSubmit={e => e.preventDefault()}>
                                    <IconButton>
                                        <Clip />
                                    </IconButton>
                                    
                                    {/* Сделать кастомный инпут, не компонент */}
                                    <Input value={message} setValue={setMessage} placeholder="Напишите сообщение" />

                                    <IconButton className={styles.sendButton}>
                                        <Microphone className={`${styles.iconButton}${!message ? ` ${styles.fade}` : ""}`} />
                                        <Send className={`${styles.iconButton}${message ? ` ${styles.fade}` : ""}`} />
                                    </IconButton>
                                </form>
                            </div>

                            <div className={styles.messangerSidebar}>
                                <div className={styles.searchInputInner}>
                                    <input type="text" className={styles.searchInput} placeholder="Поиск" />

                                    <Search className={styles.searchInputIcon} />

                                    <Tooltip title="Создать">
                                        <button className={styles.searchInputButton}>
                                            <Plus />
                                        </button>
                                    </Tooltip>
                                </div>

                                <div className={styles.messangerSidebarDialogsContent}>
                                    <DialogItem
                                        date="11:17"
                                        name="Егор Ветров"
                                        lastMessage="го"
                                    />

                                    <DialogItem
                                        date="Вчера"
                                        name="Алексей Зубков"
                                        from="Эльман"
                                        lastMessage="И распределить"
                                    />

                                    <DialogItem
                                        date="Вчера"
                                        name="Алексей Зубков"
                                        from="Эльман"
                                        lastMessage="И распределить"
                                    />

                                    <DialogItem
                                        date="Вчера"
                                        name="Алексей Зубков"
                                        from="Эльман"
                                        lastMessage="И распределить"
                                    />

                                    <DialogItem
                                        date="Вчера"
                                        name="Алексей Зубков"
                                        from="Эльман"
                                        lastMessage="И распределить"
                                    />

                                    <DialogItem
                                        date="Вчера"
                                        name="Алексей Зубков"
                                        from="Эльман"
                                        lastMessage="И распределить"
                                    />

                                    <DialogItem
                                        date="Вчера"
                                        name="Алексей Зубков"
                                        from="Эльман"
                                        lastMessage="И распределить все по полочкам, понимаешь да типо вот так"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </WithSidebarWrapper>
        </TitleWrapper>
    )
}

export default Messanger;