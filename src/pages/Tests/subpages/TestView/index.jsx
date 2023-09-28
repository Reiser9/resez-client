import React from 'react';
import { useParams } from 'react-router-dom';
import { Tooltip } from 'antd';

import base from '../../../../styles/base.module.css';
import typography from '../../../../styles/typography.module.css';
import styles from './index.module.css';

import useUtils from '../../../../hooks/useUtils';

import { Date, Delete, DotsHorizontal, Edit, Lock, Settings, TypesVariantStart } from '../../../../components/Icons';

import BackButton from '../../../../components/BackButton';
import HoverMenu from '../../../../components/HoverMenu';
import MenuLink from '../../../../components/HoverMenu/MenuLink';
import IconButton from '../../../../components/IconButton';
import CardLink from '../../../../components/CardLink';

const TestView = () => {
    const [actionMenu, setActionMenu] = React.useState(false);

    const {id} = useParams();
    const {copyTextWithNotify} = useUtils();

    return (
        <div className={base.baseWrapperGap40}>
            <div className={base.baseWrapperGap16}>
                <div className={base.titleInnerNowrap}>
                    <div className={styles.testTags}>
                        <BackButton />

                        <div className={styles.testTag}>
                            Математика
                        </div>

                        <div className={styles.testTag}>
                            Вопросов: 27
                        </div>

                        <Tooltip title="Скрыта">
                            <div className={styles.testTagIcon}>
                                <Lock />
                            </div>
                        </Tooltip>
                    </div>

                    <div className={styles.testTags}>
                        <HoverMenu
                            value={actionMenu}
                            setValue={setActionMenu}
                            button={
                                <IconButton type="light" small onClick={() => setActionMenu(prev => !prev)}>
                                    <DotsHorizontal />
                                </IconButton>
                            }
                        >
                            <MenuLink disabled>
                                <Settings />

                                Настройки
                            </MenuLink>

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
                </div>

                <p className={`${typography.h4} ${styles.testId}`} onClick={() => copyTextWithNotify(id, "ID варианта скопировано")}>
                    ID: {id}
                </p>

                <div className={base.titleInner}>
                    <div className={base.titleWrapper}>
                        <div className={base.circle40}>
                            2
                        </div>

                        <p className={typography.text}>222</p>
                    </div>

                    <div className={styles.testDateInner}>
                        <Date />

                        {/* {formatDate(date, "D MMMM YYYY")} */}
                        17 сентября в 20:32
                    </div>
                </div>
            </div>

            <div className={base.contentItems}>
                <CardLink title="Решать" to="test">
                    <TypesVariantStart />
                </CardLink>
            </div>

            <div className={base.baseWrapperGap12}>
                <p className={typography.h4}>Вопросы (27)</p>

                <div className={base.contentItems}>
                    <div className={styles.testQuestionItem}>

                    </div>


                </div>
            </div>
        </div>
    )
}

export default TestView;