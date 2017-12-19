const defaultState = {
    curItems: [],
    items: [],
    paidItems: [],
    finishedItems: [],
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'NEW_ORDER':
            return Object.assign({}, state, {items: [...state.items, action.payload], curItems: []});
        case 'ORDER/EDIT':
            return Object.assign({}, state, {curItems: action.payload});
        case 'PAY/ORDER':
            return Object.assign({}, state, {
                paidItems: [...state.paidItems, ...state.items.splice(action.payload, 1)],
                items: [...state.items.slice(0, action.payload), ...state.items.slice(action.payload + 1, state.items.length)]
            });
        default:
            return state;
    }
};

export default reducer;