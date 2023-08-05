import React, { Component } from "react";
import { connect } from "react-redux";
import {
  chinhSuaSinhVienCreator,
  xoaSinhVienCreator,
} from "../../../../redux/react-form/react-form.action";
class ListSinhVien extends Component {
  render() {
    return (
      <table className="table mt-10">
        <thead>
          <tr>
            <th scope="col">Mã sinh viên</th>
            <th scope="col">Họ tên</th>
            <th scope="col">Số điện thoại</th>
            <th scope="col">Email</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {this.props.mangSinhVien.map((sv) => {
            return (
              <tr key={sv.id}>
                <th scope="row">{sv.id}</th>
                <td>{sv.name}</td>
                <td>{sv.phone}</td>
                <td>{sv.email}</td>

                <td>
                  <button
                    onClick={() => {
                      if (
                        window.confirm("Bạn có chắc chắn muốn xóa hay không?")
                      ) {
                        this.props.dispatch(
                          xoaSinhVienCreator({
                            id: sv.id,
                          })
                        );
                      }
                    }}
                    className="btn btn-danger mx-2"
                  >
                    Xóa
                  </button>
                  <button
                    onClick={() => {
                      this.props.dispatch(chinhSuaSinhVienCreator(sv));
                    }}
                    className="btn btn-warning"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  componentWillUnmount() {
    console.log("ListSinhVien - unmount");
  }
}

const mapStateToProps = (rootReducer) => {
  return {
    mangSinhVien: rootReducer.reactFormReducer.mangSinhVien,
  };
};

export default connect(mapStateToProps)(ListSinhVien);
