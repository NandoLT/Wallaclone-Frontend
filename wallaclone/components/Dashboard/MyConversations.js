import { useContext, useEffect, useRef, useState, createContext } from "react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from 'react-redux';
import { getMyConversationsAction, addMessageAction, getConversationAction } from '../../store/actions';
import { connect } from 'react-redux';
import WithAuth from '../hocs/WithAuth';
import { getMyConversations } from '../../store/selectors';
import parseAuthToken from '../../utils/parseAuthToken';

const MyConversations = ({ myConversations }) => {
    const [currentChat, setCurrentChat] = useState();
    const [newMessage, setNewMessage] = useState("");
    const socket = useRef();
    const scrollRef = useRef();

    const userId = parseAuthToken();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMyConversationsAction(userId));
    }, [myConversations]);


    const handleCurrentChat = (conversation) => {
        socket.current = io("ws://localhost:3005");
        socket.current.emit("addUser", userId, conversation.conversationId);

        setCurrentChat(conversation);
        socket.current.on("getMessage", data => {
            console.log(myConversations);
            console.log(conversation);
            const index = myConversations.findIndex(
                conv => conv.conversationId === conversation.conversationId && conv.productId === conversation.productId);
            myConversations[index].conversation.push({ sender: data.senderId, text: data.text })
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
          sender: userId,
          text: newMessage,
          conversationId: currentChat.conversationId,
          productId: currentChat.productId
        };

        const receiverIndex = currentChat.members.findIndex(member => member !== userId)
        socket.current.emit("sendMessage", {
          senderId: userId,
          receiverId: currentChat.members[receiverIndex],
          text: newMessage,
        });

        dispatch(addMessageAction(message));
        setNewMessage("");
    };

    return (
        <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {myConversations.map(conversation => {
              return (
              <div onClick={() => handleCurrentChat(conversation)}>
                  <div className="conversation">
                    <span className="conversationName">{conversation.members} ------ {conversation.productId}</span>
                </div>
              </div>)
                })}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                    {currentChat.conversation.map((message) => {
                        return (
                            <div ref={scrollRef}>
                                <div className={message.sender === userId ? "message own" : "message"}>
                                    <div className="messageTop">
                                        <p className="messageText">{message.text} ------ {message.sender}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
      </div>
    </>
    )
}

const mapStateToProps = (state) => ({
    myConversations: getMyConversations(state)
});

export default connect(mapStateToProps)(WithAuth(MyConversations))