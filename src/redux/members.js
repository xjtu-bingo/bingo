const defaultState = {
    member: []
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case "NEW/MEMBER":
            return Object.assign({}, state, {member: [...state.member, action.payload]});
        case "PAYMENT/SUCCESS":
            return Object.assign({}, state, {
                member: state.member.map((v, i) => {
                    if (action.payload.id === v.id) {
                        return Object.assign({}, v, {amount: action.payload.memberAmount})
                    } else {
                        return v;
                    }
                })
            });
        default:
            return state;
    }
};
export default reducer;