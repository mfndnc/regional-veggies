import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

export default function EventsView() {
  let { addressId } = useParams();
  const [loading, setLoading] = useState(true);
  const [oneAddress, setOneAddress] = useState({});
  const [fullEvent, setFullEvent] = useState({});
  const [bookmarks, setBookmarks] = useState({});

  const [reserveObj, setReserveObj] = useState({});
  const [childTriggeredSave, setChildTriggeredSave] = useState(false);

  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    Promise.all([
      api.getById('address', addressId),
      api.getAlls(`event/address/${addressId}`),
      api.getAlls(`bookmark/user/address/${addressId}`),
    ])
      .then(([addr, ev, bookm]) => {
        //console.log(addr, ev, bookm);
        const tmpdt = {};
        ev.data.forEach((event) => {
          tmpdt[`ev${event._id}`] = false;
        });
        bookm.data.forEach((bookmark) => {
          tmpdt[`ev${bookmark.event}`] = true;
        });

        setReserveObj(tmpdt);
        setOneAddress(addr.data);
        setFullEvent(ev.data);
        setBookmarks(bookm.data);
      })
      .finally(() => setLoading(false));
  }, [childTriggeredSave, addressId]);

  const handleReserve = (checked, eventid) => {
    //console.log('handleReserve', checked, eventid);
    const doSave = checked
      ? api.insert('bookmark', { event: eventid, address: oneAddress._id })
      : api.findDelete('bookmark', { event: eventid });
    doSave.then(() => setJustSaved(true));
    const evid = `ev${eventid}`;
    setReserveObj((prevSt) => ({
      ...prevSt,
      [evid]: !prevSt[evid],
    }));
  };

  if (loading) return <div>Loading ...</div>;

  const eventList = fullEvent.map((ev, idx) => {
    let ddd = `id${idx}`;
    let evid = `ev${ev._id}`;
    let isSaved = reserveObj[evid];
    const dateDOMnotworking = ev.calendar.map((dt) => (
      <p className="card-text">{dt}</p>
    ));
    return (
      <div className="col mb-4" key={`ev${ev._id}`}>
        <div className="card h-100">
          <div className="card-body-wrap h-100 no-image">
            <div className="card-header">
              Event - {ev.nickname ? ev.nickname : idx + 1}
            </div>
            <div className="card-body">
              <h5 className="card-title">{ev.note}</h5>
              <p className="card-text">{ev.promo}</p>
            </div>
            <div className="card-footer">
              <input
                type="checkbox"
                name={`reserve${ev._id}`}
                id={`reserve${ev._id}`}
                checked={isSaved}
                onChange={(e) => handleReserve(e.target.checked, ev._id)}
              />
              <label className="ml-1">Bookmark</label>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row">
        <div className="colgrid col">
          <div className="card-group modern row row-cols-1 row-cols-md-1">
            <div className="col mb-4">
              <div className="card classic h-100 text-left">
                <div className="card-body">
                  <h5 className="card-subtitle mb-2 text-muted">
                    {oneAddress.name}{' '}
                  </h5>
                  <div className="card-text">
                    <p>
                      {oneAddress.street} {oneAddress.suite},
                      {oneAddress.zipcode} {oneAddress.city}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="colgrid col">
          <div className="card-group modern row row-cols-1 row-cols-md-1">
            {eventList}
          </div>
        </div>
      </div>
    </div>
  );
}
