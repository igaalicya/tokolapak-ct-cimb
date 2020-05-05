const init_state = {
  quantity: 0
};

export default (state = init_state, action) => {
  switch (action.type) {
    case "GET_NUMBER_OF_ITEM":
      return {
        ...state,
        quantity: action.payload
      };
    default:
      return { ...state };
  }
};
