export interface INotification {
    id: string;
    isRead: boolean;
    recipientUserId: string;
    senderUserId: string;
    type: 'like' | 'comment';
    timestamp?: string;
    userName: string;
    message: string;
}
