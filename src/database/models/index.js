import UserModel from './User';
import ConversationModel from './Conversation'

const models = {}
models.User = UserModel
models.Conversation = ConversationModel

export const Models = models;