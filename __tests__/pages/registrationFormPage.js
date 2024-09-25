import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export class RegistrationForm{
  constructor() {
    this.emailInput = screen.findByLabelText('Email');
    this.passwordInput = screen.findByLabelText('Пароль');
    this.addressInput = screen.findByLabelText('Адрес');
    this.cityInput = screen.findByLabelText('Город');
    this.countryInput = screen.findByLabelText('Страна');
    this.confirmationCheckBox = screen.findByLabelText('Принять правила');
    this.signupButton = screen.findByRole('button', { name: 'Зарегистрироваться' });
  }

  async fillForm({ email, password, address, city, country, confirmationCheckBox }) {
    await userEvent.type(await this.emailInput, email);
    await userEvent.type(await this.passwordInput, password);
    await userEvent.type(await this.addressInput, address);
    await userEvent.type(await this.cityInput, city);
    await userEvent.selectOptions(await this.countryInput, country);
    if (confirmationCheckBox === 'true') {
      await userEvent.click(await this.confirmationCheckBox);
    }
  }

  async submitForm() {
    await userEvent.click(await this.signupButton);
  }

  getTableRows() {
    return screen.getAllByRole('row');
  }

  getCellsInRow(row) {
    return within(row).getAllByRole('cell');
  }
};
