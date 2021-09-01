import client from "./client";

const chatsPath = '/api/chats';

export const getConversations = async (userId) => {
    const conversations = await client.get(`${chatsPath}/members/${userId}`);
     return conversations.result;
}

export const getConversation = async (userId, seconUserId, productId) => {
    const conversation = await client.get(`${chatsPath}/${userId}/${seconUserId}/${productId}`);
    return conversation.result;
}

export const createConversation = async (conversation) => {
    const newConversation = await client.post(`${chatsPath}/addConversation`, conversation);
    return newConversation.result
}

export const addMessage = async (message) => {
    const newMessage = await client.post(`${chatsPath}`, message);
    return newMessage.result;
}