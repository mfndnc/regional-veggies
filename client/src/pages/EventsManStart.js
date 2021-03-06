import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Button } from 'react-bootstrap';
import api from '../api';
import AddressForm from '../components/AddressForm';

export default function EventsManStart() {
  const [loading, setLoading] = useState(true);
  const [fullAddress, setFullAddress] = useState([]);
  const [openAddress, setOpenAddress] = useState(false);
  const [openAddressObj, setOpenAddressObj] = useState({});
  const [childTriggeredSave, setChildTriggeredSave] = useState(false);
  useEffect(() => {
    api
      .getUserAddresses()
      .then((res) => {
        setFullAddress(res.data);
        if (res && res.data && res.data.length > 0) {
          const arrapis = res.data.map((el) =>
            api.countAlls(`bookmark/address/${el._id}`)
          );
          Promise.all(arrapis).then((arrres) => {
            const fullarr = res.data.map((el, idx) => {
              return { ...el, countclientbookmarks: arrres[idx].data };
            });
            setFullAddress(fullarr);
            //console.log(fullarr);
          });
        }
      })
      .finally(() => setLoading(false));
  }, [childTriggeredSave]);

  const doCloseAccordionAddress = (args) => {
    setOpenAddressObj((prevSt) => ({
      ...prevSt,
      [args]: !prevSt[args],
    }));
  };
  const afterChildSave = (args) => {
    setChildTriggeredSave(!childTriggeredSave);
  };

  const addressAccordion = fullAddress.map((addr, idx) => {
    let ddd = `id${idx}`;
    return (
      <div className="col mb-4" key={`addr${addr._id}`}>
        <div className="card h-100">
          <div className="card-body-wrap h-100 no-image">
            <Collapse in={!openAddressObj[`id${idx}`]}>
              <div id={`collapseAddressY${idx}`}>
                <div className="card-header">
                  Address - {addr.nickname ? addr.nickname : idx + 1}{' '}
                  {addr.countclientbookmarks > 0 && (
                    <span className="badge badge-success">
                      {addr.countclientbookmarks}
                    </span>
                  )}
                </div>
                <div className="card-body">
                  <h5 className="card-title">{addr.city}</h5>
                  <p className="card-text">
                    {addr.street} {addr.suite}
                  </p>
                  <p className="card-text">
                    {addr.zipcode} {addr.city}
                  </p>
                  <p className="card-text">
                    {addr.phone} {addr.skype} {addr.whatsapp} {addr.twitter}
                  </p>
                </div>
              </div>
            </Collapse>
            <div
              className={`card-${openAddressObj[ddd] ? 'header' : 'footer'}`}
            >
              <Button
                variant="secondary"
                onClick={() =>
                  setOpenAddressObj((prevSt) => ({
                    ...prevSt,
                    [ddd]: !prevSt[ddd],
                  }))
                }
                aria-controls={`collapseAddress${idx} collapseAddressY${idx}`}
                aria-expanded={openAddressObj[ddd]}
              >
                {openAddressObj[ddd] ? 'Close' : 'Modify'}
              </Button>
              {addr.addrtype.indexOf('user') === -1 && (
                <Link
                  className="btn btn-secondary text-white ml-4"
                  to={`/eventsmanage/${addr._id}`}
                >
                  Offers
                </Link>
              )}
            </div>
            <Collapse in={openAddressObj[`id${idx}`]}>
              <div id={`collapseAddress${idx}`}>
                {openAddressObj[`id${idx}`] && (
                  <AddressForm
                    accordion
                    onSave={afterChildSave}
                    closeAccordion={doCloseAccordionAddress}
                    closeAccordionArgs={ddd}
                    addressId={addr._id}
                  />
                )}
              </div>
            </Collapse>
          </div>
        </div>
      </div>
    );
  });

  if (loading) return <div>loading...</div>;
  return (
    <div className="container">
      <div className="row">
        <div className="colgrid col">
          <div className="card-group modern row row-cols-1 row-cols-md-1">
            <div className="col mb-4">
              <div className="card classic h-100 text-left">
                <div className="card-body">
                  <h5 className="card-subtitle mb-2 text-muted">
                    Offer your products{'  '}
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => setOpenAddress(!openAddress)}
                      aria-controls="collapseAddressCard"
                      aria-expanded={openAddress}
                    >
                      New Address
                    </Button>
                  </h5>
                  <div className="card-text">
                    <p>
                      Offers can be bookmarked by your potential clients and
                      will appear like this:
                      <span className="badge badge-success">1</span>. Only
                      addresses that you specified as available for offering
                      will be included. Clients can also contact you via our
                      services.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{' '}
      <Collapse in={openAddress}>
        <div id="collapseAddressCard" className="row">
          <div className="colgrid col">
            <div className="card-group modern row row-cols-1 row-cols-md-1">
              <div className="col mb-4">
                <div className="card h-100">
                  <div className="card-body-wrap h-100 no-image">
                    <div className="card-header">New Address</div>
                    <div className="card-body">
                      {openAddress && (
                        <AddressForm
                          accordion
                          onSave={afterChildSave}
                          closeAccordion={setOpenAddress}
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
          <div className="card-group modern row row-cols-1 row-cols-md-2">
            {addressAccordion}
          </div>
        </div>
      </div>
    </div>
  );
}
