import * as types from './../constants/ActionTypes';

// Function random ID
var randomString = () => {
	return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}
var randomID = () => {
	return randomString() + randomString() + '-' + randomString() + randomString();
}
// End Function random ID

var findIndex = (tasks, id) => {
	var result = -1;
	tasks.forEach((task, index) => {
		if (task.id === id) {
			result = index;
		}
	});
	return result;
}


// Lấy dữ liệu ở LocalStored
var data = JSON.parse(localStorage.getItem("tasks"));

var initialState = data ? data : [];

var myReducer = (state = initialState, action) => {

	var id = "";
	var index = -1;

	switch (action.type) {
		case types.LIST_ALL:
			return state;

		case types.SAVE_TASK:
			var task = {
				id: action.task.id,
				name: action.task.name,
				status: action.task.status
			};

			// Trường hợp thêm mới
			if (!task.id) {
				task.id = randomID();
				state.push(task);
			}

			// Trường hợp chỉnh sửa
			else {
				index = findIndex(state, task.id);
				state[index] = task;
			}

			localStorage.setItem("tasks", JSON.stringify(state));
			return [...state];

		case types.UPDATE_STATUS_TASK:
			id = action.id;
			index = findIndex(state, id);
			if (index !== -1) {
				state[index] = {
					...state[index],
					status: !state[index].status
				}
				localStorage.setItem("tasks", JSON.stringify(state));
			}
			return [...state];

		case types.DELETE_TASK:
			id = action.id;
			index = findIndex(state, id);
			if (index !== -1) {
				state.splice(index, 1);
				localStorage.setItem("tasks", JSON.stringify(state));
			}
			return [...state];

		default:
			return state;
	}
};

export default myReducer;