export default (state = 0, action) => {
  if (action.type === 'pretty') {
    return { name: 'suman' };
  }
  return state;
};
