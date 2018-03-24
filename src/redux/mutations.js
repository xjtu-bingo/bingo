/**
 * GraphQL Mutations
 */
export const CREATE_MEMBER = 'bingo/mutations/CREATE_MEMBER';
export const UPDATE_MEMBER = 'bingo/mutations/UPDATE_MEMBER';
export const UPDATE_MEMBER_BALANCE_TOPUP = 'bingo/mutations/UPDATE_MEMBER_BALANCE_TOPUP';
export const CREATE_ORDER = 'bingo/mutations/CREATE_ORDER';
export const UPDATE_ORDER_MEMBER = 'bingo/mutations/UPDATE_ORDER_MEMBER';
export const UPDATE_ORDER_STATUS = 'bingo/mutations/UPDATE_ORDER_STATUS';
export const CREATE_PRODUCT = 'bingo/mutations/CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'bingo/mutations/UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'bingo/mutations/DELETE_PRODUCT';

const action = type => payload => ({type, payload});

export const createMember = action(CREATE_MEMBER);
export const updateMember = action(UPDATE_MEMBER);
export const updateMemberBalanceTopup = action(UPDATE_MEMBER_BALANCE_TOPUP);
export const createOrder = action(CREATE_ORDER);
export const updateOrderMember = action(UPDATE_ORDER_MEMBER);
export const updateOrderStatus = action(UPDATE_ORDER_STATUS);
export const createProduct = action(CREATE_PRODUCT);
export const updateProduct = action(UPDATE_PRODUCT);
export const deleteProduct = action(DELETE_PRODUCT);
