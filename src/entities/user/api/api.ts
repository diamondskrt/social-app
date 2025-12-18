import { api } from '~/shared/api'

import {
  type SignUpFormValues,
  type User,
  type logInFormValues,
} from '../model'

const signUp = (data: SignUpFormValues) => {
  return api<User>('/auth/sign-up', {
    method: 'POST',
    body: data,
  })
}

const logIn = (data: logInFormValues) => {
  return api<User>('/auth/log-in', {
    method: 'POST',
    body: data,
  })
}

const logOut = () => {
  return api<void>('/auth/log-out', { method: 'POST' })
}

const getProfile = () => {
  return api<User>('/auth/profile')
}

export { signUp, logIn, logOut, getProfile }
