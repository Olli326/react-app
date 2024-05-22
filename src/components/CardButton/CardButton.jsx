import './CardButton.css';

function CardButton({ children, className }) {
	const classes = 'card-button' + (className ? ' ' + className : '');

	return (
		<button className={classes}>{children}</button>
	);
}

export default CardButton;