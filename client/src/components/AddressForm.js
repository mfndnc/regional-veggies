import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import api from '../api';
import { phoneRegExp } from '../services/functions';

export default function AddressForm() {
  let { addressId } = useParams();
  const isAddMode = !addressId;
  let history = useHistory();

  const validationSchema = Yup.object().shape({
    street: Yup.string().required(),
    city: Yup.string().required(),
    zipcode: Yup.string().required(),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm(formOptions);

  function onSubmit(data) {
    console.log('onSubmit', data);
    const doSave = isAddMode
      ? api.insert('address', data)
      : api.modifyById('address', addressId, data);
    doSave
      .then(() => setJustSaved(true))
      .catch(() => setGenError(true))
      .finally(() => {
        setTimeout(() => {
          setJustSaved(false);
          setGenError(false);
        }, 2000);
      });
    return false;
  }

  const [fullAddress, setFullAddress] = useState({});
  const [justSaved, setJustSaved] = useState(false);
  const [genError, setGenError] = useState(false);

  useEffect(() => {
    console.log('useEffect AddressForm', addressId);
    if (!isAddMode) {
      api.getById('address', addressId).then((res) => {
        console.log('useEffect address', res.data);
        const fields = [
          'note',
          'promo',
          'street',
          'suite',
          'city',
          'zipcode',
          'phone',
          'website',
          'skype',
          'whatsapp',
          'twitter',
        ];
        fields.forEach((field) => setValue(field, res.data[field]));
        setFullAddress(res.data);
      });
    }
  }, []);

  const showSavedMessage = justSaved && (
    <div className="alert alert-success" role="alert">
      Saved!
    </div>
  );
  const showGenError = genError && (
    <div className="alert alert-danger" role="alert">
      An error occured!!!
    </div>
  );

  return (
    <div className="card m-3">
      <h5 className="card-header">Address</h5>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div className="form-group col-9">
              <label>Street</label>
              <input
                name="street"
                type="text"
                {...register('street')}
                className={`form-control ${errors.street ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.street?.message}</div>
            </div>
            <div className="form-group col">
              <label>Suite</label>
              <input
                name="suite"
                type="text"
                {...register('suite')}
                className={`form-control ${errors.suite ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.suite?.message}</div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-7">
              <label>City</label>
              <input
                name="city"
                type="text"
                {...register('city')}
                className={`form-control ${errors.city ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.city?.message}</div>
            </div>
            <div className="form-group col">
              <label>Zipcode</label>
              <input
                name="zipcode"
                type="text"
                {...register('zipcode')}
                className={`form-control ${errors.zipcode ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.zipcode?.message}</div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col">
              <label>Website</label>
              <input
                name="website"
                type="text"
                {...register('website')}
                className={`form-control ${errors.website ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.website?.message}</div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col">
              <label>Phone</label>
              <input
                name="phone"
                type="text"
                {...register('phone')}
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.phone?.message}</div>
            </div>
            <div className="form-group col">
              <label>Skype</label>
              <input
                name="skype"
                type="text"
                {...register('skype')}
                className={`form-control ${errors.skype ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.skype?.message}</div>
            </div>
            <div className="form-group col">
              <label>Whatsapp</label>
              <input
                name="whatsapp"
                type="text"
                {...register('whatsapp')}
                className={`form-control ${
                  errors.whatsapp ? 'is-invalid' : ''
                }`}
              />
              <div className="invalid-feedback">{errors.whatsapp?.message}</div>
            </div>
            <div className="form-group col">
              <label>Twitter</label>
              <input
                name="twitter"
                type="text"
                {...register('twitter')}
                className={`form-control ${errors.twitter ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.twitter?.message}</div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col">
              <label>Note</label>
              <input
                name="note"
                type="text"
                {...register('note')}
                className={`form-control ${errors.note ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.note?.message}</div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col">
              <label>Promo</label>
              <input
                name="promo"
                type="text"
                {...register('promo')}
                className={`form-control ${errors.promo ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.promo?.message}</div>
            </div>
          </div>

          <div className="form-group">
            {showSavedMessage} {showGenError}
            <button type="submit" className="btn btn-primary mr-1">
              Save
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="btn btn-secondary"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
