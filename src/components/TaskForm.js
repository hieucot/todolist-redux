import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      status: false
    }
  }

  componentDidMount() {
    var { itemEditing } = this.props;
    if (itemEditing && itemEditing.id !== null) {
      this.setState({
        id: itemEditing.id,
        name: itemEditing.name,
        status: itemEditing.status
      });
    }
    else {
      this.onClear();
    }
  }


  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.itemEditing) {
      if (nextProps.itemEditing.id !== state.id) {
        return {
          id: nextProps.itemEditing.id,
          name: nextProps.itemEditing.name,
          status: nextProps.itemEditing.status
        }
      }
    } else {
      if (state.id) {
        return {
          id: '',
          name: '',
          status: false
        }
      }
      this.onClear();
    }
    return null
  }



  onChange = (event) => {

    var target = event.target;
    var name = target.name;
    var value = target.type === "checkbox" ? target.checked : target.value;
    if (name === "status") {
      value = target.value === "true" ? true : false;
    }

    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    // this.onClear();
    this.props.onSaveTask(this.state);
    this.onCloseForm();
  }

  onClear = () => {
    this.setState({
      name: '',
      status: false
    });
  }

  onCloseForm = () => {
    this.props.onCloseForm();
  }

  render() {
    var { id } = this.state;

    if (!this.props.isDisplayForm) return null;
    return (
      <div className="card">
        <div className="card-header work__add bg-success text-light">
          <h6>{id === "" ? "Thêm công việc" : "Cập nhật công việc"}</h6>
          <i
            className="fa fa-times"
            onClick={() => this.onCloseForm()}>
          </i>
        </div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Tên</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>

            <div className="form-group">
              <label>Trạng thái</label>
              <select
                className="custom-select"
                name="status"
                value={this.state.status}
                onChange={this.onChange}
              >
                <option value={true}>Kích hoạt</option>
                <option value={false}>Ẩn</option>
              </select>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary">{id === "" ? "Thêm" : "Lưu"}</button>
              <button
                type="button"
                className="btn btn-outline-white ml-2"
                onClick={() => this.onClear()}
              >
                Huỷ
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isDisplayForm: state.isDisplayForm,
    itemEditing: state.itemEditing
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSaveTask: (task) => {
      dispatch(actions.saveTask(task));
    },
    onCloseForm: () => {
      dispatch(actions.closeForm());
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);