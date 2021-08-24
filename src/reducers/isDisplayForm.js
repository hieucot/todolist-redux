import * as types from './../constants/ActionTypes';


var initialState = false;

var myReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.TOGGLE_FROM:
			return !state;

		case types.OPEN_FROM:
			return true;

		case types.CLOSE_FROM:
			return false;

		default: return state
	}
};

export default myReducer;