export function sessionReducer(state = {
  session: !!localStorage.jwt,
  user: {},
  error: "",
}, action) {
  switch(action.type) {
    case 'AUTH_ERROR':
      return Object.assign({}, state, { error: action.payload });

    case 'CLEAR_AUTH_ERROR':
      return Object.assign({}, state, { error: "" });

    case 'LOAD_USER_TRAITS':
      return Object.assign({}, state, {
        user: JSON.parse(localStorage.user),
      });

    case 'SIGN_UP_SUCCESS':
      return Object.assign(
        {}, state, {
          session: !!localStorage.jwt,
          user: {
            id: action.payload.id,
            email: action.payload.email,
            name: action.payload.name,
          },
          error: "",
        }
      );

    case 'SIGN_IN_SUCCESS':
      return Object.assign(
        {}, state, {
          session: !!localStorage.jwt,
          user: {
            id: action.payload.id,
            email: action.payload.email,
            name: action.payload.name,
          },
          error: "",
        }
      );

    case 'SIGN_OUT':
      return Object.assign(
        {}, state, {session: !!localStorage.jwt, user: {}}
      );

    default:
      return state;
  }
}
