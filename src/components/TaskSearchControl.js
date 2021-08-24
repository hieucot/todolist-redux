import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			keyWord: ""
		}
	}

	onChange = (event) => {
		var target = event.target;
		var name = target.name;
		var value = target.value;

		this.setState({
			[name]: value
		});
	}

	onSearch = () => {
		this.props.onSearch(this.state.keyWord);
	}

	render() {
		var { keyWord } = this.state;
		return (
			<div className="col-md-6">
				<div className="input-group mb-3">
					<input
						type="text"
						className="form-control"
						placeholder="Nhập từ khoá..."
						name="keyWord"
						value={keyWord}
						onChange={this.onChange}
					/>

					<div className="input-group-append">
						<button
							type="button"
							className="btn btn-primary"
							onClick={this.onSearch}
						>
							<i className="fa fa-search mr-2"></i>
							Tìm
						</button>

					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};
const mapDispatchToProps = (dispatch, props) => {
	return {
		onSearch: (keyword) => {
			dispatch(actions.searchTask(keyword));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);