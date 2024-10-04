import userEvent from "@testing-library/user-event";
import { expect } from "vitest";

export class WidgetPage {
  constructor(screen) {
    this.screen = screen;
    this.user = userEvent.setup();
    // this.startChatBotButton = this.screen.findByText('Открыть Чат');
    // this.heading = this.screen.findByText('Виртуальный помощник');
    // this.startConversationButton = this.screen.findByRole('button', { name: 'Start conversation' });
    // this.closeChatBotButton = this.screen.findByLabelText('Close');
    // this.welcomeMessage = this.screen.findByText(/^hello.*to open a chat\.$/i);
    // this.firstMessage = this.screen.findByText(/^I'll help you to choose the best food for your awesome cat/i);
  }

  async openChatBot() {
    this.startChatBotButton = this.screen.getByText('Открыть Чат');
    await this.user.click(this.startChatBotButton);

    this.startConversationButton = this.screen.queryByRole('button', { name: 'Start conversation' });
    this.heading = this.screen.getByText('Виртуальный помощник');
    this.welcomeMessage = this.screen.queryByText(/^hello.*to open a chat\.$/i);
    this.closeChatBotButton = this.screen.getByLabelText('Close');
  }

  async startConversation() {
    await this.user.click(this.startConversationButton);

    this.firstMessage = this.screen.getByText(/^I'll help you to choose the best food for your awesome cat/i);
  }

  async closeChatBot() {
    await this.user.click(this.closeChatBotButton);
  }

  verifyChatBotIsOpened() {
    expect(this.heading).toBeVisible();
    expect(this.welcomeMessage).toBeVisible();
    expect(this.startConversationButton).toBeVisible();
  }

  verifyChatBotIsClosed() {
    expect(this.heading).not.toBeVisible();
  }

  verifyConversaitionIsStarted() {
    expect(this.firstMessage).toBeVisible();
  }
};
