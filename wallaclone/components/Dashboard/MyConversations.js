import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch } from 'react-redux';
import { getMyConversationsAction, addMessageAction } from '../../store/actions';
import { connect } from 'react-redux';
import WithAuth from '../hocs/WithAuth';
import { getMyConversations } from '../../store/selectors';
import parseAuthToken from '../../utils/parseAuthToken';
import { makeStyles } from "@material-ui/core";
import ChatLink from "../ChatLink";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


const useStyles = makeStyles((theme) => ({
  messenger: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  title: {
    fontSize: 30,
    textAlign: 'center'
  },
  menu: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  },
  chatBox: {
    marginTop: 50,
    width: '100%',
    maxWidth: 500,
  },
  chat: {
    width: '100%',
    height: 500,
    overflowY: 'scroll',
    display: 'flex',
    flexDirection: 'column',
    padding: '0 0 5px 0',
  },
  ownMessage: {
    alignSelf: 'flex-end',
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    padding: 10,
    minWidth: 100,
    marginTop: 10,
    marginRight: 5,
    borderRadius: '10px 10px 0 10px'
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: theme.palette.secondary.main,
    color: '#fff',
    padding: 10,
    minWidth: 100,
    marginTop: 10,
    marginLeft: 5,
    borderRadius: '10px 10px 10px 0px'
  },
  backContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    cursor: 'pointer'
  },
  msgInput: {
    height: 40,
    width: '85%',
    border: '1px solid',
    borderColor: theme.palette.text.secondary,
    borderRadius: '10px 0 0 10px'
  },
  sendButton: {
    cursor: 'pointer',
    width: '15%',
    height: 40,
    border: 'none',
    borderRadius: '0 10px 10px 0'
  }
}))

const MyConversations = ({ myConversations }) => {
  const [currentChat, setCurrentChat] = useState();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = useRef();
  const classes = useStyles();

  const userId = parseAuthToken();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyConversationsAction(userId));
    socket.current = io("ws://18.188.214.80:3005");
    socket.current.on("getMessage", data => {
      messages.push({ sender: data.senderId, text: data.text })
      setMessages(messages);
    });
  }, []);


  const handleCurrentChat = (conversation) => {
    socket.current.emit("addUser", userId, conversation.conversationId);
    setCurrentChat(conversation);
    setMessages(conversation.conversation);
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
      <div className={classes.messenger}>
        {!currentChat ?
          <div className={classes.menu}>
            <p className={classes.title}>CHATS</p>
            {myConversations.map(conversation => {
              return (
                <ChatLink key={conversation.conversationId} conversation={conversation} action={() => handleCurrentChat(conversation)} />
              )
            })}
          </div>
          :
          <div className={classes.chatBox}>
            <div className={classes.backContainer} onClick={() => { setCurrentChat() }}>
              <ArrowBackIosIcon />
              Volver

            </div>
            <div className="chatBoxWrapper">
              <>
                <div className={classes.chat}>
                  {messages.map((message) => {
                    return (
                      <div className={message.sender === userId ? classes.ownMessage : classes.otherMessage}>

                        <p className="messageText">{message.text}</p>

                      </div>
                    )
                  })}
                </div>
                <div className="chatBoxBottom">
                  <form onSubmit={handleSubmit}>
                    <input
                      className={classes.msgInput}
                      placeholder="Write something..."
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                    ></input>
                    <button className={classes.sendButton} type="submit">
                      Send
                    </button>
                  </form>
                </div>
              </>
            </div>
          </div>
        }
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  myConversations: getMyConversations(state)
});

export default connect(mapStateToProps)(WithAuth(MyConversations))