import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import api from '../api';
import Chat from '../components/Chat';

export default function ChatOwner() {
  let { chatId } = useParams();
  const [loading, setLoading] = useState(true);
  const [chatObj, setChatObj] = useState({});

  const [messages, setMessages] = useState([]);
  const [justSaved, setJustSaved] = useState(false);
  const [error, setError] = useState(false);

  const doChildtoParent = (message) => {
    api
      .modifyById('chat/push', chatId, {
        message: message,
        origin: 'owner',
      })
      .then((res) => setJustSaved(message))
      .catch((_) => setError(true));
  };

  const saveFullChat = useCallback((fullChat) => {
    if (fullChat) {
      setChatObj(fullChat);
      if (fullChat.conversation) setMessages(fullChat.conversation);
    }
  }, []);

  useEffect(() => {
    api
      .getById('chat', chatId)
      .then((res) => saveFullChat(res.data))
      .catch((_) => setError(true))
      .finally(() => setLoading(false));
  }, [chatId, justSaved, saveFullChat]);

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
                    {chatObj.userclient &&
                      chatObj.userclient.name &&
                      `Chatting with ${chatObj.userclient.name}`}{' '}
                    {'  '}
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
                      {chatObj.address &&
                        chatObj.address.name &&
                        `Regarding: ${chatObj.address.name}`}

                      {chatObj.event &&
                        chatObj.event.note &&
                        ` / ${chatObj.event.note}`}
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
        writer="owner"
      />
    </div>
  );
}
