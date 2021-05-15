import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../context/auth';

export default function Profile() {
  const { authObj } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [fullAddress, setFullAddress] = useState([]);
  useEffect(() => {
    api
      .getAlls('address/user')
      .then((res) => {
        setFullAddress(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <h3>Loading...</h3>;
  return (
    <div>
      {authObj.username} {fullAddress[0].street}
    </div>
  );
}
