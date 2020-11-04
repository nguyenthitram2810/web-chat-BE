import UserModel from './User';
import ConversationModel from './Conversation'
import MessageModel from './Message'

const models = {}
models.User = UserModel
models.Conversation = ConversationModel
models.Message = MessageModel

export const Models = models;