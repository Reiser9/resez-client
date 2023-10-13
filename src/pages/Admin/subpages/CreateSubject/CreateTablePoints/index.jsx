import React from 'react';

import styles from './index.module.css';

import Table from '../../../../../components/Table';
import CreateTableItem from './CreateTableItem';

const CreateTablePoints = ({
    primaryPointCount = 0,
    red,
    setRed,
    green,
    setGreen,
    elements,
    setElements,
    edit = false
}) => {
    const setRedHandler = (id) => {
        setGreen(prev => {
            if(prev === null || id + 1 === primaryPointCount){
                return null;
            }
            else if(id >= prev){
                return id + 1;
            }

            return prev;
        });

        setRed(prev => prev === id ? null : id);
    }

    const setGreenHandler = (id) => {
        setRed(prev => {
            if(prev === null || id === 0){
                return null;
            }
            else if(id <= prev){
                return id - 1;
            }

            return prev;
        });

        setGreen(prev => prev === id ? null : id);
    }

    const handleChangeInput = (e, id) => {
        let currentData = [...elements];

        currentData[id].secondaryScore = e.target.value;
        setElements(currentData);
    }

    React.useEffect(() => {
        if(primaryPointCount){
            let newElements = [];

            [...Array(primaryPointCount)].map((_, id) => {
                newElements = [...newElements, {
                    id,
                    primaryScore: id + 1,
                    isRed: false,
                    isGreen: false,
                    secondaryScore: ""
                }];
            });

            setElements(newElements);
        }
    }, []);

    return (
        <Table>
            <div className={styles.subjectPointsItem}>
                <p className={styles.subjectPointsHead}>Первичный балл</p>

                <div className={styles.subjectPointsActions}></div>

                <p className={styles.subjectPointsHead}>Вторичный балл</p>
            </div>

            {elements.map((data, id) => <CreateTableItem
                key={id}
                data={data}
                red={red}
                id={id}
                green={green}
                callbackRed={() => setRedHandler(id)}
                callbackGreen={() => setGreenHandler(id)}
                onChange={handleChangeInput}
            />)}
        </Table>
    )
}

export default CreateTablePoints;