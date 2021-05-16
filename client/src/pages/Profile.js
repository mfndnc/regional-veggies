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
      <div class="col-lg-6" key={`addr${idx}`}>
        <div class="card ">
          <Collapse in={!openAddressObj[`id${idx}`]}>
            <div id={`collapseAddressY${idx}`}>
              <div class="card-header">Address {idx + 1}</div>
              <div class="card-body">
                <h5 class="card-title">Foo</h5>
                <p class="card-text">Bar</p>
              </div>
            </div>
          </Collapse>
          <div class={`card-${openAddressObj[ddd] ? 'header' : 'footer'}`}>
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
        <div class="col-lg-6">
          <div class="card ">
            <Collapse in={!openProfile}>
              <div id="collapseProfileY">
                <div class="card-header">Personal Data</div>
                <div class="card-body">
                  <h5 class="card-title">Foo</h5>
                  <p class="card-text">Bar</p>
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
            <div class={`card-${openProfile ? 'header' : 'footer'}`}>
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
        <div id="collapseAddressCard" class="col-lg-12">
          <div class="card ">
            <div class="card-header">New Address</div>
            <div class="card-body">
              {openAddress && <AddressForm accordion />}
            </div>
          </div>
        </div>
      </Collapse>

      <div className="row">{addressAccordion}</div>
    </div>
  );
}
