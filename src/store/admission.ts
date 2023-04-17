import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllBlocks } from "../apiRoutes/chiefWarden";
import { fetchmealPlansAdmission } from "../apiRoutes/staff";

const initialState = {
  student: {},
  hostel: {},
} as IAdmissionSlice;

interface IAdmissionSlice {
  student: any;
  hostel: any;
}

// Current slice
export const admissionSlice = createSlice({
  name: "AdmissionSlice",
  initialState,
  reducers: {
    studentDetails(state, action) {
      state.student = action.payload;
    },
    addBlock(state, action) {
      state.student.blockId = action.payload._id;
      state.hostel.selectedBlock = action.payload;
    },
    addRoom(state, action) {
      state.student.room = action.payload;
    },
    addMealPlan(state, action) {
      state.student.mealPlan = action.payload;
    },
    complete() {
      // removeLocalData();
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBlocksData.fulfilled, (state, action) => {
        return { ...state, hostel: { blocks: action.payload } };
      })
      .addCase(fetchActiveMealPlans.fulfilled, (state, action) => {
        return { ...state, hostel: { mealPlans: action.payload } };
      });
  },
});

export const admissionActions = admissionSlice.actions;

// Redux Thunks
// Fetching blocks and rooms
export const fetchBlocksData = createAsyncThunk(
  "AdmissionSlice/fetchBlocksData",
  async () => {
    const {
      data: { data },
    } = await fetchAllBlocks();
    return data;
  }
);

// Fetching active meal plans
export const fetchActiveMealPlans = createAsyncThunk(
  "AdmissionSlice/fetchActiveMealPlans",
  async () => {
    const {
      data: { data },
    } = await fetchmealPlansAdmission();
    return data;
  }
);
