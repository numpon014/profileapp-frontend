const getItem = key => localStorage.getItem(key);

const setItem = (key, value) => {
  localStorage.setItem(key, value);
};

const removeItem = key => {
  localStorage.removeItem(key);
};

export { getItem, setItem, removeItem };
