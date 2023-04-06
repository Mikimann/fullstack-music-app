import { createStore, action } from "easy-peasy";

export const store = createStore({
  // state, what to keep track of.
  activeSongs: [],
  activeSong: null,
  // actions to modify the state.
  changeActiveSongs: action((state: any, payload) => {
    // immutable operation. When calling this function it sends up the new activeSongs
    state.activeSongs = payload;
  }),
  changeActiveSong: action((state: any, payload) => {
    state.activeSong = payload;
  }),
});
