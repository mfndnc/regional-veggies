import { useState, useEffect, useContext } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Collapse, Button } from 'react-bootstrap';
import api from '../api';
import Chat from '../components/Chat';

export default function ChatClient() {
  let { bookmarkId } = useParams();
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState({});
  const [bookmarkOrig, setBookmarkOrig] = useState({});
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [justSaved, setJustSaved] = useState(false);
  const [error, setError] = useState(false);

  const doChildtoParent = (message) => {
    const doSave =
      chatId === null
        ? api.insert('chat', {
            ...bookmarkOrig,
            message,
            bookmark: bookmarkOrig._id,
            origin: 'client',
            userowner: address.user,
            userclient: bookmarkOrig.user,
          })
        : api.modifyById('chat/push', chatId, {
            message: message,
            origin: 'client',
          });
    doSave.then((res) => {
      if (chatId === null && res.data._id) setChatId(res.data._id);
      setJustSaved(message);
    });
  };
  const getMessageFromFullChat = (getMessageFromFullChat, aaaaaaaaa) => {
    console.log(getMessageFromFullChat, aaaaaaaaa);
    if (getMessageFromFullChat) {
      if (getMessageFromFullChat.conversation)
        setMessages(getMessageFromFullChat.conversation);
      if (chatId === null && getMessageFromFullChat._id)
        setChatId(getMessageFromFullChat._id);
    }
  };

  useEffect(() => {
    if (chatId === null) {
      api
        .getById('bookmark', bookmarkId)
        .then((res) => {
          console.log('bookmark', res);
          setBookmarkOrig(res.data);
          api.getById('address', res.data.address).then((res) => {
            setAddress(res.data);
            api
              .getAlls(`chat/user/bookmark/${bookmarkId}`)
              .then((res) => getMessageFromFullChat(res.data, 'nochatis'));
          });
        })
        .finally(() => setLoading(false));
    } else {
      api
        .getById('chat', chatId)
        .then((res) => getMessageFromFullChat(res.data, 'withchatid'));
    }
  }, [chatId, bookmarkId, justSaved]);

  if (loading) return <div>Loading ...</div>;

  return (
    <Chat messages={messages} childtoParent={doChildtoParent} writer="client" />
  );
}
