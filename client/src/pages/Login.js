import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import moon from '../assets/img/9.png';

import Auth from '../utils/auth';
const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main className="flex-row justify-center mb-4 p-4">
      <div className="col-12 cards col-md-6 my-auto">
        <div className="card-3 w-100 form-card">
          <div className="text-center w-100">
          <img src={moon} alt="moon and stars" height="200px;"/>
          <h2 className="card-header text-big mb-2 text-shadow text-white p-1">Login</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <input
                className="input-style my-2 w-100 p-2 border-radius"
                placeholder="Your email"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
              />
              <br />
              <input
                className="input-style mb-2 w-100 p-2 border-radius"
                placeholder="******"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
              />
              <button className="btn d-block w-100" type="submit">
                Submit
              </button>
            </form>

            {error && <div>Login failed</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
