import { waitFor, render, waitForElementToBeRemoved, screen } from "@testing-library/react";
import { setUp } from "./utils.js";
import { jest } from "@jest/globals";
import Widget from "@hexlet/chatbot-v2";

let mockScroll;
let widget;
let steps;

beforeAll(() => {
  mockScroll = Element.prototype.scrollIntoView = jest.fn();
});

describe('Positive scenarios', () => {
  beforeEach(() => {
    ({ widget, steps } = setUp());
    render(Widget(steps.expectedSteps));
  });

  test('Renders whithout errors', async () => {
    await widget.openChatBot();

    expect(await widget.heading).toBeTruthy();
    expect(await widget.welcomeMessage).toBeTruthy();
    expect(await widget.startConversationButton).toBeTruthy();
  });

  test('Should be possible to start a conversation', async () => {
    await widget.openChatBot();
    await widget.startConversation();

    waitForElementToBeRemoved(await widget.welcomeMessage);
    expect(await widget.firstMessage).toBeTruthy();
  });

  test('Close button should return widget to the initial state', async () => {
    await widget.openChatBot();
    await widget.startConversation();
    
    await widget.closeChatBot();
    
    expect(await widget.heading).not.toBeInTheDocument();
    expect(await widget.firstMessage).not.toBeInTheDocument();
    expect(await widget.startChatBotButton).toBeVisible();
  });

  test("Scrolls to the bottom when new message appears", async () => {
    await widget.openChatBot();
    await widget.startConversation();

    expect(mockScroll).toHaveBeenCalled();
  });
});

describe('Negative scenarios)', () => {
  beforeEach(() => {
    ({ widget, steps } = setUp());
  });
  test('Crashes when unsupportet steps format was passed', async () => {
    await waitFor(() => {
      expect(() => {
        render(Widget(steps.unsupportedSteps));
      }).toThrow(/e is not iterable/i)
    });
  });

  test('Should not render when unsupportet steps format was passed', async () => {
    let possibleError = '';

    try {
      render(Widget(steps.unsupportedSteps));
    } catch (error) {
      possibleError = error.message;
    } finally {
      expect(possibleError).toBeTruthy();
      expect(document.body).toBeEmptyDOMElement();
      expect(screen.queryByRole('button', { name: 'Start conversation' })).not.toBeInTheDocument();
    }
  });

  test('Should show empty chat window when empty steps array was passed', async () => {
    render(Widget(steps.emptySteps));
    await widget.openChatBot();

    expect(await widget.heading).toBeTruthy();
    expect(screen.queryByRole('button', { name: 'Start conversation' })).not.toBeInTheDocument();
    expect(screen.queryByText(/^hello.*to open a chat\.$/i)).not.toBeInTheDocument();
  });
});
