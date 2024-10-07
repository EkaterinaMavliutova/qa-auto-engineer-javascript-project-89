import { within, expect } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export default class RegistrationForm {
  constructor(screen) {
    this.screen = screen;
    this.user = userEvent.setup();
  }

  async fillForm({
    email,
    password,
    address,
    city,
    country,
    confirmationCheckBox,
  }) {
    this.emailInput = this.screen.getByLabelText('Email');
    this.passwordInput = this.screen.getByLabelText('Пароль');
    this.addressInput = this.screen.getByLabelText('Адрес');
    this.cityInput = this.screen.getByLabelText('Город');
    this.countryInput = this.screen.getByLabelText('Страна');
    this.confirmationCheckBox = this.screen.getByLabelText('Принять правила');
    this.signupButton = this.screen.getByRole('button', { name: 'Зарегистрироваться' });

    await this.user.type(this.emailInput, email);
    await this.user.type(this.passwordInput, password);
    await this.user.type(this.addressInput, address);
    await this.user.type(this.cityInput, city);
    await this.user.selectOptions(this.countryInput, country);
    if (confirmationCheckBox === 'true') {
      await this.user.click(this.confirmationCheckBox);
    }
  }

  async submitForm() {
    await this.user.click(this.signupButton);
  }

  getTableRows() {
    const rows = this.screen.getAllByRole('row');
    return rows.map((row) => ({
      cells: within(row).getAllByRole('cell'),
    }));
  }

  verifyRegistrationFormIsVisible() {
    expect(this.emailInput).toHaveAttribute('placeholder', 'Email');
    expect(this.passwordInput).toHaveAttribute('placeholder', 'Пароль');
    expect(this.addressInput).toHaveAttribute('placeholder', 'Невский проспект, 12');
    expect(this.cityInput).not.toHaveAttribute('placeholder');
    expect(this.countryInput).toHaveValue('');
    expect(this.confirmationCheckBox).not.toBeChecked();
    expect(this.signupButton).toBeVisible();
    expect(this.signupButton).toBeEnabled();
  }
}
