import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import api from '../api';

export default function EventsViewStart() {
  const [loading, setLoading] = useState(true);
  const [fullAddress, setFullAddress] = useState([]);
  const [openAddress, setOpenAddress] = useState(false);
  const [openAddressObj, setOpenAddressObj] = useState({});
  const [childTriggeredSave, setChildTriggeredSave] = useState(false);
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
  }, [childTriggeredSave, loading]);

  const handleChange = (e) => setQuery(e.target.value);
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };
  const handleSubmit = () => {
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

  const doCloseAccordionAddress = (args) => {
    setOpenAddressObj((prevSt) => ({
      ...prevSt,
      [args]: !prevSt[args],
    }));
  };
  const afterChildSave = (args) => {
    setChildTriggeredSave(!childTriggeredSave);
  };

  const addressList = fullAddress.map((addr, idx) => {
    let ddd = `id${idx}`;
    if (addr.googleimage || addr.imagefile) {
      //console.log(addr.googleimage, addr.imagefile);
    }
    return (
      <div className="col mb-4" key={`addr${addr._id}`}>
        <div className="card h-100">
          <div className="card-body-wrap h-100 no-image">
            <div className="card-header">
              Address - {addr.nickname ? addr.nickname : idx + 1}
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

            <div className="card-header">
              {addr.addrtype && addr.addrtype.indexOf('user') === -1 && (
                <Link
                  className="btn btn-secondary text-white"
                  to={`/eventsview/${addr._id}`}
                >
                  Offers
                </Link>
              )}
            </div>
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
                    View all offers available
                  </h5>
                  <div className="card-text">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{' '}
      <div className="row">
        <div className="colgrid col">
          <div className="card-group modern row row-cols-1 row-cols-md-2">
            {addressList}
          </div>
        </div>
      </div>
    </div>
  );
}
