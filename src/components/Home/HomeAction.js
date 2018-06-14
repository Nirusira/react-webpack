
const home = (state = null, actions) => {
  switch (actions.type) {
    case 'test':
      return { ...state, test: 'test' };
    default:
      return state;
  }
};

export default home;
