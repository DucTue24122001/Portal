import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  TIMESHEET_SEARCH_SORT,
  TIMESHEET_LENGTH,
  TIMESHEET_GETDATA,
  TIMESHEET_BTNLOADING,
  TIMESHEET_LOADING,
} from "./constant/constant";

import {
  getAllApiTable,
  getApiTable,
  getSortTable,
} from "../../api/apiTimesheet";
import { initState } from "./constant/initState";

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case TIMESHEET_SEARCH_SORT: {
      return {
        ...state,
        data: action.payload,
        optionSearch: 1,
      };
    }
    case TIMESHEET_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case TIMESHEET_LENGTH: {
      return {
        ...state,
        length: action.payload.length,
        listMemberComp: action.payload.dataComp,
      };
    }
    case TIMESHEET_GETDATA: {
      return {
        ...state,
        data: action.payload,
        optionSearch: 0,
      };
    }
    case TIMESHEET_BTNLOADING: {
      return {
        ...state,
        btnLoading: action.payload,
      };
    }
    default:
      return state;
  }
};

export const selectTableTimeSheetApI = (params) => async (dispatch) => {
  try {
    const { page, pageSize } = params;
    const data = await getApiTable("apiStaff", page, pageSize);
    dispatch({
      type: TIMESHEET_GETDATA,
      payload: data,
    });
    dispatch({
      type: TIMESHEET_LOADING,
      payload: false,
    });
  } catch (error) {
    dispatch({
      type: TIMESHEET_GETDATA,
      payload: [],
    });
  }
};

export const searchTableTimeSheetApI =
  (value, params, btnLoading) => async (dispatch) => {
    const { Date, Sort, radioBtn } = value;
    const { page, pageSize } = params;
    try {
      if (radioBtn === 1) {
        const data = await getSortTable("apiStaff", Date, Sort, page, pageSize);
        if (btnLoading === true) {
          dispatch({
            type: TIMESHEET_BTNLOADING,
            payload: false,
          });
        }
        dispatch({
          type: TIMESHEET_SEARCH_SORT,
          payload: data,
        });
        dispatch({
          type: TIMESHEET_LOADING,
          payload: false,
        });
      }
    } catch (err) {
      dispatch({
        type: TIMESHEET_SEARCH_SORT,
        payload: [],
      });
    }
  };

export const loadingTableTrue = () => {
  return {
    type: TIMESHEET_LOADING,
    payload: true,
  };
};

export const lengthTableTimeSheetAPI = () => async (dispatch) => {
  try {
    const data = await getAllApiTable("apiStaff");
    const dataComp = [];
    data.map((item) => {
      if (item.compensation !== null) {
        dataComp.push(item);
      }
    });
    dispatch({
      type: TIMESHEET_LENGTH,
      payload: { dataComp: dataComp, length: data.length },
    });
  } catch (error) {
    dispatch({
      type: TIMESHEET_LENGTH,
      payload: [],
    });
  }
};

export const btnLoadingSearch = (value) => async (dispatch) => {
  try {
    dispatch({
      type: TIMESHEET_BTNLOADING,
      payload: value,
    });
  } catch (err) {
    dispatch({
      type: TIMESHEET_BTNLOADING,
      payload: null,
    });
  }
};

const middleware = [thunk];
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
