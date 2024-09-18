import { BasePage } from "./basePage";

export class WidgetPage extends BasePage {
  constructor() {
    super();
    this.startConversationButton = this.screen.findByRole('button', { name: 'Start conversation' });
    this.closeChatBotButton = this.screen.findByLabelText('Close');
    this.welcomeMessage = this.screen.findByText(/^hello.*to open a chat\.$/i);
    this.firstMessage = this.screen.findByText(/^I'll help you to choose the best food for your awesome cat/i);
  }

  async clickStartConversation() {
    this.click(await this.startConversationButton);
  }

  async closeChatBot() {
    this.click(await this.closeChatBotButton);
  }
};
