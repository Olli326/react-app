import './App.css';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import JournalList from './components/JournalList/JournalList';
import LeftColumn from './layouts/LeftColumn/LeftColumn';
import RightColumn from './layouts/RightColumn/RightColumn';
import { useLocalStorage } from './hooks/use-localstorage.hooks';
import { UserContextProvider } from './context/user.context';

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

	const addJournalItem = (item) => {
		setItems([...mapItems(items), {
			...item,
			date: new Date(item.date),
			text: item.text,
			id: items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1
		}]);
	};

	return (
		<UserContextProvider>
			<div className='app'>
				<LeftColumn>
					<Header />
					<JournalAddButton />
					<JournalList items={mapItems(items)}/>
				</LeftColumn>
				<RightColumn>
					<JournalForm onSubmit={addJournalItem}/>
				</RightColumn>
			</div>
		</UserContextProvider>
	);
}

export default App;
