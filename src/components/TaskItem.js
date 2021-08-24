import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskItem extends Component {

	onUpdateStatus = () => {
		this.props.onUpdateStatus(this.props.task.id);
	}

	onDelete = () => {
		this.props.onDeleteTask(this.props.task.id);
		this.props.onCloseForm();
	}

	onEditTask = () => {
		this.props.onEditTask(this.props.task);
		this.props.onOpenForm();
	}

	render() {
		var { task, index } = this.props;
		return (
			<tr className="text-center">
				<td>{index + 1}</td>
				<td>{task.name}</td>
				<td>
					<span
						className={task.status === true ? 'badge badge-success' : 'badge badge-danger'}
						onClick={this.onUpdateStatus}
					>
						{task.status === true ? 'Kích hoạt' : 'Ẩn'}
					</span>
				</td>
				<td>
					<button
						type="submit"
						className="btn btn-info"
						onClick={() => this.onEditTask()}
					>Sửa</button>
					<button
						type="button"
						className="btn btn-danger ml-2"
						onClick={() => this.onDelete()}
					>Xoá</button>
				</td>
			</tr>
		);
	}
}


const mapStateToProps = state => {
	return {

	};
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		onUpdateStatus: (id) => {
			dispatch(actions.updateStatus(id));
		},
		onDeleteTask: (id) => {
			dispatch(actions.deleteTask(id));
		},
		onCloseForm: () => {
			dispatch(actions.closeForm());
		},
		onOpenForm: () => {
			dispatch(actions.openForm());
		},
		onEditTask: (task) => {
			dispatch(actions.editTask(task));
		}
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);