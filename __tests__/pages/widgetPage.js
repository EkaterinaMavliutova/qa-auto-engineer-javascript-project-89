import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export class WidgetPage {
  constructor() {
    this.startChatBotButton = screen.findByText('Открыть Чат');
    this.heading = screen.findByText('Виртуальный помощник');
    this.startConversationButton = screen.findByRole('button', { name: 'Start conversation' });
    this.closeChatBotButton = screen.findByLabelText('Close');
    this.welcomeMessage = screen.findByText(/^hello.*to open a chat\.$/i);
    this.firstMessage = screen.findByText(/^I'll help you to choose the best food for your awesome cat/i);
  }

  async openChatBot() {
    await userEvent.click(await this.startChatBotButton);
  }

  async startConversation() {
    await userEvent.click(await this.startConversationButton);
  }

  async closeChatBot() {
    await userEvent.click(await this.closeChatBotButton);
  }
};
