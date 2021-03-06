import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';

export default function ChatOwner() {
  let { addressId, eventId } = useParams();
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const doApi =
      eventId === undefined
        ? api.getAlls(`chat/address/${addressId}`)
        : api.getAlls(`chat/event/${eventId}`);

    doApi
      .then((chats) => {
        setChats(chats.data);
      })
      .finally(() => setLoading(false));
  }, [addressId, eventId]);

  if (loading) return <div>Loading ...</div>;
  const showAddressTop = eventId === undefined && chats[0] && chats.length > 1;

  const addressshow = showAddressTop && (
    <div className="colgrid col">
      <div className="card-group modern row row-cols-1 row-cols-md-1">
        <div className="col mb-4">
          <div className="card classic h-100 text-left">
            <div className="card-body">
              <h5 className="card-subtitle mb-2 text-muted">
                {chats[0].address.name}{' '}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const chatList =
    chats &&
    chats.length &&
    chats.map((chat, idx) => {
      const linkTo = showAddressTop
        ? `/eventsmanage/${chat.address._id}/allchats/${chat._id}`
        : `/eventsmanage/${chat.address._id}/${chat.event._id}/${chat._id}`;

      return (
        <div className="col mb-4" key={`ev${chat._id}`}>
          <div className="card h-100">
            <div className="card-body-wrap h-100 no-image">
              <div className="card-header">
                <Link className="btn btn-secondary text-white mr-4" to={linkTo}>
                  Incoming Request
                </Link>{' '}
                from {chat.userclient.name}
              </div>
              <div className="card-body">
                <h5 className="card-title">
                  {showAddressTop ? chat.event.note : chat.address.name}
                </h5>
                {!showAddressTop && (
                  <>
                    <p className="card-text">
                      {chat.address.street} / {chat.address.city}
                    </p>
                    <p className="card-text">{chat.event.note}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    });

  return (
    <div className="container">
      <div className="row">{addressshow}</div>

      <div className="row">
        <div className="colgrid col">
          <div className="card-group modern row row-cols-1 row-cols-md-1">
            {chatList}
          </div>
        </div>
      </div>
    </div>
  );
}
