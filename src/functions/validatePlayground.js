export const validatePlayground = (code, name, owner, user) => {
  const errors = [];
  const isThereCode = (code) => {
    return code.html !== "" || code.css !== "" || code.javascript !== "";
  };
  const isThereName = (name) => {
    return !name || name === "" ? false : true;
  };
  const isSameOwner = (owner, user) => {
    return owner && owner !== user.email ? false : true;
  };
  if (!isThereCode(code)) {
    errors.push("Please enter some code");
  }
  if (!isThereName(name)) {
    errors.push("Please enter a name for your playground");
  }
  if (!isSameOwner(owner, user)) {
    errors.push("You are not the owner of this playground");
  }
  return errors;
};
