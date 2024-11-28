import { Component } from '../core/Component';
import { Form } from './Form';
import { List } from './List';
import { ListItem } from './ListItem';

export class App extends Component {
  setup() {
    this.state = {
      donates: []
    };

    this.$rootElement = document.createElement('div');
    this.$rootElement.className = 'app';

    const headerElement = document.createElement('div');
    headerElement.className = 'app-header';

    const totalAmount = document.createElement('h1');
    totalAmount.className = 'total-amount';
    totalAmount.innerHTML = 'Итого: $<span>0</span>';
    this.$totalAmount = totalAmount.querySelector('span');
    headerElement.appendChild(totalAmount);

    const donateForm = new Form({
      onSubmit: this.onItemCreate.bind(this)
    });
    headerElement.appendChild(donateForm.$rootElement);

    this.$rootElement.appendChild(headerElement);

    this.donateList = new List({
      onDelete: this.onItemDelete.bind(this)
    });
    this.$rootElement.appendChild(this.donateList.$rootElement);
  }

  onItemCreate(amount) {
    const item = new ListItem({
      amount: amount
    });
    this.state.donates.push(item);
    this.donateList.addItem(item);
    this.updateTotalAmount();
  }

  onItemDelete(item) {
    const index = this.state.donates.findIndex(donate => donate === item);
    if (index !== -1) {
      this.state.donates.splice(index, 1);
    }
    this.updateTotalAmount();
  }

  updateTotalAmount() {
    const total = this.state.donates.reduce((sum, item) => sum + item.state.amount, 0);
    this.$totalAmount.textContent = total;
  }
}