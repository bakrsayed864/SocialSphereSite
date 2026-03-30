export interface Notification  {
  _id: string;
  recipient: Recipient;
  actor: Recipient;
  type: string;
  entityType: string;
  entityId: string;
  isRead: boolean;
  createdAt: string;
  readAt: string;
  entity: Entity;
}

export interface Entity {
  _id: string;
  user: string;
  commentsCount: number;
  topComment: null;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
}

export interface Recipient {
  _id: string;
  name: string;
  photo: string;
}