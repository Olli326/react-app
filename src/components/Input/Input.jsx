import { forwardRef } from 'react';
import styles from './Input.module.css';
import cn from 'classnames';

const Input = forwardRef(function Input({ className, isValid = true, appearance, placeholder, ...props }, ref) {

	return (
		<input {...props} ref={ref} className={cn(className, styles['input'], {
			[styles['invalid']]: !isValid,
			[styles['input-title']]: appearance === 'title'
		})} placeholder={placeholder}/>
	);
});

export default Input;