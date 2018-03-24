/**
 * Global Switches
 */
import {combineReducers} from "redux";

const ScalarSwitch = init => type => ({
    type,
    setter: payload => ({type, payload}),
    reducer: (state = init, action) => action.type === type ? action.payload : state
});

const NumberSwitch = ScalarSwitch(0);
const StringSwitch = ScalarSwitch("");

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

export const TopUpMemberId = StringSwitch('bingo/switches/TOP_UP_MEMBER_ID');
export const TopUpAmount = NumberSwitch('bingo/switches/TOP_UP_AMOUNT');

export const SelectedOrderId = StringSwitch('bingo/switches/SELECTED_ORDER_ID');
export const SelectedMemberId = StringSwitch('bingo/switches/SELECTED_MEMBER_ID');
export const IsSelectingMember = BooleanSwitch('bingo/switches/IS_SELECTING_MEMBER');

export const IsOrderTotalOverride = BooleanSwitch('bingo/switches/IS_ORDER_TOTAL_OVERRIDE');
export const OrderTotal = NumberSwitch('bingo/switches/ORDER_TOTAL');
export const OrderNote = StringSwitch('bingo/switches/ORDER_NOTE');

export const MenuCategory = StringSwitch('bingo/switches/MENU_CATEGORY');

export default combineReducers({
    isNavigationExpanded: isNavigationExpanded.reducer,
    isMemberSignUpOpen: isMemberSignUpOpen.reducer,
    isMemberTopUpOpen: isMemberTopUpOpen.reducer,
    appNavigation: appNavigation.reducer,
    topUpMemberId: TopUpMemberId.reducer,
    topUpAmount: TopUpAmount.reducer,
    selectedMemberId: SelectedMemberId.reducer,
    isSelectingMember: IsSelectingMember.reducer,
    selectedOrderId: SelectedOrderId.reducer,
    orderTotal: OrderTotal.reducer,
    orderNote: OrderNote.reducer,
    isOrderTotalOverride: IsOrderTotalOverride.reducer,
    menuCategory: MenuCategory.reducer,
});