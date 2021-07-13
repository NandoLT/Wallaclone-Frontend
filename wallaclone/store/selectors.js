export const getIsLogged = state => !!state.auth;
export const getIsLoading = state => state.ui.loading;
export const getError = state => state.ui.error;
export const getAdverts = state => state.adverts
