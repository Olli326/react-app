export const INITIAL_STATE = {
	isValid: {
		title: true,
		text: true,
		date: true
	},
	values: {
		title: '',
		text: '',
		date: '',
		tag: ''
	},
	isFormReadyToSubmit: false
};

export function formReducer(state, action) {
	switch (action.type) {
	case 'SET_VALUE':
		return {
			...state,
			values: {
				...state.values,
				...action.payload
			}
		};
	case 'RESET_VALIDATION':
		return {
			...state,
			isValid: INITIAL_STATE.isValid
		};
	case 'SUBMIT': {
		const titleValid = state.values.title?.trim().length;
		const textValid = state.values.text?.trim().length;
		const dateValid = state.values.date;
		return {
			...state,
			isValid: {
				title: titleValid,
				text: textValid,
				date: dateValid
			},
			isFormReadyToSubmit: titleValid && textValid && dateValid
		};
	}
	case 'RESET_FORM':
		return {
			...state,
			values: INITIAL_STATE.values,
			isFormReadyToSubmit: false
		};
	}
}
