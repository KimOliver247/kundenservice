export type MessageType = 'email' | 'review' | 'social' | 'other';

export interface HistoryItem {
  id: string;
  messageType: MessageType;
  customerMessage: string;
  instructions: string;
  response: string;
  timestamp: Date;
}