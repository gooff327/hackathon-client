import React, { useState } from 'react'
import { Form, Input, Modal, message } from 'antd'
import { Button } from '@chakra-ui/react'
import './style.scss'
import { gql } from 'apollo-boost'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import { setToLocalStorage } from '../../utils'
import { updateUser } from '../../store/user/actions'
import { setContext } from '@apollo/client/link/context'
import { useDispatch } from 'react-redux'

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

const Login = () => {
  const [signIn] = useMutation(SIGN_IN)
  const [signUp] = useMutation(SIGN_UP)
  const [queryEmail, { data: emailStatus }] = useLazyQuery(QUERY_EMAIL_STATUS)

  const [form] = Form.useForm()

  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const handleSetVisible = (val:boolean) => {
    setVisible(val)
  }

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
  const onFinish = async (values:any) => {
    const { email, password, name } = values
    if (!emailStatus?.email?.available) {
      await signIn({ variables: { email, password } })
        .then(({ data }) => {
          changeLoginState(data.signIn)
        })
        .catch(err => {
          throw err
        })
    } else {
      await signUp({ variables: { email, password, name } })
        .then(({ data }: any) => {
          changeLoginState(data.signUp)
        })
        .catch(err => {
          throw err
        })
    }
  }

  const getEmailStatus = async () => {
    await queryEmail({ variables: { email: form.getFieldsValue().email } })
  }

  return (<div className={'login'}>
    <Button className={'login-btn'} onClick={handleSetVisible.bind(null, true)}>登录/注册</Button>
    <Modal
      title= { emailStatus && !emailStatus?.email?.available ? '注册' : '登录'}
      className={'login-modal'}
      visible={visible}
      width={350}
      footer={null}
      onCancel={handleSetVisible.bind(null, false)}
    >
      <Form
        form={form}
        name={'login'}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: '请输入邮箱!' }]}>
          <Input placeholder={'请输入邮箱账号'} allowClear onBlur={ async () => {
            await getEmailStatus()
          }}/>
        </Form.Item>
        {
          emailStatus && !emailStatus?.email?.available ? <Form.Item
            name='name'
            rules={[{ required: true, message: '请设置用户名!' }]}>
            <Input placeholder={'这个邮箱还没注册哦，请设置用户名完成注册'} allowClear/>
          </Form.Item> : null
        }
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password placeholder={'请输入密码'} allowClear/>
        </Form.Item>
        <Form.Item className={'login-button'}>
          <Button type={'submit'}>
            { emailStatus && !emailStatus?.email?.available ? '注册' : '登录'}
          </Button>
        </Form.Item>
      </Form>
      <a className={'forget-password'}>忘记密码</a>
    </Modal>
  </div>)
}
export default Login
