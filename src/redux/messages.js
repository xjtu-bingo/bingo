/**
 * Messages Queue
 */
const MQ_I = 'bingo/messages/MQ_I';
const MQ_O = 'bingo/messages/MQ_O';

export const iMQ = msg => ({type: MQ_I, payload: msg});
export const oMQ = () => ({type: MQ_O});

const reducer = (state = [], action) => {
    switch (action.type) {
        case MQ_I:
            return state.concat(action.payload);
        case MQ_O:
            return [...state.slice(1)];
        default:
            return state;
    }
};

export default reducer;