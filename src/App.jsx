import './App.css';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import JournalList from './components/JournalList/JournalList';
import LeftColumn from './layouts/LeftColumn/LeftColumn';
import RightColumn from './layouts/RightColumn/RightColumn';
import { useLocalStorage } from './hooks/use-localstorage.hooks';
import { UserContextProvider } from './context/user.context';
import { useState } from 'react';

function mapItems(item) {
	if (!item) {
		return [];
	}
	return item.map(i => ({
		...i,
		date: new Date(i.date)
	}));

}

function App() {
	const [items, setItems] = useLocalStorage('journalData');
	const [selectedItem, setSelectedItem] = useState(null);

	const addJournalItem = (item) => {
		if (!item.id) {
			setItems([...mapItems(items), {
				...item,
				date: new Date(item.date),
				text: item.text,
				id: items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1
			}]);
		} else {
			setItems([...mapItems(items).map(i => {
				if (i.id === item.id) {
					return {
						...item
					};
				}
				return i;
			})]);
		}
	};

	const deleteJournalItem = (id) => {
		setItems([...mapItems(items).filter(i => i.id !== id)]);
	};

	return (
		<UserContextProvider>
			<div className='app'>
				<LeftColumn>
					<Header />
					<JournalAddButton clearForm={() => setSelectedItem(null)}/>
					<JournalList items={mapItems(items)} setItem={setSelectedItem}/>
				</LeftColumn>
				<RightColumn>
					<JournalForm onSubmit={addJournalItem} onDelete={deleteJournalItem} data={selectedItem}/>
				</RightColumn>
			</div>
		</UserContextProvider>
	);
}

export default App;
