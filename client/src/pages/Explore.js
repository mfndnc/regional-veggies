import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import api from '../api';
import GoogleMap from '../components/GoogleMap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faGlobe,
  faTimesCircle,
  faAddressCard,
} from '@fortawesome/free-solid-svg-icons';
import {
  faTwitter,
  faSkype,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';

const containerStyle = {
  width: '100vw',
  height: '50vh',
  backgroundColor: 'blue',
};

export default function Explore() {
  const [loading, setLoading] = useState(true);
  const [fullAddress, setFullAddress] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState(null);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    // CAN NOT use the same function (via useCallback or otherwise) of it keeps tryimng to send the query at all keyboard press
    if (loading)
      api
        .searchAddresses()
        .then((res) => {
          setFullAddress(res.data);
        })
        .catch((_) => setError(true))
        .finally(() => setLoading(false));
    if (selected)
      api
        .getEventForAddress(selected._id)
        .then((res) => {
          setSelectedEvents(res.data);
        })
        .catch((_) => setError(true));
  }, [selected, loading]);

  const handleChange = (e) => setQuery(e.target.value);
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };
  const handleSubmit = (e) => {
    const objquery = { bar: 'foo' };
    if (query) {
      objquery.query = query;
    }
    //console.log(objquery);
    api
      .searchAddresses(objquery)
      .then((res) => {
        setFullAddress(res.data);
      })
      .catch((_) => setError(true));
  };

  const doChildtoParent = (args) => {
    //console.log(args);
    setSelected(args);
  };
  const clickNameList = (e) => {
    //console.log(e.target.dataset.id);
    api
      .getById('address', e.target.dataset.id)
      .then((res) => setSelected(res.data))
      .finally(() => setLoading(false));
  };

  if (loading) return <div>loading...</div>;

  return (
    <div className="container-fluid">
      {''}
      <div className="row">
        <div className="col">
          {' '}
          <GoogleMap
            markers={fullAddress}
            childtoParent={doChildtoParent}
            selectedMarker={selected}
          />{' '}
        </div>
      </div>{' '}
      <div className="row">
        <div className="colgrid col">
          <div
            className={`card-group modern row row-cols-1 row-cols-md-${
              selected ? '2' : '1'
            }`}
          >
            {' '}
            <div className="col mb-4">
              <div className="card h-100 text-left">
                <div className="card-body-wrap h-100 no-image">
                  <div className="card-body">
                    <h4 className="card-title">Search Addresses</h4>
                    <h5 className="card-subtitle mb-2 text-muted">
                      <InputGroup className="mb-3">
                        <FormControl
                          placeholder="Search"
                          aria-label="Search"
                          onChange={handleChange}
                          onKeyPress={handleKeyPress}
                        />
                        <InputGroup.Append>
                          <Button
                            variant="outline-secondary"
                            onClick={handleSubmit}
                          >
                            Search
                          </Button>
                        </InputGroup.Append>
                      </InputGroup>
                    </h5>
                    <div className="card-text">
                      <ul className="list-group explore">
                        {fullAddress.map((addr) => (
                          <li
                            className="list-group-item"
                            key={addr._id}
                            data-id={addr._id}
                            onClick={clickNameList}
                          >
                            {addr.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>{' '}
            {selected && (
              <div className="col mb-4 order-first order-md-last">
                <div className="card h-100 text-left">
                  <div className="card-body-wrap h-100 no-image">
                    <div className="card-body">
                      <h4 className="card-title">
                        Selected
                        <button
                          type="button"
                          className="close float-right"
                          aria-label="Close"
                          onClick={() => setSelected(null)}
                        >
                          <FontAwesomeIcon icon={faTimesCircle} />
                        </button>
                      </h4>

                      <h5 className="card-subtitle mb-2 text-muted">
                        {selected.name} <br />
                        <FontAwesomeIcon icon={faAddressCard} />
                        <br />
                        {selected.street} {selected.suite}
                        <br />
                        {selected.zipcode} {selected.city}
                      </h5>
                      <div className="card-text">
                        <p>
                          <FontAwesomeIcon icon={faGlobe} /> {selected.website}
                        </p>
                        <p>
                          <FontAwesomeIcon icon={faPhone} /> {selected.phone}
                        </p>
                        <p>
                          <FontAwesomeIcon icon={faSkype} /> {selected.skype}
                        </p>
                        <p>
                          <FontAwesomeIcon icon={faWhatsapp} />{' '}
                          {selected.whatsapp}
                        </p>
                        <p>
                          <FontAwesomeIcon icon={faTwitter} />
                          {selected.twitter}
                        </p>

                        {selected.addrtype.indexOf('user') === -1 && (
                          <Link
                            className="btn btn-secondary text-white"
                            to={`/eventsview/${selected._id}`}
                          >
                            Offers
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}{' '}
          </div>
        </div>
      </div>{' '}
    </div>
  );
}

// <div className="col" style={containerStyle}></div>
// <div className="col"> <GoogleMap markers={fullAddress} childtoParent={doChildtoParent} selectedMarker={selected} /> </div>
//<GoogleMap markers={fullAddress} childtoParent={doChildtoParent} selectedMarker={selected} />
