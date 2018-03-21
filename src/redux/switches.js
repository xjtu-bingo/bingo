/**
 * Global Switches
 */
import {combineReducers} from "redux";

const NumberSwitch = type => ({
    type,
    setter: payload => ({type, payload}),
    reducer: (state = false, action) => action.type === type ? action.payload : state
});


const BooleanSwitch = type => ({
    type,
    setter: payload => ({type, payload}),
    reducer: (state = false, action) => action.type === type ? action.payload : state,
    setTrue: () => ({type, payload: true}),
    setFalse: () => ({type, payload: false}),
});

export const isNavigationExpanded = BooleanSwitch('bingo/switches/NavigationExpanded');
export const isMemberSignUpOpen = BooleanSwitch('bingo/switches/IS_MEMBER_SIGN_UP_OPEN');
export const isMemberTopUpOpen = BooleanSwitch('bingo/switches/IS_MEMBER_TOP_UP_OPEN');
export const appNavigation = NumberSwitch('bingo/switches/APP_NAVIGATION');
export default combineReducers({
    isNavigationExpanded: isNavigationExpanded.reducer,
    isMemberSignUpOpen: isMemberSignUpOpen.reducer,
    isMemberTopUpOpen: isMemberTopUpOpen.reducer,
    appNavigation: appNavigation.reducer
});