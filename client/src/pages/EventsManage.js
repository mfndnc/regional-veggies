import { useState, useEffect, useContext } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Collapse, Button } from 'react-bootstrap';
import api from '../api';
import auth from '../api/auth';
import { AuthContext } from '../context/auth';
import EventForm from '../components/EventForm';

export default function EventsManage() {
  let { addressId } = useParams();
  const [loading, setLoading] = useState(true);
  const [oneAddress, setOneAddress] = useState({});
  const [fullEvent, setFullEvent] = useState({});
  const [openEvent, setOpenEvent] = useState(false);
  const [openEventObj, setOpenEventObj] = useState({});
  const [childTriggeredSave, setChildTriggeredSave] = useState(false);

  useEffect(() => {
    Promise.all([
      api.getById('address', addressId),
      api.getEventForAddress(addressId),
    ])
      .then(([oneaddr, event]) => {
        setOneAddress(oneaddr.data);
        setFullEvent(event.data);
        if (event && event.data && event.data.length > 0) {
          const arrapis = event.data.map((el) =>
            api.getAlls(`bookmark/event/${el._id}/count`)
          );
          Promise.all(arrapis).then((arrres) => {
            const fullarr = event.data.map((el, idx) => {
              return { ...el, countclientbookmarks: arrres[idx].data };
            });
            setFullEvent(fullarr);
            const tmpdt = {};
            event.data.forEach((ev, idx) => {
              tmpdt[`id${idx}`] = false;
            });
            setOpenEventObj(tmpdt);
            console.log('fullarr', fullarr);
          });
        }
      })
      .finally(() => setLoading(false));
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

  const eventAccordion = fullEvent.map((ev, idx) => {
    let ddd = `id${idx}`;
    const dateDOMnotworking = ev.calendar.map((dt, k) => (
      <p className="card-text" key={`calendar${k}`}>
        {dt}
      </p>
    ));
    return (
      <div className="col mb-4" key={`ev${ev._id}`}>
        <div className="card h-100">
          <div className="card-body-wrap h-100 no-image">
            <Collapse in={!openEventObj[`id${idx}`]}>
              <div id={`collapseEventY${idx}`}>
                <div className="card-header">
                  Event - {ev.nickname ? ev.nickname : idx + 1}{' '}
                  {ev.countclientbookmarks > 0 && (
                    <span className="badge badge-info">
                      {ev.countclientbookmarks}
                    </span>
                  )}
                </div>
                <div className="card-body">
                  <h5 className="card-title">Lorem, ipsum.</h5>
                  <p className="card-text">{ev.note}</p>
                  <p className="card-text">{ev.promo}</p>
                </div>
              </div>
            </Collapse>
            <div className={`card-${openEventObj[ddd] ? 'header' : 'footer'}`}>
              <Button
                variant="secondary"
                onClick={() =>
                  setOpenEventObj((prevSt) => ({
                    ...prevSt,
                    [ddd]: !prevSt[ddd],
                  }))
                }
                aria-controls={`collapseEvent${idx} collapseEventY${idx}`}
                aria-expanded={openEventObj[ddd]}
              >
                {openEventObj[ddd] ? 'Close' : 'Mofidy'}
              </Button>
            </div>
            <Collapse in={openEventObj[`id${idx}`]}>
              <div id={`collapseEvent${idx}`}>
                {openEventObj[`id${idx}`] && (
                  <EventForm
                    accordion
                    onSave={afterChildSave}
                    closeAccordion={doCloseAccordionEvent}
                    closeAccordionArgs={ddd}
                    eventId={ev._id}
                  />
                )}
              </div>
            </Collapse>
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
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => setOpenEvent(!openEvent)}
                      aria-controls="collapseEventCard"
                      aria-expanded={openEvent}
                    >
                      New Offer
                    </Button>
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
      <Collapse in={openEvent}>
        <div id="collapseEventCard" className="row">
          <div className="colgrid col">
            <div className="card-group modern row row-cols-1 row-cols-md-1">
              <div className="col mb-4">
                <div className="card h-100">
                  <div className="card-body-wrap h-100 no-image">
                    <div className="card-header">New Offer</div>
                    <div className="card-body">
                      {openEvent && (
                        <EventForm
                          accordion
                          onSave={afterChildSave}
                          closeAccordion={setOpenEvent}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Collapse>
      <div className="row">
        <div className="colgrid col">
          <div className="card-group modern row row-cols-1 row-cols-md-1">
            {eventAccordion}
          </div>
        </div>
      </div>
    </div>
  );
}
