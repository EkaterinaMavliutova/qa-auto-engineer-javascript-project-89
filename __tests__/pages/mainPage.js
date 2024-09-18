import { BasePage } from "./basePage";
import { WidgetPage } from "./widgetPage";
import { HostAppPage } from "./hostAppPage.js";
import Widget from "@hexlet/chatbot-v2";
import App from "../../src/App.jsx";

export class MainPage extends BasePage {
  constructor() {
    super();
    this.startChatBotButton = this.screen.findByRole('button', { name: 'Открыть Чат' });
    // this.widget = new WidgetPage();
    // this.hostApp = new HostAppPage();
  }

  async renderWidget(steps) {
    this.render(Widget(steps));
  };

  async renderWidgetIntegration(steps) {
    this.render(App(steps));
  };
  
  async clickStartChatBotButton() {
    this.click(await this.startChatBotButton);
    return new WidgetPage();
  }
};
