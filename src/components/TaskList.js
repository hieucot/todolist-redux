import React, { Component } from 'react';
import TaskItem from './TaskItem';
import { connect } from 'react-redux';
import * as actions from './../actions/index'

class TaskList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filterName: "",
      filterStatus: -1
    }
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.type === "checkbox" ? target.checked : target.value;

    var filter = {
      name: name === "filterName" ? value : this.state.filterName,
      status: name === "filterStatus" ? value : this.state.filterStatus
    };



    this.props.onFilterTable(filter);

    this.setState({
      [name]: value
    });
  }

  render() {

    var { tasks, filterTable, keyword, sort } = this.props;

    var { filterName, filterStatus } = this.state;

    // Lọc kết quả ở filter
    if (filterTable.name) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(filterTable.name.toLowerCase()) !== -1;
      });
    }

    // Lọc theo status
    tasks = tasks.filter((task) => {
      if (filterTable.status === -1) {
        return task;
      }
      else {
        return task.status === (filterTable.status === 1 ? true : false);
      }
    });

    // Ô search
    if (keyword) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }

    // Sort
    // Kiểm tra trường hợp theo A -> Z và Z -> A

    if (sort.by === "name") {
      tasks.sort((a, z) => {
        if (a.name > z.name) {
          return sort.value;
        }
        else if (a.name < z.name) {
          return -sort.value;
        }
        else {
          return 0;
        }
      });
    }
    else {
      tasks.sort((a, z) => {
        if (a.status > z.status) {
          return -sort.value;
        }
        else if (a.status < z.status) {
          return sort.value;
        }
        else {
          return 0;
        }
      });
    }


    var elmTasks = tasks.map((task, index) => {
      return <TaskItem
        key={task.id}
        index={index}
        task={task}
      />
    });

    return (
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr className="text-center">
              <th>STT</th>
              <th>Tên</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center bg-light">
              <td></td>
              <td>
                <input type="text"
                  className="form-control" name="filterName"
                  value={filterName}
                  onChange={this.onChange}
                />
              </td>
              <td>
                <select
                  className="form-control"
                  name="filterStatus"
                  value={filterStatus}
                  onChange={this.onChange}
                >
                  <option value={-1}>Tất cả</option>
                  <option value={0}>Ẩn</option>
                  <option value={1}>Kích hoạt</option>
                </select>
              </td>
              <td></td>
            </tr>

            {/* tr TaskItem */}
            {elmTasks}
            {/* tr TaskItem */}
          </tbody>
        </table>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    filterTable: state.filterTable,
    keyword: state.search,
    sort: state.sort,
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onFilterTable: (filter) => {
      dispatch(actions.filterTask(filter));
    },

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);