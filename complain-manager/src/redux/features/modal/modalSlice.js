import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  complainCreateModalOpen: false,
  userDeleteModalOpen: false,
  userEditModalOpen: false,
  userCreateModalOpen: false,

  complainEditModalOpen: false,
  complainStatusDoneModalOpen: false,
  historyDeleteModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    //  create Complain
    SetComplainCreateModalOpen: (state, action) => {
      state.complainCreateModalOpen = action.payload;
    },

    //  user modal open
    SetUserDeleteModalOpen: (state, action) => {
      state.userDeleteModalOpen = action.payload;
    },
    SetUserEditModalOpen: (state, action) => {
      state.userEditModalOpen = action.payload;
    },
    SetUserCreateModalOpen: (state, action) => {
      state.userCreateModalOpen = action.payload;
    },

    //  complain edit modal open
    SetComplainEditModalOpen: (state, action) => {
      state.complainEditModalOpen = action.payload;
    },
    //  complain status done modal open
    SetComplainStatusDoneModalOpen: (state, action) => {
      state.complainStatusDoneModalOpen = action.payload;
    },

    //  history delete modal open
    SetHistoryDeleteModalOpen: (state, action) => {
      state.historyDeleteModalOpen = action.payload;
    },
  },
});

export const {
  SetComplainCreateModalOpen,
  SetComplainDeleteModalOpen,
  SetComplainEditModalOpen,
  SetComplainStatusDoneModalOpen,
  SetHistoryDeleteModalOpen,
} = modalSlice.actions;

const modalSliceReducer = modalSlice.reducer;
export default modalSliceReducer;
