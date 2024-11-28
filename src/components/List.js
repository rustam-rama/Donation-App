import { Component } from '../core/Component';

export class List extends Component {
  setup(props) {
    this.props = props;

    this.$rootElement = document.createElement('div');
    this.$rootElement.className = 'donates-container';

    const title = document.createElement('h2');
    title.className = 'donates-container__title';
    title.textContent = 'Список донатов';
  
    const donatesContainer = document.createElement('div');
    donatesContainer.className = 'donates-container__donates';
  
    this.$rootElement.append(title, donatesContainer);
    this.$donatesContainer = donatesContainer;
  }

  addItem(item) {
    item.setDeleteHandler(() => {
      this.removeItem(item);
    });
    this.$donatesContainer.appendChild(item.$rootElement);
  }

  removeItem(item) {
    this.$donatesContainer.removeChild(item.$rootElement);
    this.props.onDelete(item);
  }
}