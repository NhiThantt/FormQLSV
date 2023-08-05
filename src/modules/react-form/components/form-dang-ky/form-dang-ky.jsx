import React, { Component } from "react";
import { connect } from "react-redux";
import {
  dangKySVCreator,
  hoanThienChinhSuaCreator,
} from "../../../../redux/react-form/react-form.action";
const MAPPER = {
  id: "Id",
  phone: "Phone",
  name: "Name",
  email: "Email",
};

class FormDangKy extends Component {
  state = {
    value: {
      id: "",
      phone: "",
      name: "",
      email: "",
    },
    touch: {
      id: false,
      phone: false,
      name: false,
      email: false,
    },
    error: {
      id: "",
      phone: "",
      name: "",
      price: "",
    },
  };

  handleChange = (event) => {
    const { value, id, name, className } = event.target;

    // validate
    let newError = {};
    for (const key in this.state.touch) {
      if (this.state.touch[key]) {
        const __value = key === id ? value : this.state.value[key];

        switch (key) {
          case "id": {
            if (/^\d*$/.test(__value) === false) {
              newError[key] = "Id phải là số.";
            }
            break;
          }
          case "email": {
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (regex.test(__value) === false) {
              newError[key] = "Email không hợp lệ.";
            }
            break;
          }
          case "phone": {
            const regex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
            if (regex.test(__value) === false) {
              newError[key] = "Phone không hợp lệ.";
            }
            break;
          }

          case "name": {
            if (__value.length > 30) {
              newError[key] = "Name quá dài. Chỉ cho phép 30 ký tự.";
            }
            break;
          }
          default: {
            break;
          }
        }

        if (__value.length === 0) {
          newError[key] = MAPPER[key] + " không được bỏ trống";
        }
      }
    }

    this.setState({
      value: {
        ...this.state.value,
        [id]: value,
      },
      error: newError,
    });
  };

  handleFocus = (event) => {
    const { id } = event.target;

    this.setState({
      touch: {
        ...this.state.touch,
        [id]: true,
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    for (const key in this.state.value) {
      // phải được nhập đầy đủ.
      if (this.state.value[key].length === 0) {
        return;
      }

      if (this.state.error[key]?.length > 0) {
        alert(this.state.error[key]);

        return;
      }
    }


     const creator = this.props.svUpdate
      ? hoanThienChinhSuaCreator
      : dangKySVCreator;

    this.props.dispatch(creator(this.state.value));

    this.setState({
      value: {
        id: "",
        phone: "",
        name: "",
        email: "",
      },
    });
  };

  static getDerivedStateFromProps(newProps, currentState) {
    console.log({ newProps, currentState });

    if (newProps.svUpdate) {
      if (newProps.svUpdate?.id !== currentState.value?.id) {
        return {
          ...currentState,

          value: newProps.svUpdate,
        };
      }
    }

    return null;
  }

  render() {
     return (
      <form onSubmit={this.handleSubmit} className="g-3">
        <div className="row">
          <div className="col-6">
            <div>
              <label htmlFor="id">Mã sinh viên</label>
              <input
                name="Id"
                onFocus={this.handleFocus}
                onChange={this.handleChange}
                value={this.state.value?.id}
                type="text"
                className="form-control"
                id="id"
                placeholder=""
              />
              {this.state.touch?.id && this.state.error?.id && (
                <p className="text-red-500">{this.state.error?.id}</p>
              )}
            </div>
            <div className="mt-3">
              <label htmlFor="phone">Số điện thoại</label>
              <input
                name="Phone"
                onFocus={this.handleFocus}
                value={this.state.value?.phone}
                onChange={this.handleChange}
                type="text"
                className="form-control"
                id="phone"
                placeholder=""
              />
              {this.state.touch?.phone && this.state.error?.phone && (
                <p className="text-red-500">{this.state.error?.phone}</p>
              )}
            </div>
          </div>
          <div className="col-6">
            <div>
              <label htmlFor="name">Họ tên</label>
              <input
                name="Name"
                value={this.state.value?.name}
                onFocus={this.handleFocus}
                onChange={this.handleChange}
                type="text"
                className="form-control"
                id="name"
                placeholder=""
              />
              {this.state.touch?.name && this.state.error?.name && (
                <p className="text-red-500">{this.state.error?.name}</p>
              )}
            </div>

            <div className="mt-3">
              <label htmlFor="email">Email</label>
              <input
                name="Email"
                onFocus={this.handleFocus}
                onChange={this.handleChange}
                type="text"
                className="form-control"
                id="email"
                placeholder=""
                value={this.state.value?.email}
              />
              {this.state.touch?.email && this.state.error?.email && (
                <p className="text-red-500">{this.state.error?.email}</p>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-4 mt-4">
            {this.props.svUpdate ? (
              <button className="btn btn-success ">Cập Nhật</button>
            ) : (
              <button className="btn btn-success ">Thêm sinh viên</button>
            )}
          </div>
          <div className="col-8 mt-4">
            <input
              placeholder="Nhập mã SV cần tìm"
              type="text"
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:bg-transparent focus:ring-indigo-100 focus:border-indigo-500 text-base outline-none py-1 px-3  transition-colors duration-200 ease-in-out"
              onChange={() => {
                this.props.dispatch(timKiemSinhVienCreator({
                  id: sv.id,
                })
                );
              }}
            />
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (rootReducer) => {
  return {
    svUpdate: rootReducer.reactFormReducer.svUpdate,
  };
};

export default connect(mapStateToProps)(FormDangKy);
