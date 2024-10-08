import { render, screen } from "@testing-library/react";
import setUp from "./utils.js";
import { vi, test, expect, beforeAll } from 'vitest';
import '@testing-library/jest-dom';
import App from "../src/App.jsx";

let widget;
let form;
let registrationData;

beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

  test('Widget renders to the host app the same way as in an isolation', async () => {
    ({ widget } = setUp(screen));
    render(<App />);

    await widget.openChatBot();

    widget.verifyChatBotIsOpened();
  });

  test('It is possible to sign up to host app after Widget integration', async () => {
    ({ widget, form, registrationData } = setUp(screen));
    render(<App />);
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

    rows.forEach(({ cells }) => {
      const title = cells[0].textContent;
      const value = cells[1].textContent;
      expect(titlesDataMap).toHaveProperty(title);
      expect(value).toEqual(titlesDataMap[title]);
    });
  });
