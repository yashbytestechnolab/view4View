import { LocalStorageKeys } from './../constants/LocalStorageKeys';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
//@ts-ignore
import { createUploadLink } from 'apollo-upload-client';
import { config } from '../config';
import * as LocalStorage from './LocalStorage';

const authLink = setContext(async (_, { headers }) => {
  const token = await LocalStorage.getValue(LocalStorageKeys.accessToken);
  return {
    headers: {
      ...headers,
      "x-token": token ? token : '',
    },
    
  };
});

const uploadLink = createUploadLink({
  uri: config.baseUrl,
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(uploadLink),
});
