import SelectUser from '../SelectUser/SelectUser';
import './Header.css';

function Header() {

	return (
		<>
			<img className='logo' src="/public/logo.svg" alt="logo" />
			<SelectUser />
		</>
	);
}

export default Header;