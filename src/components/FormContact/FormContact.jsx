import { Component } from 'react';
import css from '../../components/phonebook.module.css';
import { v4 as uuidv4 } from 'uuid';
export class FormContact extends Component {
  state = {
    name: '',
    number: '',
  };

  hanldeChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  hanldeSubmit = event => {
    event.preventDefault();
    const contact = {
      id: uuidv4(),
      name: this.state.name,
      number: this.state.number,
    };

    this.props.onSubmit(contact);

    this.resetForm();
  };

  resetForm = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <div className={css.form__container}>
        <form onSubmit={this.hanldeSubmit}>
          <label>
            <p className={css.input__description}>Name</p>
            <input
              className={css.form__input}
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.hanldeChange}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
              required
            />
          </label>
          <label>
            <p className={css.input__description}>Number</p>
            <input
              className={css.form__input}
              type="tel"
              name="number"
              value={this.state.number}
              onChange={this.hanldeChange}
              pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
              title="Номер телефона должен состоять из 11-12 цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +"
              required
            />
          </label>
          <div>
            <button className={css.add__button} type="submit">
              Add contact
            </button>
          </div>
        </form>
      </div>
    );
  }
}
