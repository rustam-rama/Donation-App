import { Component } from '../core/Component';

export class ListItem extends Component {
  setup(props) {
    this.state = {
      id: Date.now(),
      date: new Date(),
      amount: props.amount
    };

    this.$rootElement = document.createElement('div');
    this.$rootElement.className = 'donate-item';

    const dateFormat = new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });

    this.$rootElement.innerHTML = `${dateFormat.format(this.state.date)} - <b>$${this.state.amount}</b>`;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';  
    deleteButton.textContent = 'Удалить';
    deleteButton.addEventListener('click', this.onDelete.bind(this));
    this.$rootElement.appendChild(deleteButton);
  }

  onDelete() {
    if (this.deleteHandler) {
      this.deleteHandler();
    }
  }

  setDeleteHandler(handler) {
    this.deleteHandler = handler;
  }
}