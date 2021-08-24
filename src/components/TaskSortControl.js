import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';


class Sort extends Component {

  onClick = (sortBy, sortValue) => {
    this.props.onSort({
      by: sortBy,
      value: sortValue
    });
  }

  render() {
    var { sort } = this.props;
    let url = "#";
    return (
      <div className="col-md-6">
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Sắp xếp
          </button>

          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a
              href={url}
              role="button"
              className={(sort.by === "name" && sort.value === 1) ? "dropdown-item sort-selected" : "dropdown-item"}
              onClick={() => this.onClick("name", 1)}
            >
              Tên A-Z
            </a>
            <a
              href={url}
              role="button"
              className={(sort.by === "name" && sort.value === -1) ? "dropdown-item sort-selected" : "dropdown-item"}
              onClick={() => this.onClick("name", -1)}
            >
              Tên Z-A</a>
            <hr />
            <a
              href={url}
              role="button"
              className={(sort.by === "status" && sort.value === 1) ? "dropdown-item sort-selected" : "dropdown-item"}
              onClick={() => this.onClick("status", 1)}
            >
              Trang thái: Kích hoạt</a>
            <a
              href={url}
              role="button"
              className={(sort.by === "status" && sort.value === -1) ? "dropdown-item sort-selected" : "dropdown-item"}
              onClick={() => this.onClick("status", -1)}
            >
              Trang thái: Ẩn</a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sort: state.sort
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onSort: (sort) => {
      dispatch(actions.sortTask(sort));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sort);
