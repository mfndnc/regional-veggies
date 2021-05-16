import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Button } from 'react-bootstrap';
import api from '../api';
import { AuthContext } from '../context/auth';
import ProfileForm from '../components/ProfileForm';
import AddressForm from '../components/AddressForm';

export default function Profile() {
  const { authObj } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [fullAddress, setFullAddress] = useState([]);
  const [openProfile, setOpenProfile] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [openAddressObj, setOpenAddressObj] = useState({});
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
  }, []);

  const addressAccordion = fullAddress.map((addr, idx) => {
    let ddd = `id${idx}`;
    return (
      <div className="col-lg-6" key={`addr${idx}`}>
        <div className="card ">
          <Collapse in={!openAddressObj[`id${idx}`]}>
            <div id={`collapseAddressY${idx}`}>
              <div className="card-header">Address {idx + 1}</div>
              <div className="card-body">
                <h5 className="card-title">Foo</h5>
                <p className="card-text">Bar</p>
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
                <AddressForm accordion addressId={addr._id} />
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
                  <h5 className="card-title">Foo</h5>
                  <p className="card-text">Bar</p>
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
                {openProfile && <ProfileForm accordion />}
              </div>
            </Collapse>
          </div>
        </div>
      </div>
      <Collapse in={openAddress}>
        <div id="collapseAddressCard" className="col-lg-12">
          <div className="card ">
            <div className="card-header">New Address</div>
            <div className="card-body">
              {openAddress && <AddressForm accordion />}
            </div>
          </div>
        </div>
      </Collapse>

      <div className="row">{addressAccordion}</div>
    </div>
  );
}
