import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import auth from '../api/auth';
import { AuthContext } from '../context/auth';

export default function Login() {
  const { authObj, setAuthObj } = useContext(AuthContext);
  let history = useHistory();

  useEffect(() => {
    if (authObj.logged) history.push('/');
  }, [authObj, history]);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('User Name is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm(formOptions);

  function onSubmit(data, foo) {
    auth
      .signup(data)
      .then(() => auth.loggedContext(setAuthObj))
      .catch((err) => {
        setError('username', {
          type: 'server',
          message: err.response.data.message || 'Invalid!',
        });
      });
    return false;
  }

  return (
    <div className="card m-3">
      <h5 className="card-header">Login</h5>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div className="form-group col">
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
              <label>Name</label>
              <input
                name="name"
                type="text"
                {...register('name')}
                className={`form-control ${
                  errors && errors.name ? 'is-invalid' : ''
                }`}
              />
              <div className="invalid-feedback">
                {errors && errors.name?.message}
              </div>
            </div>
          </div>

          <div className="form-row">
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
            <div className="form-group col">
              <label>Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                className={`form-control ${
                  errors.confirmPassword ? 'is-invalid' : ''
                }`}
              />
              <div className="invalid-feedback">
                {errors.confirmPassword?.message}
              </div>
            </div>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary mr-1">
              Sign Up
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
