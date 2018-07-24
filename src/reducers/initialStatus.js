import { INITAIL_SETTING } from "../constants";

const initialSettingReducer = (state = null, action) => {
  switch (action.type) {
    case INITAIL_SETTING:
      return action.initialSetting;
    default:
      return state;
  }
};

export default initialSettingReducer;
