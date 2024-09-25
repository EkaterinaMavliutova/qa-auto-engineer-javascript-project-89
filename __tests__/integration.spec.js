import { render } from "@testing-library/react";
import { setUp } from "./utils.js";
import App from "../src/App.jsx";

let widget;
let form;
let registrationData;

beforeAll(() => {
  Element.prototype.scrollIntoView = jest.fn();
});

beforeEach(() => {
  ({ widget, form, registrationData } = setUp());
  render(<App />);
});

test('Widget renders to the host app the same way as in an isolation', async () => {
  await widget.openChatBot();

  expect(await widget.heading).toBeVisible();
  expect(await widget.welcomeMessage).toBeVisible();
});

test('Host app renders whithout errors after Widget integration', async () => {
  expect(await form.emailInput).toHaveAttribute('placeholder', 'Email');
  expect(await form.passwordInput).toHaveAttribute('placeholder', 'Пароль');
  expect(await form.addressInput).toHaveAttribute('placeholder', 'Невский проспект, 12');
  expect(await form.cityInput).not.toHaveAttribute('placeholder');
  expect(await form.countryInput).toHaveValue('');
  expect(await form.confirmationCheckBox).not.toBeChecked();
  expect(await form.signupButton).toBeVisible();
  expect(await form.signupButton).toBeEnabled();
});

test('It is possible to sign up to host app after Widget integration', async () => {
  const { email, password, address, city, country, confirmationCheckBox } = registrationData;
  const titlesDataMap = {
    'Email': email,
    'Пароль': password,
    'Адрес': address,
    'Город': city,
    'Страна': country,
    'Принять правила': confirmationCheckBox,
  };

  await form.fillForm(registrationData);
  await form.submitForm();
  const rows = form.getTableRows();

  rows.forEach((row) => {  
    const cells = form.getCellsInRow(row);
    const title = cells[0].textContent;
    const value = cells[1].textContent;
    expect(titlesDataMap).toHaveProperty(title); 
    expect(value).toEqual(titlesDataMap[title]);
  });
});
