import React from 'react';
import BaAuthApiClient from 'ba-auth-api-client';
import { useHistory } from 'react-router-dom';

import { SigninView } from './SigninView';
import { storage } from '../../../services/storage';
import { Storage } from '../../../consts/storage';
import { appPath } from '../../../services/app-path';

SigninViewContainer.propTypes = {};

const URL = 'http://localhost:5011';
const client = new BaAuthApiClient(URL, {
  storage: storage
});

export function SigninViewContainer(params) {
  const history = useHistory();

  async function login({ login, password }, setSubmitting) {
    try {
      const res = await client.login(login, password);
      console.log(
        'access_token recieved',
        storage.getItem(Storage.ACCESS_TOKEN_KEY)
      );
      console.log(JSON.stringify(res, null, 2));
      history.push(appPath.home());
    } catch (e) {
      console.log('Error', e);
    } finally {
      setSubmitting(false);
    }
  }

  return <SigninView onSubmit={login} />;
}