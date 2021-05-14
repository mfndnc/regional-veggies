import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import api from '../api';

export default function EventForm() {
  let { addressId, eventId } = useParams();
  const isAddMode = !eventId;
  let history = useHistory();

  // const validationSchema = Yup.object().shape({});
  //const formOptions = { resolver: yupResolver(validationSchema) };
  //const formOptions = null;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    let { calendar, ...rest } = data;
    const calArr = [calendar];
    console.log('onSubmit EventForm', data, eventId, addressId);
    const doSave = isAddMode
      ? api.insert('event', { ...data, address: addressId, calendar: calArr })
      : api.modifyById('event', eventId, data);
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

  const [fullEvent, setFullEvent] = useState({});
  const [justSaved, setJustSaved] = useState(false);
  const [genError, setGenError] = useState(false);

  useEffect(() => {
    console.log('useEffect EventForm', eventId, addressId);
    if (!isAddMode) {
      api.getById('event', eventId).then((res) => {
        console.log('getById EventForm', res.data);
        const fields = ['note', 'promo'];
        fields.forEach((field) => setValue(field, res.data[field]));
        setFullEvent(res.data);
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
      <h5 className="card-header">Hallo {user.username}</h5>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
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

          <div className="form-row">
            <div className="form-group col">
              <label>Calendar</label>
              <input
                name="calendar"
                type="date"
                {...register('calendar')}
                className={`form-control ${
                  errors.calendar ? 'is-invalid' : ''
                }`}
              />
              <div className="invalid-feedback">{errors.calendar?.message}</div>
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
