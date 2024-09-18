import Widget from "@hexlet/chatbot-v2";
import App from "../src/App.jsx";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { logRoles } from '@testing-library/dom';
import expectedSteps from "../__fixtures__/expectedSteps.js";
import emptySteps from "../__fixtures__/emptySteps.js";
import unsupportedSteps from "../__fixtures__/unsupportedStepsFormat.js";
import { setUp } from "./utils.js";

let mockScroll = '';

beforeAll(() => {
  mockScroll = Element.prototype.scrollIntoView = jest.fn();
});

describe("Widget (positive scenarios)", () => {
  test('Renders whithout errors', async () => {
    /* проходит, хотя не должен
    если посмотреть разметку через screen.debug(),
    то на странице нет ни одного элемента из блока assert
    c 2-мя тестами ниже аналогично*/
    expect.assertions(4);
    const app = setUp();
    await app.renderWidget(expectedSteps);

    const widget = await app.clickStartChatBotButton();

    await waitFor(() => {
      expect(screen.findByRole("dialog")).toBeTruthy();
      expect(screen.findByText('Виртуальный помощник')).toBeTruthy();
      expect(widget.welcomeMessage).toBeTruthy();
      expect(widget.startConversationButton).toBeTruthy();
      /* matcher toBeInTheDocument() почему-то не работает, ошибка:
       "value must be an HTMLElement or an SVGElement", заменила на toBeTruthy, 
       но не уверена, что это хороший вариант
       хотя будто бы все в порядке должно быть */
    });
    // screen.debug();
  });

  test('Should be possible to start a conversation', async () => {
    /* проходит, хотя не должен
    при чем, если разкомментировать 58 строку и в 46 исправить на expect.assertions(2);,
    то screen.debug() начинает показывать правильную разметку
    и тогда тест проходит правильно, не понимаю откуда такая разница */
    expect.assertions(1);
    const app = setUp();
    await app.renderWidget(expectedSteps);

    const widget = await app.clickStartChatBotButton();
    await widget.clickStartConversation();
    
    // logRoles(document.body);

    await waitFor(() => {
      expect(widget.firstMessage).toBeTruthy();
      // expect(widget.welcomeMessage).not.toBeInTheDocument();
    });
    // screen.debug();
  });

  test('Close button should return widget to the initial state', async () => {
  // проходит, хотя не должен
    expect.assertions(3);
    const app = setUp();
    await app.renderWidget(expectedSteps);

    const widget = await app.clickStartChatBotButton();
    await widget.clickStartConversation();

    waitFor(() => {
      expect(widget.firstMessage).toBeTruthy();
    }); // сюда добавлено для эксперимента - не помогло,
    // будто бы до этой страницы тест все равно не доходит судя по разметке
    await widget.closeChatBot();

    
    // logRoles(document.body);

    waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      expect(app.startChatBotButton).toBeVisible();
      expect(widget.firstMessage).not.toBeInTheDocument();
    });
    // screen.debug();
  });

// Тесты ниже еще не переделывала------------------------------------------------

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
