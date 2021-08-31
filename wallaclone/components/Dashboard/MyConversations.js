import { useContext, useEffect, useRef, useState, createContext } from "react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from 'react-redux';
import { getMyConversationsAction, addMessageAction, getConversationAction } from '../../store/actions';
import { connect } from 'react-redux';
import WithAuth from '../hocs/WithAuth';
import { getMyConversations } from '../../store/selectors';



const Conversation = ({ conversation, currentUser }) => {
  return (
    <div className="conversation">
      <span className="conversationName">{conversation.members} ------ {conversation.productId}</span>
    </div>
  );
}



const MyConversations = ({ myConversations }) => {
    const [currentChat, setCurrentChat] = useState();
    const [newMessage, setNewMessage] = useState("");
    // const [arrivalMessage, setArrivalMessage] = useState(null);
    // const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef();
    const scrollRef = useRef();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMyConversationsAction('adri'));
    }, []);

    const handleCurrentChat = (conversation) => {
      socket.current = io("ws://localhost:3005");
      socket.current.on("getMessage", (data) => {
        setArrivalMessage({
            sender: data.senderId,
            text: data.text,
            createdAt: Date.now(),
        });
      });

      setCurrentChat(conversation);
      // dispatch(getConversationAction());
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
          sender: currentChat.members[0],
          text: newMessage,
          conversationId: currentChat.conversationId,
          productId: currentChat.productId
        };

        socket.current.emit("sendMessage", {
          senderId: currentChat.members[0],
          receiverId: currentChat.members[1],
          text: newMessage,
        });

        dispatch(addMessageAction(message));
        setNewMessage("");

        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {myConversations.map(conversation => {
              return (<div onClick={() => handleCurrentChat(conversation)}>
                <Conversation conversation={conversation} currentUser={{ _id: 'userId' , name: conversation.members[0] }} />
              </div>)
                })}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {currentChat.conversation.map((message) => (
                    <div ref={scrollRef}>
                      {/* <Message message={m} own={m.sender === user._id} /> */}
                      {message.text} ----- {message.sender}
                    </div>
                  ))}
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
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            {/* <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            /> */}
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