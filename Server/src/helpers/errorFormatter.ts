export function formatErrorMessage(message: string): string {
    return message.replace(/^"|"$/g, '').replace(/\\"/, '"');
  }