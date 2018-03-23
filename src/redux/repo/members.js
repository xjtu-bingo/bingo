/**
 * Member Repository
 */

// Action Types
const LOAD = 'bingo/members/LOAD';
const CREATE = 'bingo/members/CREATE';
const UPDATE = 'bingo/members/UPDATE';
const REMOVE = 'bingo/members/REMOVE';

// Action Creators
export const loadMembers = (members) => ({type: LOAD, payload: members});
export const createMember = (member) => ({type: CREATE, payload: member});
export const updateMember = (member) => ({type: UPDATE, payload: member});
export const removeMember = (member) => ({type: REMOVE, payload: member});

const mapId = (arr) => {
    let ret = {};
    arr.forEach(v => ret[v.id] = v);
    return ret;
};

const reducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD:
            return Object.assign({}, state, mapId(action.payload));
        case CREATE:
            return Object.assign({}, state, {[action.payload.id]: action.payload});
        case UPDATE: {
            let member = Object.assign({}, state[action.payload.id], action.payload);
            return Object.assign({}, state, {[action.payload.id]: member});
        }
        default:
            return state;
    }
};

export default reducer;