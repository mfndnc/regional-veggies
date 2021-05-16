import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Button } from 'react-bootstrap';
import api from '../api';
import auth from '../api/auth';
import { AuthContext } from '../context/auth';
import ProfileForm from '../components/ProfileForm';
import AddressForm from '../components/AddressForm';

export default function Profile() {
  const { authObj, setAuthObj } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [fullAddress, setFullAddress] = useState([]);
  const [openProfile, setOpenProfile] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [openAddressObj, setOpenAddressObj] = useState({});
  const [childTriggeredSave, setChildTriggeredSave] = useState(false);
  useEffect(() => {
    api
      .getAlls('address/user')
      .then((res) => {
        setFullAddress(res.data);
        const tmpaddr = {};
        res.data.forEach((addr, idx) => {
          tmpaddr[`id${idx}`] = false;
        });
        setOpenAddressObj(tmpaddr);
      })
      .finally(() => setLoading(false));
  }, [authObj, childTriggeredSave]);

  const doCloseAccordionAddress = (args) => {
    setOpenAddressObj((prevSt) => ({
      ...prevSt,
      [args]: !prevSt[args],
    }));
  };
  const afterChildSave = (args) => {
    if (args === 'user') {
      auth.loggedContext(setAuthObj);
    } else {
      setChildTriggeredSave(!childTriggeredSave);
    }
  };

  const addressAccordion = fullAddress.map((addr, idx) => {
    let ddd = `id${idx}`;
    return (
      <div className="col-lg-6" key={`addr${idx}`}>
        <div className="card ">
          <Collapse in={!openAddressObj[`id${idx}`]}>
            <div id={`collapseAddressY${idx}`}>
              <div className="card-header">
                Address - {addr.name ? addr.name : idx + 1}
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
          <div className={`card-${openAddressObj[ddd] ? 'header' : 'footer'}`}>
            <Button
              onClick={() =>
                setOpenAddressObj((prevSt) => ({
                  ...prevSt,
                  [ddd]: !prevSt[ddd],
                }))
              }
              aria-controls={`collapseAddress${idx} collapseAddressY${idx}`}
              aria-expanded={openAddressObj[ddd]}
            >
              {openAddressObj[ddd] ? 'Close' : 'Mofidy'}
            </Button>
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
    );
  });

  if (loading) return <h3>Loading...</h3>;
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="card ">
            <Collapse in={!openProfile}>
              <div id="collapseProfileY">
                <div className="card-header">Personal Data</div>
                <div className="card-body">
                  <h5 className="card-title">{authObj.name}</h5>
                  <p className="card-text">{authObj.note}</p>
                  <p className="card-text">
                    {authObj.email} {authObj.phone} ...
                  </p>
                  {!openAddress && (
                    <Button
                      onClick={() => setOpenAddress(!openAddress)}
                      aria-controls="collapseAddressCard"
                      aria-expanded={openAddress}
                    >
                      New Address
                    </Button>
                  )}
                </div>
              </div>
            </Collapse>
            <div className={`card-${openProfile ? 'header' : 'footer'}`}>
              <Button
                onClick={() => setOpenProfile(!openProfile)}
                aria-controls="collapseProfile collapseProfileY"
                aria-expanded={openProfile}
              >
                {openProfile ? 'Close' : 'Mofidy'}
              </Button>
            </div>
            <Collapse in={openProfile}>
              <div id="collapseProfile">
                {openProfile && (
                  <ProfileForm
                    accordion
                    onSave={afterChildSave}
                    closeAccordion={setOpenProfile}
                  />
                )}
              </div>
            </Collapse>
          </div>
        </div>
      </div>

      <Collapse in={openAddress}>
        <div id="collapseAddressCard" className="row">
          <div className="col-lg-12">
            <div className="card ">
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
      </Collapse>

      <div className="row">{addressAccordion}</div>
    </div>
  );
}
