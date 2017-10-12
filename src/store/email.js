const KEYIN_EMAIL = 'USER_EMAIL';

export const keyinEmail = (emailInput) => {
  return {
    type: KEYIN_EMAIL,
    emailInput: emailInput
  }
};

const reducer = (state = '', action) => {
  switch (action.type) {
    case KEYIN_EMAIL:
      return action.emailInput
    default:
      return state
  }
};

export default reducer;
