import React from 'react';
import { Link } from 'react-router-dom';

import typography from '../../../../styles/typography.module.css';
import base from '../../../../styles/base.module.css';
import styles from './index.module.css';

import { ArrowRightLong } from '../../../../components/Icons';

import Button from '../../../../components/Button';
import ReloadButton from '../../../../components/ReloadButton';
import TextPoint from '../../../../components/TextPoint';

const Roles = () => {
    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleInner}>
                <div className={base.titleWrapper}>
                    <p className={typography.h3}>Роли (4)</p>

                    <ReloadButton />
                </div>

                <Button type="light" auto to="add">
                    Добавить
                </Button>
            </div>

            <div className={styles.rolesContent}>
                <div className={styles.roleItem}>
                    <div className={styles.roleItemNameInner}>
                        <p className={styles.roleItemName}>
                            Администратор
                        </p>

                        <Link to="2" className={styles.roleItemArrow}>
                            <ArrowRightLong />
                        </Link>
                    </div>

                    <TextPoint title="Привилегий" text="5" />
                </div>
            </div>
        </div>
    )
}

export default Roles;