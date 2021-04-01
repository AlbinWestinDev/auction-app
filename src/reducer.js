export const initialState = {
  basket: [],
  loggedinuser: null,
};
const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_LOGIN":
      return {
        ...state,
        loggedinuser: action.user,
      };
  }
};
export default reducer;
