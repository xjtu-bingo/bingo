/**
 * Global Switches
 */
import {combineReducers} from "redux";

const BooleanSwitch = type => ({
    type,
    setter: payload => ({type, payload}),
    setTrue: () => ({type, payload: true}),
    setFalse: () => ({type, payload: false}),
    reducer: (state = false, action) => action.type === type ? action.payload : state
});

export const isNavigationExpanded = BooleanSwitch('bingo/switches/NavigationExpanded');

const NAVIGATE = 'bingo/switches/NAVIGATE';

export const navigate = (page) => ({type: NAVIGATE, payload: page});

const reducer = (state = 0, action) => {
    switch (action.type) {
        case NAVIGATE:
            return action.payload;
        default:
            return state;
    }
};

export default combineReducers({
    navigate: reducer,
    isNavigationExpanded: isNavigationExpanded.reducer
});