import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { Header, Footer, Modal, Error } from './components'
import { Auth, Reg, Users, Post, Main } from './pages'
import { useLayoutEffect } from 'react'
import { setUser } from './actions'
import styled from 'styled-components'

const Content = styled.div`
  padding: 20px;
`

export const App = () => {
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    const currentUserDataJSON = sessionStorage.getItem('userData')

    if (!currentUserDataJSON) {
      return
    }

    const currentUserData = JSON.parse(currentUserDataJSON)

    dispatch(
      setUser({
        ...currentUserData,
        roleId: Number(currentUserData.roleId),
      }),
    )
  }, [dispatch])

  return (
    <>
      <Header />
      <Content>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Auth />} />
          <Route path='/register' element={<Reg />} />
          <Route path='/users' element={<Users />} />
          <Route path='/user/:id' element={<div>User Page</div>} />
          <Route path='/post' element={<Post />} />
          <Route path='/post/:id' element={<Post />} />
          <Route path='/post/:id/edit' element={<Post />} />
          <Route path='*' element={<Error error='Page not found' />} />
        </Routes>
      </Content>
      <Footer />
      <Modal />
    </>
  )
}
