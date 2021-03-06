import React, { useEffect, useState } from 'react';
//import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import api from '../api';
import service from '../api/fileupload';
import ShowImage from './ShowImage';

export default function ProfileForm(props) {
  //let history = useHistory();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [justSaved, setJustSaved] = useState(false);
  const [genError, setGenError] = useState(false);
  const [imagefile, setImagefile] = useState('');
  const [imgError, setImgError] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState,
    formState: { errors },
  } = useForm(formOptions);

  const doCloseAccordion = () => {
    props.closeAccordion(false);
  };

  function onSubmit(data) {
    const formdata = { ...data, imagefile };
    //console.log(formdata);
    api
      .modifyUser(formdata)
      .then(() => setJustSaved(true))
      .catch(() => setGenError(true))
      .finally(() => {
        if (props.accordion) {
          props.onSave('user');
          //doCloseAccordion();
        } else {
          setTimeout(() => {
            setJustSaved(false);
            setGenError(false);
          }, 2000);
        }
      });
    return false;
  }

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append('imageUrl', e.target.files[0]);
    service
      .handleUpload(uploadData)
      .then((fileinfo) => setImagefile(fileinfo))
      .catch((err) => {
        setImgError(true);
        setError('imagefile', {
          type: 'server',
          message: err.response.data.message || 'Invalid!',
        });
      });
  };

  const fileuploadblock = (
    <div className="form-row">
      <div className="form-group col">
        <label>Picture</label>
        <input
          onChange={handleFileUpload}
          name="imagefile"
          type="file"
          className="form-control"
        />
        <div className="invalid-feedback">{errors.imagefile?.message}</div>
        <ShowImage maindata={user} imagefile={imagefile} />
      </div>
    </div>
  );

  useEffect(() => {
    api.getUser().then((res) => {
      //console.log('useEffect getUser', res.data);
      const fields = [
        'name',
        'note',
        'email',
        'phone',
        'phonesecond',
        'website',
        'skype',
        'whatsapp',
        'twitter',
      ];
      fields.forEach((field) => setValue(field, res.data[field]));
      setUser(res.data);
      setLoading(false);
    });
  }, [setValue]);

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
  const showImgError = imgError && (
    <div className="alert alert-danger" role="alert">
      Unable to Upload your file!!!
    </div>
  );

  const resetButton = props.accordion ? (
    <button
      type="button"
      onClick={() => {
        reset();
        doCloseAccordion();
      }}
      className="btn btn-secondary"
    >
      Close
    </button>
  ) : (
    <button type="button" onClick={() => reset()} className="btn btn-secondary">
      Reset
    </button>
  );

  return (
    <div className={props.accordion ? 'col' : 'card m-3'}>
      {!props.accordion && (
        <h5 className="card-header">Hallo {user.username}</h5>
      )}
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div className="form-group col">
              <label>Name</label>
              <input
                name="name"
                type="text"
                {...register('name')}
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.name?.message}</div>
            </div>
            <div className="form-group col">
              <label>Email</label>
              <input
                name="email"
                type="email"
                {...register('email')}
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.email?.message}</div>
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
              <label>Phonesecond</label>
              <input
                name="phonesecond"
                type="text"
                {...register('phonesecond')}
                className={`form-control ${
                  errors.phonesecond ? 'is-invalid' : ''
                }`}
              />
              <div className="invalid-feedback">
                {errors.phonesecond?.message}
              </div>
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
          {fileuploadblock}
          <div className="form-group">
            {showSavedMessage} {showGenError} {showImgError}
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
            {resetButton}
          </div>
        </form>
      </div>
    </div>
  );
}
