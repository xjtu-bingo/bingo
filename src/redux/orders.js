const defaultState = {
    curItems: [],
    items: []
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'NEW_ORDER':
            return Object.assign({}, state, {items: [...state.items, action.payload], curItems: []});
        case 'ORDER/EDIT':
            return Object.assign({}, state, {curItems: action.payload});
        default:
            return state;
    }
};

export default reducer;