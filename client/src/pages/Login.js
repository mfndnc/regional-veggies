import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
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
      .login(data)
      .then(() => auth.loggedContext(setAuthObj))
      .catch((err) => {
        setError('username', {
          type: 'server',
          message: err.response.data.message || 'Invalid!',
        });
        setError('password', {
          type: 'server',
          message: err.response.data.message || 'Invalid!',
        });
      });
    return false;
  }

  return (
    <div className="row mt-2">
      <div className="colgrid col">
        <div className="card-group modern row row-cols-1 row-cols-md-1">
          <div className="col mb-4">
            <div className="card h-100">
              <div className="card-body-wrap h-100 no-image">
                <div className="card-header">Login</div>
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
                        <div className="invalid-feedback">
                          {errors.username?.message}
                        </div>
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
                        <div className="invalid-feedback">
                          {errors.password?.message}
                        </div>
                      </div>
                      <div className="invalid-feedback">
                        {errors.wholeform?.message}
                      </div>
                    </div>
                    <div className="form-group">
                      <Button as="input" type="submit" value="Login" />{' '}
                      <Button variant="secondary" onClick={() => reset()}>
                        Reset
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
