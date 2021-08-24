import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/TaskControl';
import TaskList from './components/TaskList';
import { connect } from 'react-redux';
import * as actions from './actions/index';

class App extends Component {



  // Toggle Form
  onToggleForm = () => {
    var { itemEditing } = this.props;
    if (itemEditing.id !== '') {
      this.props.onOpenForm();
    }
    else {
      this.props.onToggleForm();
    }
    this.props.onClearTask({
      id: '',
      name: '',
      status: false
    });

  }


  render() {
    var { isDisplayForm } = this.props;

    return (
      <div>
        <div className="bg-dark text-white pt-2 pb-2">
          <h3 className="text-center">Quản lý công việc</h3>
        </div>
        <div className="container-fluid pt-4">
          <div className="row">

            <div className={isDisplayForm ? "col-md-4" : ""}>
              <TaskForm />
            </div>

            <div className={isDisplayForm ? "col-md-8" : "col-md-12"}>
              <button type="button"
                className="btn btn-outline-success"
                onClick={() => this.onToggleForm()}
              >
                <i className="fa fa-plus mr-2"></i>
                Thêm công việc
              </button>

              {/* Row Search & Sort */}
              {<Control />}

              <div className="row mt-4">
                <div className="col-md-12">
                  {<TaskList />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    isDisplayForm: state.isDisplayForm,
    itemEditing: state.itemEditing,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onToggleForm: () => {
      dispatch(actions.toggleForm());
    },
    onClearTask: (task) => {
      dispatch(actions.editTask(task));
    },
    onOpenForm: () => {
      dispatch(actions.openForm());
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);