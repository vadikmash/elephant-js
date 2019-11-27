export default class StateObject {
  constructor () {
    this.state = {};
  }

  setState (newState) {
    this.state = Object.assign(this.state, newState);
  }
}