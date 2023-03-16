export const getLocalStorage = (user) => {
  let storageCart = localStorage.getItem("cart");
  let index = -1;
  let storages = null;
  if (storageCart) {
    storages = JSON.parse(storageCart);
    let findUser = storages.findIndex((storage) => storage.user === user.email);
    index = findUser;
  }
  return { index, storages };
};
