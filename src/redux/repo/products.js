const mapId = (arr) => {
    let ret = {};
    arr.forEach(v => ret[v.id] = v);
    return ret;
};

const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'PRODUCT/LOAD':
            return Object.assign({}, state, mapId(action.payload));
        default:
            return state;
    }
};

export default reducer;