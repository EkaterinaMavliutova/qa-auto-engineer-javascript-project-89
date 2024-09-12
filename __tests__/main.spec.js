import Widget from "@hexlet/chatbot-v2";
import { render, screen, waitFor } from "@testing-library/react";
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
    // screen.debug();
    const startButton = await screen.findByRole("button", {
      name: /открыть чат/i,
    });

    await userEvent.click(startButton);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeTruthy();
    });
  });

  test('Should be possible to start the conversation', async () => {
    render(<App/>);
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
    render(<App/>);
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
    render(<App/>);
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

  test('rurturt', async () => {
    render(Widget(expectedSteps));
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

describe('Widget integration', () => {
  test('renders to the host app the same way as in an isolation', async () => {
    render(<App />);
    const startButton = await screen.findByRole("button", {
      name: /открыть чат/i,
    });

    await userEvent.click(startButton);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeTruthy();
    });
  });
});
