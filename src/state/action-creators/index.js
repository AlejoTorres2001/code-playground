export const setCode = (code, language) => {
  return (dispatch) => {
    dispatch({
      type: "UPDATE_" + language.toUpperCase(),
      payload: code,
    });
  };
};
