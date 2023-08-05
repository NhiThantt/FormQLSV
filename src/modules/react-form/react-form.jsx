import React, { Component } from "react";
import FormDangKy from "./components/form-dang-ky/form-dang-ky";
import ListSinhVien from "./components/list-product/table-sinhvien";

// export :::: tên
export class ReactForm extends Component {
  render() {
    
    return (
      <div className="container">
        <h1 className="text-blue-500 text-[30px] text-center p-4">FORM QUẢN LÝ SINH VIÊN</h1>
        <FormDangKy />
        <ListSinhVien />
      </div>
    );
  }
}
