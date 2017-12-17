const defaultState = {
    items: []
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'PRODUCT/LOAD':
            return Object.assign({}, state, {items: [...state.items, ...action.payload]});
        default:
            return state;
    }
};

export default reducer;