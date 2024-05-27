import './JournalList.css';
import JournalItem from '../JournalItem/JournalItem';
import CardButton from '../CardButton/CardButton';
import { useContext, useMemo } from 'react';
import { UserContext } from '../../context/user.context';

function JournalList({ items, setItem }) {
	const { userId } = useContext(UserContext);

	const sortedItems = (a, b) => {
		if (a.date > b.date) {
			return -1;
		} else {
			return 1;
		}
	};

	const filteredItems = useMemo(() => items
		.filter(el => el.userId === userId)
		.sort(sortedItems), [items, userId]);

	if (items.length === 0) {
		return <div className='journal-list__empty'>Записей нет</div>;
	}

	return <>
		{filteredItems
			.map(item => (
				<CardButton key={item.id} onClick={() => setItem(item)}>
					<JournalItem 
						title={item.title}
						date={item.date}
						text={item.text}
					/>
				</CardButton>
			))}</>;
}

export default JournalList;