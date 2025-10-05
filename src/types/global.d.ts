interface ChatbaseAPI {
  (command: string, ...args: any[]): void;
  q?: any[];
}

declare global {
  interface Window {
    chatbase?: ChatbaseAPI;
  }
}
