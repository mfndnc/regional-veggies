import { useState, useEffect, useContext } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Collapse, Button } from 'react-bootstrap';
import api from '../api';
import auth from '../api/auth';
import { AuthContext } from '../context/auth';
import EventForm from '../components/EventForm';

export default function EventsView() {
  let { addressId } = useParams();
  const [loading, setLoading] = useState(true);
  const [oneAddress, setOneAddress] = useState({});
  const [fullEvent, setFullEvent] = useState({});
  const [openEvent, setOpenEvent] = useState(false);
  const [openEventObj, setOpenEventObj] = useState({});
  const [childTriggeredSave, setChildTriggeredSave] = useState(false);

  useEffect(() => {
    api.getById('address', addressId).then((res) => {
      setOneAddress(res.data);
      api
        .getAlls(`event/address/${addressId}`)
        .then((res) => {
          setFullEvent(res.data);
          const tmpev = {};
          res.data.forEach((ev, idx) => {
            tmpev[`id${idx}`] = false;
          });
          setOpenEventObj(tmpev);
        })
        .finally(() => setLoading(false));
    });
  }, [childTriggeredSave]);

  const doCloseAccordionEvent = (args) => {
    setOpenEventObj((prevSt) => ({
      ...prevSt,
      [args]: !prevSt[args],
    }));
  };
  const afterChildSave = (args) => {
    setChildTriggeredSave(!childTriggeredSave);
  };

  if (loading) return <div>Loading ...</div>;

  const eventList = fullEvent.map((ev, idx) => {
    let ddd = `id${idx}`;
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
              <h5 className="card-title">Lorem, ipsum.</h5>
              <p className="card-text">{ev.note}</p>
              <p className="card-text">{ev.promo}</p>
            </div>

            <div className="card-footer">
              Lorem, ipsum dolor. put here reserve
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
