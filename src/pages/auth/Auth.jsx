import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Link, Navigate } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input } from '../../components'
import { server } from '../../bff'
import { setUser } from '../../actions'
import { selectUserRole } from '../../selectors'
import { ROLE } from '../../constants'
import { useResetForm } from '../../hooks'

import styled from 'styled-components'

const authFromSchema = yup.object().shape({
  login: yup
    .string()
    .required('Логин обязателен')
    .matches(/^\w+$/, 'Логин должен состоять из букв и цифр')
    .min(3, 'Логин должен быть не менее 3 символов')
    .max(20, 'Логин должен быть не более 20 символов'),
  password: yup
    .string()
    .required('Пароль обязателен')
    .matches(/^[\w\$#%]+$/, 'Пароль должен состоять из букв и цифр, #, %')
    .min(6, 'Пароль должен быть не менее 6 символов')
    .max(20, 'Пароль должен быть не более 20 символов'),
})

const AuthContainer = ({ className }) => {
  const dispatch = useDispatch()

  const [error, setError] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      login: '',
      password: '',
    },
    resolver: yupResolver(authFromSchema),
  })

  const roleId = useSelector(selectUserRole)

  useResetForm(reset)

  const onSubmit = ({ login, password }) => {
    server.authorize(login, password).then(({ error, res }) => {
      if (error) {
        setError(error)
        return
      }
      reset()
      dispatch(setUser(res))
      sessionStorage.setItem('userData', JSON.stringify(res))
    })
  }

  const formError = errors?.login || errors?.password
  const errMessage = error || formError?.message

  if (roleId !== ROLE.GUEST) {
    return <Navigate to='/' />
  }

  return (
    <div className={className}>
      <h2>Auth</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type='text'
          placeholder='login'
          {...register('login', { onChange: () => setError(null) })}
        />
        <Input
          type='password'
          placeholder='password'
          {...register('password', { onChange: () => setError(null) })}
        />

        <Button type='submit' disabled={!!formError}>
          Login
        </Button>

        {errMessage && <div className='error'>{errMessage}</div>}

        <Link to={'/register'}>Register</Link>
      </form>
    </div>
  )
}

export const Auth = styled(AuthContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 300px;

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .error {
    color: red;
    margin-top: 10px;
  }
`
