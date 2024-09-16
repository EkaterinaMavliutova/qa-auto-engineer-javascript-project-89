import Widget from "@hexlet/chatbot-v2";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// import { logRoles } from '@testing-library/dom';
// import { readTestFile } from "./utils.js";
import App from "../src/App.jsx";
import expectedSteps from "../__fixtures__/expectedSteps.js";
import emptySteps from "../__fixtures__/emptySteps.js";
import unsupportedSteps from "../__fixtures__/unsupportedStepsFormat.js";
import { describe, expect } from "@jest/globals";

let mockScroll = '';

beforeAll(() => {
  mockScroll = Element.prototype.scrollIntoView = jest.fn();
});

describe("Widget (positive scenarios)", () => {
  test('Renders whithout errors', async () => {
    render(Widget(expectedSteps));

    const startButton = await screen.findByRole("button", {
      name: /открыть чат/i,
    });

    await userEvent.click(startButton);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeTruthy();
    });
  });

  test('Should be possible to start a conversation', async () => {
    render(Widget(expectedSteps));
    const startButton = await screen.findByRole("button", {
      name: /открыть чат/i,
    });

    await userEvent.click(startButton);
    const newChatButton = await screen.findByRole("button", {
      name: /start conversation/i,
    });
    const welcomeMessage = await screen.findByText(
      /^hello.*to open a chat\.$/i
    );

    await waitFor(() => {
      expect(welcomeMessage).toBeTruthy();
      expect(newChatButton).toBeEnabled();
    });
  });

  test('Close button should return widget to the initial state', async () => {
    render(Widget(expectedSteps));
    const startButton = await screen.findByRole("button", {
      name: /открыть чат/i,
    });

    await userEvent.click(startButton);
    const newChatButton = await screen.findByRole("button", {
      name: /start conversation/i,
    });
    await userEvent.click(newChatButton);

    const closeButton = await screen.findByLabelText("Close");
    await userEvent.click(closeButton);

    waitFor(() => {
      expect(screen.getByRole("dialog")).not.toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /открыть чат/i })
      ).toBeVisible();
      expect(
        screen.getByRole("button", { name: /открыть чат/i })
      ).toBeEnabled();
    });
  });

  test("Scrolls to the bottom when new message appears", async () => {
    render(Widget(expectedSteps));
    const startButton = await screen.findByRole("button", {
      name: /открыть чат/i,
    });

    await userEvent.click(startButton);
    const newChatButton = await screen.findByRole("button", {
      name: /start conversation/i,
    });
    await userEvent.click(newChatButton);

    await waitFor(() => {
      expect(mockScroll).toHaveBeenCalled();
    });
  });
});

describe('Widget (negative scenarios)', () => {
  test('Crashes when unsupportet steps format was passed', async () => {
    expect(() => {
      render(Widget(unsupportedSteps))
    }).toThrow(/e is not iterable/i);

    // await waitFor(() => {
    //   expect(document.body).toBeEmptyDOMElement();
    //   expect(screen.getByRole('button', { name: /открыть чат/i }))
    //     .not.toBeInTheDocument();
    // });
  });

  test('Should not render when unsupportet steps format was passed', async () => {
    let possibleError = '';
    let container2 = document.createElement("div");
    document.body.appendChild(container2);
    try {
      render(Widget(unsupportedSteps), container2)
    } catch (error) {
      possibleError = error.message;
    } finally {
      expect(possibleError).toBeTruthy();
      expect(container2).toBeEmptyDOMElement();
      container2.remove();
      container2 = null;
    }
  });

  test('Should show empty chat window when empty steps array was passed', async () => {
    render(Widget(emptySteps));
    const startButton = await screen.findByRole("button", {
      name: /открыть чат/i,
    });

    await userEvent.click(startButton);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeTruthy();
      expect(screen.queryByRole("button", {
        name: /start conversation/i,
      })).not.toBeInTheDocument();
      expect(screen.queryByText(/^hello.*to open a chat\.$/i))
        .not.toBeInTheDocument();
    });
  });
});

describe('Integration scenarios', () => {
  test('Widget renders to the host app the same way as in an isolation', async () => {
    render(<App />);
    const startButton = await screen.findByRole("button", {
      name: /открыть чат/i,
    });

    await userEvent.click(startButton);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeTruthy();
    });
  });

  test('Host app renders whithout errors after Widget integration', async () => {
    render(<App />);
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Пароль');
    const addressInput = screen.getByLabelText('Адрес');
    const cityInput = screen.getByLabelText('Город');
    const countryInput = screen.getByLabelText('Страна');
    const confirmationCheckBox = screen.getByLabelText('Принять правила');
    const signupButton = screen.getByRole('button', { name: 'Зарегистрироваться' });
    

    await waitFor(() => {
      expect(emailInput).toHaveAttribute('placeholder', 'Email');
      expect(passwordInput).toHaveAttribute('placeholder', 'Пароль');
      expect(addressInput).toHaveAttribute('placeholder', 'Невский проспект, 12');
      expect(cityInput).not.toHaveAttribute('placeholder');
      expect(countryInput).toHaveValue('');
      expect(confirmationCheckBox).not.toBeChecked();
      expect(signupButton).toBeVisible();
      expect(signupButton).toBeEnabled();
    });
  });

  test('It is possible to sign up to host app after Widget integration', async () => {
    render(<App />);
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Пароль');
    const addressInput = screen.getByLabelText('Адрес');
    const cityInput = screen.getByLabelText('Город');
    const countryInput = screen.getByLabelText('Страна');
    const confirmationCheckBox = screen.getByLabelText('Принять правила');
    const signupButton = screen.getByRole('button', { name: 'Зарегистрироваться' });

    await userEvent.type(emailInput, 'email@gmail.com');
    await userEvent.type(passwordInput, 'secretPassword');
    await userEvent.type(addressInput, 'New street, 1');
    await userEvent.type(cityInput, 'London');
    await userEvent.selectOptions(countryInput, 'Аргентина');
    await userEvent.click(confirmationCheckBox);
    await userEvent.click(signupButton);

    const rows = await screen.findAllByRole('row');
    const confirmationRow = within(rows[0]).getAllByRole('cell');
    const addressRow = within(rows[1]).getAllByRole('cell');
    const cityRow = within(rows[2]).getAllByRole('cell');
    const countryRow = within(rows[3]).getAllByRole('cell');
    const emailRow = within(rows[4]).getAllByRole('cell');
    const passwordRow = within(rows[5]).getAllByRole('cell');
    
    expect(confirmationRow[0]).toHaveTextContent('Принять правила');
    expect(confirmationRow[1]).toHaveTextContent('true');
    expect(addressRow[0]).toHaveTextContent('Адрес');
    expect(addressRow[1]).toHaveTextContent('New street, 1');
    expect(cityRow[0]).toHaveTextContent('Город');
    expect(cityRow[1]).toHaveTextContent('London');
    expect(countryRow[0]).toHaveTextContent('Страна');
    expect(countryRow[1]).toHaveTextContent('Аргентина');
    expect(emailRow[0]).toHaveTextContent('Email');
    expect(emailRow[1]).toHaveTextContent('email@gmail.com');
    expect(passwordRow[0]).toHaveTextContent('Пароль');
    expect(passwordRow[1]).toHaveTextContent('secretPassword');
  });
});
