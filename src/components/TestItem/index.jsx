import React from 'react';
import { Tooltip } from 'antd';

import base from '../../styles/base.module.css';
import typography from '../../styles/typography.module.css';
import styles from './index.module.css';

import { Delete, DotsHorizontal, Edit, Lock, Verified } from '../Icons';

import HoverMenu from '../HoverMenu';
import IconButton from '../IconButton';
import MenuLink from '../HoverMenu/MenuLink';
import TextPoint from '../TextPoint';

const TestItem = ({
    data
}) => {
    const {subject} = data || {};

    const [actionMenu, setActionMenu] = React.useState(false);

    return (
        <div className={`${base.item3} ${styles.testItem}`}>
            <div className={styles.testItemWrapper}>
                <div className={styles.testItemTitleWrapper}>
                    <div className={styles.testItemTitleInner}>
                        <div className={styles.testItemAvatar}>
                            {subject ? subject[0] : "No"}
                        </div>

                        {subject && <p className={styles.testItemName}>{subject}</p>}
                    </div>

                    <HoverMenu
                        button={
                            <IconButton className={styles.testItemMore} type="light" small onClick={() => setActionMenu(prev => !prev)}>
                                <DotsHorizontal />
                            </IconButton>
                        }
                        value={actionMenu}
                        setValue={setActionMenu}
                    >
                        <MenuLink>
                            <Edit />

                            Редактировать
                        </MenuLink>

                        <MenuLink danger>
                            <Delete />

                            Удалить
                        </MenuLink>
                    </HoverMenu>
                </div>

                <div className={styles.testItemInfo}>
                    <TextPoint title="Заданий" text="22" className={styles.testItemInfoItem} />
                    <TextPoint title="ID теста" text="634523" className={styles.testItemInfoItem} />
                </div>

                <div className={styles.testItemScore}>
                    <p className={`${typography.text2} ${styles.testItemScoreTitle}`}>Прогресс решения</p>

                    <div className={styles.testItemScoreContent}>
                        <div className={styles.testItemScoreLine}>
                            <div className={styles.testItemScoreProgress} style={{width: "35%"}}></div>
                        </div>

                        <div className={styles.testItemScoreValueInner}>
                            <p className={`${typography.text3} ${styles.testItemScoreValue}`}>35%</p>
                        </div>
                    </div>
                </div>

                <div className={styles.testItemScore}>
                    <p className={`${typography.text2} ${styles.testItemScoreTitle}`}>Баллы</p>

                    <div className={styles.testItemScoreContent}>
                        <div className={styles.testItemScoreLine}>
                            <div className={styles.testItemScoreProgress} style={{width: "66%"}}></div>
                        </div>

                        <div className={styles.testItemScoreValueInner}>
                            <p className={`${typography.text3} ${styles.testItemScoreValue}`}>66 / 100</p>
                        </div>
                    </div>

                    <div className={styles.testItemLockResult}>
                        Решите тест полностью, чтобы увидеть результат
                    </div>
                </div>
            </div>

            <div className={styles.testItemTags}>
                <Tooltip title="Тест разработан командой ResEz" placement="bottomLeft">
                    <div className={styles.testItemTag}>
                        ResEz
                    </div>
                </Tooltip>

                <Tooltip title="Тест создан пользователем, но мы проверили его" placement="bottomLeft">
                    <div className={styles.testItemTag}>
                        <Verified />
                    </div>
                </Tooltip>

                <Tooltip title="Тест скрыт для других пользователей" placement="bottomLeft">
                    <div className={styles.testItemTag}>
                        <Lock />
                    </div>
                </Tooltip>

                <Tooltip title="Вариант ЕГЭ" placement="bottomLeft">
                    <div className={styles.testItemTag}>
                        ЕГЭ
                    </div>
                </Tooltip>
            </div>
        </div>
    )
}

export default TestItem;