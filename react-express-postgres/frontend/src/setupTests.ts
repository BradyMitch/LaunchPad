const localStorageMock = (() => {
  let store: any = {};

  return {
    getKeys: () => {
      return store;
    },
    getItem: (key: string) => {
      return store[key] || null;
    },
    setItem: (key: string, value: any) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      store[key] = undefined;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

export default {};
