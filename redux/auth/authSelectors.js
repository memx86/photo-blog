export const getIsAuth = (state) => state.auth.isAuth;
export const getUser = (state) => state.auth.user;
export const getIsLoading = (state) => state.auth.loading.isLoading;
export const getLoadingMessage = (state) => state.auth.loading.message;
export const getIsError = (state) => state.auth.error.isError;
export const getErrorCode = (state) => state.auth.error.code;
