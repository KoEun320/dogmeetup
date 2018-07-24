import { INITAIL_SETTING } from "../constants";

export const updateInitialSettingAction = test => ({
  type: INITAIL_SETTING,
  initialSetting: test
});
