import { ReactForm } from "./react-form.const";

export const dangKySVCreator = (payload) => {
  return {
    type: ReactForm.DangKySinhVien,
    payload,
  };
};

export const xoaSinhVienCreator = (payload) => {
  return {
    type: ReactForm.XoaSinhVien,
    payload,
  };
};

export const chinhSuaSinhVienCreator = (payload) => {
  return {
    type: ReactForm.ChinhSuaSinhVien,
    payload,
  };
};

export const hoanThienChinhSuaCreator = (payload) => {
  return {
    type: ReactForm.HoanThienChinhSua,
    payload,
  };
};

export const timKiemSinhVienCreator = (payload) => {
  return {
    type: ReactForm.TimSinhVien,
    payload,
  };
};
