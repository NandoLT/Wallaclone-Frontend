

export const getIsLogged = state => !!state.auth;
export const getIsLoading = state => !!state.loading;
export const getError = state => !!state.error;