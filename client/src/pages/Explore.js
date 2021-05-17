import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Button } from 'react-bootstrap';
import api from '../api';
import GoogleMap from '../components/GoogleMap';

const containerStyle = {
  width: '100vw',
  height: '60vh',
  backgroundColor: 'blue',
};

export default function Explore() {
  const [loading, setLoading] = useState(true);
  const [fullAddress, setFullAddress] = useState([]);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    api
      .getAlls('address')
      .then((res) => {
        setFullAddress(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => setQuery(e.target.value);

  const doChildtoParent = (args) => {
    console.log(args);
    setSelected(args);
  };
  const clickNameList = (e) => {
    console.log(e.target.dataset.id);
    api
      .getById('address', e.target.dataset.id)
      .then((res) => setSelected(res.data))
      .finally(() => setLoading(false));
  };

  if (loading) return <h3>Loading...</h3>;

  return (
    <div className="container-fluid">
      {''}
      <div className="row">
        <div className="col" style={containerStyle}></div>
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
                      <div className="form-group">
                        <div className="form-label-group">
                          <input
                            placeholder="Search"
                            className="form-control"
                            id="query"
                            type="text"
                            name="query"
                            value={query}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
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
              <div className="col mb-4">
                <div className="card h-100 text-left">
                  <div className="card-body-wrap h-100 no-image">
                    <div className="card-body">
                      <h4 className="card-title">Selected</h4>
                      <h5 className="card-subtitle mb-2 text-muted">
                        {selected.name}
                      </h5>
                      <div className="card-text">Lorem ipsum dolor sit.</div>
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
// <div className="col"><GoogleMap markers={fullAddress} childtoParent={doChildtoParent} selectedMarker={selected} /></div>
//<GoogleMap markers={fullAddress} childtoParent={doChildtoParent} selectedMarker={selected} />
