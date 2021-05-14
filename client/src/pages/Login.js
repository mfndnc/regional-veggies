import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Link, useParams, useHistory } from 'react-router-dom';
import auth from '../api/auth';
import { MyContextData } from '../context/auth';

export default function Login() {
  const { myState, setMyState } = useContext(MyContextData);
  let history = useHistory();
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('User Name is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(formOptions);

  function onSubmit(data, foo) {
    auth
      .login(data)
      .then((resp) => {
        auth.loggedContext(setMyState);
        history.push('/');
      })
      .catch((err) => {
        //foo.setSubmitting(false);
      });
    //foo.setSubmitting(false);
    //history.push('/');
    // display form data on success
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
    return false;
  }

  return (
    <div className="card m-3">
      <h5 className="card-header">Login</h5>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div className="form-group col-5">
              <label>User Name</label>
              <input
                name="username"
                type="text"
                {...register('username')}
                className={`form-control ${
                  errors.username ? 'is-invalid' : ''
                }`}
              />
              <div className="invalid-feedback">{errors.username?.message}</div>
            </div>

            <div className="form-group col">
              <label>Password</label>
              <input
                name="password"
                type="password"
                {...register('password')}
                className={`form-control ${
                  errors.password ? 'is-invalid' : ''
                }`}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary mr-1">
              Login
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
