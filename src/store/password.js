const KEYIN_PASSWORD = 'USER_PASSWORD';

export const keyinPassword = (passwordlInput) => {
  return {
    type: KEYIN_PASSWORD,
    passwordInput: passwordlInput
  }
};

const reducer = (state = '', action) => {
  switch (action.type) {
    case KEYIN_PASSWORD:
      return action.passwordInput
    default:
      return state
  }
};

export default reducer;
