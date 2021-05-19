import { useState, useEffect, useContext } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Collapse, Button } from 'react-bootstrap';
import api from '../api';
import Chat from '../components/Chat';

export default function ChatOwner() {
  let { addressId, eventId, chatId } = useParams();
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState({});
  const [bookmarkOrig, setBookmarkOrig] = useState({});
  const [messages, setMessages] = useState([]);
  const [justSaved, setJustSaved] = useState(false);
  const [error, setError] = useState(false);

  const doChildtoParent = (message) => {
    api
      .modifyById('chat/push', chatId, {
        message: message,
        origin: 'owner',
      })
      .then((res) => {
        setJustSaved(message);
      });
  };
  const getMessageFromFullChat = (getMessageFromFullChat, aaaaaaaaa) => {
    console.log(getMessageFromFullChat, aaaaaaaaa);
    if (getMessageFromFullChat) {
      if (getMessageFromFullChat.conversation)
        setMessages(getMessageFromFullChat.conversation);
    }
  };

  useEffect(() => {
    api
      .getById('chat', chatId)
      .then((res) => getMessageFromFullChat(res.data, 'withchatid'))
      .finally(() => setLoading(false));
  }, [chatId, justSaved]);

  if (loading) return <div>Loading ...</div>;

  return (
    <Chat messages={messages} childtoParent={doChildtoParent} writer="owner" />
  );
}
