import React from 'react';

import base from '../../../../styles/base.module.css';
import styles from '../../index.module.css';

import { Information, StudyHat } from '../../../../components/Icons';

import InfoBlock from '../../../../components/InfoBlock';

const InfoMain = () => {
    return (
        <div className={base.baseWrapperGap16}>
            <InfoBlock
                icon={<StudyHat />}
                title="Куча полезной информации"
                text="Здесь вы сможете узнать о лучших методах организации времени, техниках запоминания материала, а также получить полезные ресурсы и ссылки для дополнительного обучения. Эта страница станет вашим надежным помощником в достижении успеха в учебе"
                image={<Information />}
            />
        </div>
    )
}

export default InfoMain;