import React from 'react';
import { Checkbox } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import typography from '../../../../styles/typography.module.css';
import styles from './index.module.css';

import { Delete, Swap } from '../../../../components/Icons';

import useNotify from '../../../../hooks/useNotify';
import useTraining from '../../../../hooks/useTraining';

import Input from '../../../../components/Input';
import Textarea from '../../../../components/Textarea';
import Button from '../../../../components/Button';
import IconButton from '../../../../components/IconButton';
import BackButton from '../../../../components/BackButton';
import Preloader from '../../../../components/Preloader';

const AddCardCollection = ({edit = false}) => {
    const [name, setName] = React.useState("");
    const [withDescription, setWithDescription] = React.useState(false);
    const [description, setDescription] = React.useState("");
    const [anonimCollection, setAnonimCollection] = React.useState(false);
    const [pairs, setPairs] = React.useState([{
        question: "",
        answer: ""
    }]);
    const [question, setQuestion] = React.useState("");
    const [answer, setAnswer] = React.useState("");

    const {alertNotify} = useNotify();
    const {isLoading, createCollection, getCollectionById, updateCollection} = useTraining();
    const navigate = useNavigate();
    const {id} = useParams();
    const {collection} = useSelector(state => state.training);

    const addNewPair = () => {
        if(!question || !answer){
            return alertNotify("Предупреждение", "Прежде чем добавить пару, заполните поля", "warn");
        }

        setPairs(prev => [...prev, {
            question,
            answer
        }]);
        setQuestion("");
        setAnswer("");
    }

    const enterNewPair = (e) => {
        if(e.key === "Enter"){
            addNewPair();
        }
    }

    const removePair = (id) => {
        const updatedObjects = [...pairs];
        updatedObjects.splice(id, 1);
        setPairs(updatedObjects);
    }

    const handleChange = (index, e, name) => {
        const newValues = [...pairs];

        newValues[index] = {
            ...newValues[index],
            [name]: e.target.value
        }

        setPairs(newValues);
    };

    const validateHandler = () => {
        let newPairs = pairs;

        if(question && answer){
            newPairs = [...newPairs, {
                question,
                answer
            }];
        }

        if(newPairs.length < 2){
            return alertNotify("Предупреждение", "Нельзя создать коллекцию, в которой меньше 2-х пар", "warn");
        }

        let hasEmptyField = false;

        for (let i = 0; i < pairs.length; i++) {
            if(pairs[i].question === "" || pairs[i].answer === ""){
                hasEmptyField = true;
                break;
            }
        }

        if(hasEmptyField){
            return alertNotify("Предупреждение", "Не все поля заполнены", "warn");
        }

        return newPairs;
    }

    const createCollectionHandler = () => {
        const newPairs = validateHandler();

        if(!newPairs){
            return;
        }

        createCollection(name, withDescription ? description : "", anonimCollection, newPairs, () => navigate("../memo"));
    }

    const editCollectionHandler = () => {
        const newPairs = validateHandler();

        if(!newPairs){
            return;
        }

        updateCollection(id, name, withDescription ? description : "", anonimCollection, newPairs, () => navigate("../memo"));
    }

    const swapElementsInArray = (id) => {
        const tempObject = {
            question: pairs[id].answer,
            answer: pairs[id].question
        }

        const updatedObjects = [...pairs];
        updatedObjects.splice(id, 1, tempObject);
        setPairs(updatedObjects);
    }

    const swapElements = () => {
        const tempQuestion = question;

        setQuestion(answer);
        setAnswer(tempQuestion);
    }

    React.useEffect(() => {
        if(!edit){
            return;
        }

        if(!id || isNaN(id)){
            return navigate("../memo");
        }

        getCollectionById(id);
    }, [id]);

    React.useEffect(() => {
        if(!edit || Object.keys(collection).length === 0){
            return;
        }

        const {collection: colName, description: colDescription, isPrivate, QAPairs} = collection;

        setName(colName);
        if(colDescription){
            setWithDescription(true);
            setDescription(colDescription);
        }
        setAnonimCollection(isPrivate);
        setPairs([...QAPairs]);
    }, [collection]);

    return (
        <div className={styles.addCardCollection}>
            <div className={styles.addCardCollectionWrapper}>
                <div className={styles.addCardCollectionTitleInner}>
                    <BackButton />

                    <p className={typography.h3}>{edit ? "Редактирование" : "Создание"} коллекции</p>
                </div>
            </div>

            <div className={styles.addCardCollectionForm}>
                <Input value={name} setValue={setName} placeholder="Название" lengthLimit={75} trackLength />

                <Checkbox checked={withDescription} onChange={e => setWithDescription(e.target.checked)}>
                    Добавить описание
                </Checkbox>

                {withDescription && <Textarea value={description} setValue={setDescription} placeholder="Описание" lengthLimit={500} trackLength />}

                <Checkbox checked={anonimCollection} onChange={e => setAnonimCollection(e.target.checked)}>
                    Скрыть от других пользователей
                </Checkbox>

                <div className={styles.addCardCollectionPairs}>
                    {pairs.map((data, id) => <div key={id} className={styles.addCardCollectionPair}>
                        <div className={styles.addCardCollectionPairWrap}>
                            <Input placeholder="Вопрос" lengthLimit={250} value={data.question} onChange={e => handleChange(id, e, "question")} wrapperClass={styles.addCardCollectionPairInput} />
                            <Input placeholder="Ответ" lengthLimit={250} value={data.answer} onChange={e => handleChange(id, e, "answer")} wrapperClass={styles.addCardCollectionPairInput} />

                            <button className={styles.addCardCollectionPairSwap} onClick={() => swapElementsInArray(id)}>
                                <Swap />
                            </button>
                        </div>
                        
                        <IconButton type="danger" className={styles.addCardCollectionPairDelete} onClick={() => removePair(id)}>
                            <Delete />
                        </IconButton>
                    </div>)}

                    <div className={styles.addCardCollectionPair} id="pairsAdd">
                        <div className={styles.addCardCollectionPairWrap}>
                            <Input placeholder="Вопрос" lengthLimit={250} value={question} setValue={setQuestion} wrapperClass={styles.addCardCollectionPairInput} onKeyDown={enterNewPair} />
                            <Input placeholder="Ответ" lengthLimit={250} value={answer} setValue={setAnswer} wrapperClass={styles.addCardCollectionPairInput} onKeyDown={enterNewPair} />

                            <button className={`${styles.addCardCollectionPairSwap}${(!answer && !question) ? ` ${styles.disable}` : ""}`} onClick={swapElements}>
                                <Swap />
                            </button>
                        </div>
                    
                        <IconButton type="danger" className={styles.addCardCollectionPairDelete} disabled>
                            <Delete />
                        </IconButton>
                    </div>

                    <Button auto onClick={addNewPair}>
                        Добавить
                    </Button>
                </div>

                {edit
                ? <Button auto type="light" loading={isLoading} onClick={editCollectionHandler}>
                    Сохранить
                </Button>
                : <Button auto type="light" loading={isLoading} onClick={createCollectionHandler}>
                    Создать
                </Button>}
            </div>
        </div>
    )
}

export default AddCardCollection;