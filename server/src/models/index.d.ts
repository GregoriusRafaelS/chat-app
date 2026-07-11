import { Sequelize, ModelStatic, Model } from 'sequelize';
// js ke ts (Model belum diubah ke ts)
declare const db: {
  sequelize: Sequelize;
  Sequelize: any;
  Conversation:any;
  ConversationParticipation:any;
  User:any;
  Message:any;
  [key: string]: any;
};

export default db;
