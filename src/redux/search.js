/**
 * Search
 */
export const UPDATE_KEY = 'bingo/search/UPDATE_KEY';
export const START = 'bingo/search/START';
export const COMPLETE = 'bingo/search/COMPLETE';
export const RESET = 'bingo/search/RESET';

export const updateKey = key => ({type: UPDATE_KEY, payload: key});
export const start = () => ({type: START});
export const complete = (results) => ({type: COMPLETE, payload: results});
export const reset = () => ({type: RESET});

const initState = {
    key: '',
    results: {
        members: {}
    },
    isTyping: false,
    isComplete: true
};

const reducer = (state = initState, action) => {
    switch (action.type) {
        case UPDATE_KEY:
            return Object.assign({}, state, {key: action.payload, isTyping: true});
        case START:
            return Object.assign({}, state, {isComplete: false, isTyping: false});
        case COMPLETE:
            return Object.assign({}, state, {results: action.payload, isComplete: true});
        case RESET:
            return initState;
        default:
            return state;
    }
};

export default reducer;