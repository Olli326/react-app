import './JournalList.css';
import JournalItem from '../JournalItem/JournalItem';
import CardButton from '../CardButton/CardButton';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';

function JournalList({ items }) {
	const { userId } = useContext(UserContext);

	if (items.length === 0) {
		return <div className='journal-list__empty'>Записей нет</div>;
	}

	const sortedItems = (a, b) => {
		if (a.date > b.date) {
			return -1;
		} else {
			return 1;
		}
	};

	return <>
		{items
			.filter(el => el.userId === userId)
			.sort(sortedItems)
			.map(item => (
				<CardButton key={item.id}>
					<JournalItem 
						title={item.title}
						date={item.date}
						text={item.text}
					/>
				</CardButton>
			))}</>;
}

export default JournalList;