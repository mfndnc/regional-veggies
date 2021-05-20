import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import api from '../api';

export default function EventForm(props) {
  let { addressId: addressIdParam, eventId: eventIdParam } = useParams();
  let addressId = props.addressId || addressIdParam || false;
  let eventId = props.eventId || eventIdParam || false;
  const isAddMode = !eventId;
  let history = useHistory();

  const [loading, setLoading] = useState(true);
  const [fullEvent, setFullEvent] = useState({});
  const [justSaved, setJustSaved] = useState(false);
  const [genError, setGenError] = useState(false);

  const innerSchema = {
    val: Yup.date().required('form.required_message'),
  };
  const fieldsSchema = Yup.object().shape({
    note: Yup.string().required(),
    calarr: Yup.array()
      .of(Yup.object().shape(innerSchema))
      .required('Must have fields'),
  });
  const otherformOptions = {
    defaultValues: {
      note: '',
      promo: '',
      calarr: [{ val: '' }],
    },
    validationSchema: fieldsSchema,
  };
  const validationSchema = Yup.object().shape({
    note: Yup.string().required(),
    calarr: Yup.array()
      .of(Yup.object().shape(innerSchema))
      .required('Must have fields')
      .min(1, 'Minimum of 1 field'),
  });
  const validationSchemaNODATE = Yup.object().shape({
    note: Yup.string().required(),
  });
  const formOptions = {
    defaultValues: {
      note: '',
      promo: '',
      calarr: [{ val: '' }],
    },
    resolver: yupResolver(validationSchema),
  };
  const formOptionsNODATE = {
    defaultValues: {
      note: '',
      promo: '',
    },
    resolver: yupResolver(validationSchemaNODATE),
  };

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState,
    formState: { errors },
  } = useForm(formOptionsNODATE);

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: 'calarr',
    }
  );

  const doCloseAccordion = () => {
    if (props.closeAccordionArgs) {
      props.closeAccordion(props.closeAccordionArgs);
    } else {
      props.closeAccordion(false);
    }
  };

  function onSubmit(data) {
    let { calarr, ...rest } = data;
    const calendar = calarr.map((cal) => cal.val);
    const submitdata = { ...data, calendar, address: addressId };
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(submitdata, null, 4));
    //console.log('onSubmit EventForm', submitdata, eventId, addressId);
    const doSave = isAddMode
      ? api.insert('event', submitdata)
      : api.modifyById('event', eventId, submitdata);
    doSave
      .then(() => setJustSaved(true))
      .catch(() => setGenError(true))
      .finally(() => {
        if (props.accordion) {
          props.onSave('event');
          doCloseAccordion();
        } else {
          setTimeout(() => {
            setJustSaved(false);
            setGenError(false);
          }, 2000);
        }
      });
    return false;
  }
  function doDelete() {
    api.deleteById('event', eventId).then((res) => {
      //console.log('DELETED', eventId, res.data);
      if (props.accordion) {
        props.onSave('event');
        doCloseAccordion();
      } else {
        history.push('/eventsmanage');
      }
    });
  }
  useEffect(() => {
    //console.log('useEffect EventForm', eventId, addressId);
    if (!isAddMode) {
      api.getById('event', eventId).then((res) => {
        ['note', 'promo'].forEach((field) => setValue(field, res.data[field]));
        ////////remove(0);
        ////////res.data['calendar'].forEach((el) => append({ val: el }));
        //alert('LOAD!! :-)\n\n' + JSON.stringify(res.data['calendar'], null, 4));
        setFullEvent(res.data);
        setLoading(false);
      });
      // } else if (fields.length === 0) {
      //   append({ id: 1, val: '' });
    } else {
      setLoading(false);
    }
  }, [addressId, eventId, isAddMode, setValue]);

  if (loading) return <div>Loading ...</div>;

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

  const dateDOMnotworking = (
    <>
      <div className="form-row mb-2 mt-2">
        <div className="col-sm-10">Calendar Offer</div>
        <div className="col-sm-2 pl-4">
          <button
            type="button"
            className="btn btn-primary mr-1"
            onClick={() => append({ val: '' })}
          >
            Add date
          </button>
        </div>
      </div>
      {fields.map((item, index) => (
        <div className="form-row" key={item.id}>
          <div className="form-group col">
            <div className="form-group row">
              <div className="col-sm-10">
                <input
                  type="date"
                  {...register(`calarr.${index}.val`)}
                  defaultValue={item.val.slice(0, 10)}
                  className={`form-control ${
                    errors[`calarr.${index}.val`] ? 'is-invalid' : ''
                  }`}
                />
                <div className="invalid-feedback">
                  {errors[`calarr.${index}.val`]?.message}
                </div>
              </div>
              <div className="col-sm-2">
                {index > 0 && (
                  <button
                    type="button"
                    className="btn btn-primary mr-1"
                    onClick={() => remove(index)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );

  const testbuttons = (
    <>
      <Link to={isAddMode ? '.' : '..'} className="btn btn-secondary">
        Cancel
      </Link>
      <Link to="." className="btn btn-secondary">
        down 1
      </Link>
    </>
  );

  const resetButton = props.accordion ? (
    <button
      type="button"
      onClick={() => doCloseAccordion()}
      className="btn btn-secondary"
    >
      Close
    </button>
  ) : (
    <button type="button" onClick={() => reset()} className="btn btn-secondary">
      Reset
    </button>
  );
  const deletebutton = !isAddMode && (
    <button
      type="button"
      onClick={() => doDelete()}
      className="btn btn-secondary mr-1"
    >
      Delete
    </button>
  );

  return (
    <div className={props.accordion ? 'col' : 'card m-3'}>
      {!props.accordion && <h5 className="card-header">Offer</h5>}
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div className="form-group col">
              <label>Products offered</label>
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
              <label>Additional Info</label>
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
            <button
              disabled={formState.isSubmitting}
              type="submit"
              className="btn btn-primary mr-1"
            >
              {formState.isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              Save
            </button>
            {deletebutton}
            {resetButton}
          </div>
        </form>
      </div>
    </div>
  );
}
