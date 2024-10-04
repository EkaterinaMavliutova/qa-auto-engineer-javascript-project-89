import { render, screen } from "@testing-library/react";
import { setUp } from "./utils.js";
import { vi, test, expect, describe, beforeAll } from 'vitest';
import App from "../src/App.jsx";

let widget;
let form;
let registrationData;

describe('I am container', () => {

  beforeAll(() => {
    Element.prototype.scrollIntoView = vi.fn();
  });
  
  beforeEach(() => {
    ({ widget, form, registrationData } = setUp(screen));
    render(<App />);
  });
  
  test('Widget renders to the host app the same way as in an isolation', async () => {
    await widget.openChatBot();
  
    // expect(await widget.heading).toBeVisible();
    // expect(await widget.welcomeMessage).toBeVisible();
    widget.verifyChatBotIsOpened();
  });
  
  // test('Host app renders whithout errors after Widget integration', async () => {
  //   form.verifyRegistrationFormIsVisible();
  // });
  
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
})
