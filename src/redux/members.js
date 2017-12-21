const defaultState = {
    member: []
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case "NEW/MEMBER":
            return Object.assign({}, state, {member: [...state.items, action.payload]});
        default:
            return state;
    }
};
export default reducer;