import StoreComponent from './store/storeComponent'
export default class Component {
  constructor(props = {}) {
    this.render = this.render || function () { };
    if (props.store instanceof StoreComponent) {
      // 状态改变就触发页面重新渲染
      props.store.events.subscribe('stateChange', () => this.update());
    }
  }
}