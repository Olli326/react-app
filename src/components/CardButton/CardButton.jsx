import './CardButton.css';

function CardButton({ children, className, ...props }) {
	const classes = 'card-button' + (className ? ' ' + className : '');

	return (
		<button {...props} className={classes}>{children}</button>
	);
}

export default CardButton;