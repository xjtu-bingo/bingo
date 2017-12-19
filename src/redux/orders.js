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
                paidItems: [...state.paidItems, {
                    ...state.items[action.payload.index],
                    payment: action.payload.payment
                }],
                items: [...state.items.slice(0, action.payload.index), ...state.items.slice(action.payload.index + 1, state.items.length)]
            });
        case 'FINISH/ORDER':
            return Object.assign({}, state, {
                finishedItems: [...state.finishedItems, state.paidItems[action.payload]],
                paidItems: [...state.paidItems.slice(0, action.payload), ...state.paidItems.slice(action.payload + 1, state.paidItems.length)]
            });
        case 'CANCEL/ORDER':
            return Object.assign({}, state, {items: [...state.items.slice(0, action.payload), ...state.items.slice(action.payload + 1, state.items.length)]});
        default:
            return state;
    }
};

export default reducer;