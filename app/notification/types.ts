export interface INotification {
    isRead: boolean;
    recipientUserId: string;
    senderUserId: string;
    type: 'like' | 'comment';
    timestamp?: string;
    userName: string;
    message: string;
}
