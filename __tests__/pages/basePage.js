import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export class BasePage {
  constructor() {
    this.render = render;
    this.screen = screen;
    this.userEvent = userEvent;
  }

  async findButton(buttonName) {
    this.screen.findByRole('button', { name: buttonName });
  }

  async click(element) {
    this.userEvent.click(element);
  }
};
