import React from 'react';

import base from '../../styles/base.module.css';
import styles from './index.module.css';

import { Archive, Delete, DotsHorizontal, Enter, Mute, Pin } from '../Icons';

import HoverMenu from '../HoverMenu';
import MenuLink from '../HoverMenu/MenuLink';

const DialogItem = ({
    date,
    name,
    mute = false,
    from = "",
    lastMessage
}) => {
    const [actionMenu, setActionMenu] = React.useState(false);

    return (
        <div className={styles.messangerDialogElement}>
            <div className={base.circle50}>
                {name[0]}
            </div>

            <div className={styles.messangerDialogElementTextInner}>
                <div className={base.titleInner}>
                    <div className={base.titleWrapper}>
                        <p className={styles.messangerDialogElementName}>{name}</p>

                        {mute && <Mute className={styles.messageDialogElementMute} />}
                    </div>

                    <p className={styles.messangerDialogElementDate}>{date}</p>
                </div>

                <div className={base.titleInnerNowrap}>
                    <div className={styles.messangerDialogElementMessageInner}>
                        {from && <div className={base.circle25}>
                            {from[0]}
                        </div>}

                        <p className={styles.messangerDialogElementMessage}>{lastMessage}</p>
                    </div>

                    <HoverMenu
                        button={
                            <button className={styles.messangerDialogElementMore} onClick={() => setActionMenu(prev => !prev)}>
                                <DotsHorizontal />
                            </button>
                        }
                        value={actionMenu}
                        setValue={setActionMenu}
                    >
                        <MenuLink>
                            <Pin />

                            Закрепить
                        </MenuLink>

                        <MenuLink>
                            <Archive />

                            В архив
                        </MenuLink>

                        <MenuLink danger>
                            <Delete />

                            Удалить переписку
                        </MenuLink>

                        <MenuLink danger>
                            <Enter />

                            Выйти из беседы
                        </MenuLink>
                    </HoverMenu>
                </div>
            </div>
        </div>
    )
}

export default DialogItem;