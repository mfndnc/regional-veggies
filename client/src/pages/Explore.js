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

  useEffect(() => {
    api
      .getAlls('address')
      .then((res) => {
        setFullAddress(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

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
    <div className="container-xl">
      <div className="row">
        <div className="col">
          <div className="panel-body">
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
        <div className="col">{selected && <div>{selected.name}</div>}</div>
      </div>
      <div className="row">
        <div className="col" style={containerStyle}></div>
      </div>
    </div>
  );
}

//<GoogleMap markers={fullAddress} childtoParent={doChildtoParent} selectedMarker={selected} />
