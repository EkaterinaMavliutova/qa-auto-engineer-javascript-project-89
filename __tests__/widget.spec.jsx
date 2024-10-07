import {
  waitFor,
  render,
  screen,
} from "@testing-library/react";
import setUp from "./utils.js";
import {vi, test, describe, beforeAll, expect} from "vitest";
import Widget from "@hexlet/chatbot-v2";
import '@testing-library/jest-dom';

let mockScroll;
let widget;
let steps;

beforeAll(() => {
  mockScroll = Element.prototype.scrollIntoView = vi.fn();
});

describe("Positive scenarios", () => {
  test("Renders whithout errors", async () => {
    ({ widget, steps } = setUp(screen));
    render(Widget(steps.expectedSteps));

    await widget.openChatBot();

    widget.verifyChatBotIsOpened();
  });

  test("Should be possible to start a conversation", async () => {
    ({ widget, steps } = setUp(screen));
    render(Widget(steps.expectedSteps));

    await widget.openChatBot();
    await widget.startConversation();

    widget.verifyConversaitionIsStarted();
  });

  test("Close button should return widget to the initial state", async () => {
    ({ widget, steps } = setUp(screen));
    render(Widget(steps.expectedSteps));

    await widget.openChatBot();
    await widget.startConversation();
    await widget.closeChatBot();

    widget.verifyChatBotIsClosed();
  });

  test("Scrolls to the bottom when new message appears", async () => {
    ({ widget, steps } = setUp(screen));
    render(Widget(steps.expectedSteps));

    await widget.openChatBot();
    await widget.startConversation();

    expect(mockScroll).toHaveBeenCalled();
  });
});

describe("Negative scenarios)", () => {

  test("Crashes when unsupportet steps format was passed", async () => {
    await waitFor(() => {
      expect(() => {
        ({ widget, steps } = setUp(screen));
        render(Widget(steps.unsupportedSteps));
      }).toThrow(/e is not iterable/i);
    });
  });

  test("Should show empty chat window when empty steps array was passed", async () => {
    ({ widget, steps } = setUp(screen));
    render(Widget(steps.emptySteps));

    await widget.openChatBot();

    expect(widget.heading).toBeTruthy();
    expect(
      screen.queryByRole("button", { name: "Start conversation" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/^hello.*to open a chat\.$/i)
    ).not.toBeInTheDocument();
  });
});
