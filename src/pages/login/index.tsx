import React, { useState } from 'react'
import { Modal, Input, Button, FormControl, ModalHeader, ModalOverlay, ModalContent, ModalBody, useToast } from '@chakra-ui/react'
import './style.scss'
import { gql } from 'apollo-boost'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import { setToLocalStorage } from '../../utils'
import { updateUser } from '../../store/user/actions'
import { setContext } from '@apollo/client/link/context'
import { useDispatch } from 'react-redux'
import { Formik, useFormik } from 'formik'
import { extend } from 'dayjs'

// 登录
const SIGN_IN = gql`
    mutation signIn($email: String!, $password: String!) {
      signIn(input: {email: $email, password: $password}) {
        token
        user {
          _id email avatar role verified name
        }
      }
    }
`

// 注册
const SIGN_UP = gql`
  mutation signUp($email: String!, $password: String!, $name: String!) {
    signUp( input: {email: $email,password: $password,name: $name
    }) {
      token
      user {
        _id email avatar role verified name
      }
    }
  }
`

// 查询账号是否已注册
const QUERY_EMAIL_STATUS = gql`
    query queryEmail($email: String!) {
      email(email:$email) {
        available
      }
    }
`
const initialValues = { email: '', password: '', name: '' }
const Login = () => {
  const toast = useToast()
  const [signIn] = useMutation(SIGN_IN)
  const [signUp] = useMutation(SIGN_UP)
  const [queryEmail, { data: emailStatus }] = useLazyQuery(QUERY_EMAIL_STATUS)

  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const changeLoginState = (data: any) => {
    setVisible(false)
    setToLocalStorage('token', data.token)
    const { _id, email, avatar, role, verified, name, desc } = data.user
    const user = { id: _id, email, avatar, name, role, verified, desc }
    setToLocalStorage('me', user)
    dispatch(updateUser(user))
    setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: data.token
        }
      }
    })
  }

  const onSubmit = async (values:any) => {
    const { email, password, name } = values
    if (emailStatus?.email?.available) {
      await signIn({ variables: { email, password } })
        .then(({ data }) => {
          changeLoginState(data.signIn)
        })
        .catch(err => {
          toast({ status: 'error', description: err.message })
        })
    } else {
      await signUp({ variables: { email, password, name } })
        .then(({ data }: any) => {
          changeLoginState(data.signUp)
        })
        .catch(err => {
          toast({ status: 'error', description: err.message })
        })
    }
  }

  const formik = useFormik({
    initialValues,
    onSubmit
  })
  const handleSetVisible = (val:boolean) => {
    setVisible(val)
  }

  const getEmailStatus = async () => {
    queryEmail({ variables: { email: formik.values.email } })
  }

  return (<div className={'login'}>
    <Button className={'login-btn'} onClick={handleSetVisible.bind(null, true)}>登录/注册</Button>
    <Modal
      blockScrollOnMount={false}
      isOpen={visible}
      size={'md'}
      onClose={handleSetVisible.bind(null, false)}
    >
      <ModalOverlay/>
      <ModalContent p={10} className={'login-modal'}>
        <ModalHeader>{ emailStatus && !emailStatus?.email?.available ? '注册' : '登录'}</ModalHeader>
        <ModalBody>
          <form name={'login'} onSubmit={formik.handleSubmit}>
            <label>邮箱</label>
            <Input
              name="email"
              value={formik.values.email} placeholder={'请输入邮箱账号'} onChange={formik.handleChange}
              onBlur={getEmailStatus}/>
            {
              emailStatus && !emailStatus?.email?.available && <>
                <label>用户名</label>
                <Input
                  name={'name'}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  placeholder={'这个邮箱还没注册哦，请设置用户名完成注册'}
                />
              </>
            }
            <label>密码</label>
            <Input
              type={'password'}
              name={'password'}
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder={'请输入密码'}
            />
            <FormControl className={'login-button'}>
              <Button type={'submit'}>
                { emailStatus && !emailStatus?.email?.available ? '注册' : '登录'}
              </Button>
            </FormControl>
          </form>
          <a className={'forget-password'}>忘记密码</a>
        </ModalBody>

      </ModalContent>
    </Modal>
  </div>)
}
export default Login
