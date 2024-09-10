import Widget from '@hexlet/chatbot-v2';
import steps from '../__fixtures__/testSteps.js';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { logRoles } from '@testing-library/dom'
import { expect } from '@jest/globals';

let mockScroll = '';

beforeAll(() => {
  mockScroll = Element.prototype.scrollIntoView = jest.fn();
});

describe('Widget (positive scenarios)', () => {
  test('renders whithout errors', async () => {
    render(Widget(steps));
    const startButton = await screen.findByRole('button', { name: /открыть чат/i });

    await userEvent.click(startButton);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeTruthy();
    });
  });

  test("should be possible to start the conversation", async () => {
    render(Widget(steps));
    const startButton = await screen.findByRole('button', { name: /открыть чат/i });

    await userEvent.click(startButton);
    const newChatButton = await screen.findByRole('button', { name: /start conversation/i });
    const welcomeMessage = await screen.findByText(/^hello.*to open a chat\.$/i);

    await waitFor(() => {
      expect(welcomeMessage).toBeTruthy();
      expect(newChatButton).toBeEnabled();
    });
  });

  test('close button should return widget to the initial state', async () => {
    render(Widget(steps));
    const startButton = await screen.findByRole('button', { name: /открыть чат/i });

    await userEvent.click(startButton);
    const newChatButton = await screen.findByRole('button', { name: /start conversation/i });
    await userEvent.click(newChatButton);

    const closeButton = await screen.findByLabelText('Close');
    await userEvent.click(closeButton);

    waitFor(() => {
      expect(screen.getByRole('dialog')).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: /открыть чат/i })).toBeVisible();
      expect(screen.getByRole('button', { name: /открыть чат/i })).toBeEnabled();
    });
  });

  test('scrolls to the bottom when new message appears', async () => {
    render(Widget(steps));
    const startButton = await screen.findByRole('button', { name: /открыть чат/i });

    await userEvent.click(startButton);
    const newChatButton = await screen.findByRole('button', { name: /start conversation/i });
    await userEvent.click(newChatButton);
    
    await waitFor(() => {
      expect(mockScroll).toHaveBeenCalled();
    });
  });
});
