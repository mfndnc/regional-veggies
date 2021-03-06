import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import api from '../api';
import service from '../api/fileupload';
import ShowImage from './ShowImage';

export default function AddressForm(props) {
  let { addressId: addressIdParam } = useParams();
  let addressId = props.addressId || addressIdParam || false;
  const isAddMode = !addressId;
  let history = useHistory();

  const [loading, setLoading] = useState(true);
  const [fullAddress, setFullAddress] = useState({});
  const [justSaved, setJustSaved] = useState(false);
  const [genError, setGenError] = useState(false);
  const [addressTypes, setAddressTypes] = useState([]);
  const [imagefile, setImagefile] = useState('');
  const [imgError, setImgError] = useState(false);

  const validationSchema = Yup.object().shape({
    addrtype: Yup.string().required(),
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
    formState,
    formState: { errors },
  } = useForm(formOptions);

  const doCloseAccordion = () => {
    if (props.closeAccordionArgs) {
      props.closeAccordion(props.closeAccordionArgs);
    } else {
      props.closeAccordion(false);
    }
  };

  function onSubmit(data) {
    const formdata = { ...data, imagefile };
    //console.log('onSubmit AddressForm', formdata, addressId);
    const doSave = isAddMode
      ? api.insert('address', formdata)
      : api.modifyById('address', addressId, formdata);
    doSave
      .then(() => setJustSaved(true))
      .catch(() => setGenError(true))
      .finally(() => {
        if (props.accordion) {
          props.onSave('address');
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
    api.deleteById('address', addressId).then((res) => {
      //console.log('DELETED addressId', addressId, res.data);
      if (props.accordion) {
        props.onSave('address');
        doCloseAccordion();
      } else {
        history.push('/profile');
      }
    });
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
        <ShowImage maindata={fullAddress} imagefile={imagefile} />
      </div>
    </div>
  );

  useEffect(() => {
    //console.log('useEffect AddressForm', addressId);
    api
      .getAlls('misc/addrtypes')
      .then((addrtypes) => {
        //console.log(addrtypes);
        setAddressTypes(addrtypes.data);
      })
      .finally(() => {
        if (!isAddMode) {
          api.getById('address', addressId).then((res) => {
            [
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
              'name',
              'nickname',
              'addrtype',
            ].forEach((field) => setValue(field, res.data[field]));
            setFullAddress(res.data);
            setLoading(false);
          });
        } else {
          setLoading(false);
        }
      });
  }, [addressId, isAddMode, setValue]);

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
    <Button variant="secondary" onClick={() => doCloseAccordion()}>
      Close
    </Button>
  ) : (
    <Button variant="secondary" onClick={() => reset()}>
      Reset
    </Button>
  );
  const deletebutton = !isAddMode && (
    <Button variant="secondary" onClick={() => doDelete()} className="mr-1">
      Delete
    </Button>
  );

  return (
    <div className={props.accordion ? 'col' : 'card m-3'}>
      {!props.accordion && <h5 className="card-header">Address</h5>}

      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div className="form-group col-8">
              <label>Main purpose of address</label>
              <select
                name="addrtype"
                {...register('addrtype')}
                className={`form-control ${
                  errors.addrtype ? 'is-invalid' : ''
                }`}
              >
                {isAddMode && <option value="">-- please select --</option>}
                {addressTypes.map((addressType) => (
                  <option key={addressType._id} value={addressType.abr}>
                    {addressType.text}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">{errors.addrtype?.message}</div>
            </div>
            <div className="form-group col">
              <label>Identifier</label>
              <input
                name="nickname"
                type="text"
                {...register('nickname')}
                className={`form-control ${
                  errors.nickname ? 'is-invalid' : ''
                }`}
              />
              <div className="invalid-feedback">{errors.nickname?.message}</div>
            </div>
          </div>{' '}
          <div className="form-row">
            {' '}
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
          </div>{' '}
          <div className="form-row">
            <div className="form-group col-9">
              <label>Street & Number</label>
              <input
                name="street"
                type="text"
                {...register('street')}
                className={`form-control ${errors.street ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.street?.message}</div>
            </div>
            <div className="form-group col">
              <label>Addition</label>
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
            {deletebutton}
            {resetButton}
          </div>
        </form>
      </div>
    </div>
  );
}
