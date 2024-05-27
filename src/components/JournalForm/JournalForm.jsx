import { useEffect, useReducer, useRef, useContext } from 'react';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import cn from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';

function JournalForm({ onSubmit, data, onDelete }) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const { isValid, isFormReadyToSubmit, values } = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const textRef = useRef();
	const { userId } = useContext(UserContext);

	const focusError = (isValid) => {
		switch(true) {
		case !isValid.title:
			titleRef.current.focus();
			break;
		case !isValid.date:
			dateRef.current.focus();
			break;
		case !isValid.text:
			textRef.current.focus();
			break;
		}
	};

	useEffect(() => {
		if (isValid.title && isValid.text && isValid.date) {
			return;
		}
		focusError(isValid);
		const timer = setTimeout(() => {
			dispatchForm({type: 'RESET_VALIDATION'});
		}, 2000);
		return () => clearTimeout(timer);
	}, [isValid]);

	useEffect(() => {
		if (isFormReadyToSubmit) {
			onSubmit(values);
			dispatchForm({type: 'RESET_FORM'});
			dispatchForm({type: 'SET_VALUE', payload: {userId}});
		}
	}, [isFormReadyToSubmit, onSubmit, values, userId]);

	useEffect(() => {
		dispatchForm({type: 'SET_VALUE', payload: {userId}});
	}, [userId]);

	useEffect(() => {
		if (!data) {
			dispatchForm({type: 'RESET_FORM'});
			dispatchForm({type: 'SET_VALUE', payload: {userId}});
			return;
		}
		dispatchForm({type: 'SET_VALUE', payload: {...data}});
	}, [data, userId]);

	const onChange = (e) => {
		dispatchForm({type: 'SET_VALUE', payload: {[e.target.name]: e.target.value}});
	};

	const addJournalItem = (event) => {
		event.preventDefault();
		dispatchForm({type: 'SUBMIT'});
	};

	const deleteJournalItem = () => {
		onDelete(data.id);
		dispatchForm({type: 'RESET_FORM'});
		dispatchForm({type: 'SET_VALUE', payload: {userId}});
	};

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div className={cn(styles['input-container'])}>
				<Input
					type='text'
					name='title'
					ref={titleRef}
					value={values.title}
					onChange={onChange}
					appearance='title'
					isValid={isValid.title}
					placeholder='Заголовок'/>
				{data?.id && <button className={styles['btn-delete']} type='button' onClick={deleteJournalItem}>
					<img src="/archive.svg" alt="del"/>
				</button>}
			</div>
			<div className={cn(styles['input-container'])}>
				<label htmlFor="date" className={cn(styles['form-label'])}>
					<img src="calendar.svg" alt="calendar"/>
					<span>Дата</span>
				</label>
				<Input type='date' name='date' id='date' ref={dateRef} value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''} onChange={onChange} isValid={isValid.date} />
			</div>
			<div className={cn(styles['input-container'])}>
				<label htmlFor="tag" className={cn(styles['form-label'])}>
					<img src="folder.svg" alt="folder"/>
					<span>Метки</span>
				</label>
				<Input type='text' name='tag' id='tag' value={values.tag} onChange={onChange}/>
			</div>
			<textarea name='text' placeholder='Введите текст' ref={textRef} value={values.text} onChange={onChange} className={`${styles['input']} ${isValid.text ? '' : styles['invalid']}`}></textarea>
			<Button>Сохранить</Button>
		</form>
	);
}

export default JournalForm;