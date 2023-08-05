import { ReactForm } from "./react-form.const";

const STATE_DEFAULT = {
  mangSinhVien: JSON.parse(
    localStorage.getItem("reduxStore") ?? JSON.stringify([])
  ),
  svUpdate: null,
};

export const reactFormReducer = (state = STATE_DEFAULT, action) => {
  switch (action.type) {
    case ReactForm.DangKySinhVien: {
      state.mangSinhVien = [...state.mangSinhVien, action.payload];

      localStorage.setItem("reduxStore", JSON.stringify(state.mangSinhVien));

      return { ...state };
    }
    case ReactForm.XoaSinhVien: {
      state.mangSinhVien = state.mangSinhVien.filter(
        (sv) => sv.id !== action.payload.id
      );
      return { ...state };
    }
    case ReactForm.ChinhSuaSinhVien: {
      state.svUpdate = action.payload;

      return { ...state };
    }

    case ReactForm.TimSinhVien: {
      state.mangSinhVien = state.mangSinhVien.filter(
        (sv) => sv.id == action.payload
      );
      return { ...state };
    }

    case ReactForm.HoanThienChinhSua: {
    
      const index = state.mangSinhVien.findIndex(
        (i) => i.id === action.payload.id
      );
      if (index === -1) {
        return { ...state };
      }
     
      state.mangSinhVien[index] = action.payload;
      state.mangSinhVien = [...state.mangSinhVien];

      
      state.svUpdate = null;
      return { ...state };
    }
    default:
      return state;

  }

  
};
