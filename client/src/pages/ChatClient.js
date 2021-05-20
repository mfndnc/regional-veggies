import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import api from '../api';
import Chat from '../components/Chat';

export default function ChatClient() {
  let { bookmarkId } = useParams();
  const [loading, setLoading] = useState(true);
  const [chatObj, setChatObj] = useState({});
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

  const saveFullChat = useCallback(
    (fullChat) => {
      if (fullChat) {
        setChatObj(fullChat);
        if (fullChat.conversation) setMessages(fullChat.conversation);
        if (chatId === null && fullChat._id) setChatId(fullChat._id);
      }
    },
    [chatId]
  );

  useEffect(() => {
    if (chatId === null) {
      api
        .getById('bookmark', bookmarkId)
        .then((res) => {
          //console.log('bookmark', res);
          setBookmarkOrig(res.data);
          api.getById('address', res.data.address).then((res) => {
            setAddress(res.data);
            api
              .getAlls(`chat/user/bookmark/${bookmarkId}`)
              .then((res) => saveFullChat(res.data, 'nochatis'));
          });
        })
        .finally(() => setLoading(false));
    } else {
      api
        .getById('chat', chatId)
        .then((res) => saveFullChat(res.data, 'withchatid'));
    }
  }, [chatId, bookmarkId, justSaved, saveFullChat]);

  if (loading) return <div>Loading ...</div>;

  return (
    <div className="container">
      <div className="row">
        <div className="colgrid col">
          <div className="card-group modern row row-cols-1 row-cols-md-1">
            <div className="col mb-4">
              <div className="card classic h-100 text-left">
                <div className="card-body">
                  <h5 className="card-subtitle mb-2 text-muted">
                    {address.name && `chatting with ${address.name}`} {'  '}
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => setJustSaved(Math.random())}
                    >
                      Refresh
                    </Button>{' '}
                    {'  '}
                    <Link to="." className="btn btn-info btn-sm text-white ">
                      Back
                    </Link>
                  </h5>
                  <div className="card-text">
                    <p>
                      Just type your request and wait for the owner to answer
                      you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{' '}
      <Chat
        messages={messages}
        childtoParent={doChildtoParent}
        writer="client"
      />
    </div>
  );
}
