import React, { useState } from 'react'
import { Button, Form, Input, Modal, message } from 'antd'
import './style.scss'
import { gql } from 'apollo-boost'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import { setToLocalStorage } from '../../utils'

// 登录
const SIGN_IN = gql`
    mutation signIn($email: String!, $password: String!) {
      signIn(input: {email: $email, password: $password}) {
        token
        user {
          id email avatar role verified name
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
        id email avatar role verified name
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

  const handleSetVisible = (val:boolean) => {
    setVisible(val)
  }

  console.log('emailStatus', emailStatus)

  const onFinish = async (values:any) => {
    console.log('Success:', values)
    const { email, password } = values
    await signIn({ variables: { email, password } })
      .then(({ data }) => {
        console.log('sign in success', data)
        setVisible(false)
        setToLocalStorage('token', data.signIn.token)
      })
      .catch(err => {
        console.log(err)
        throw err
      })
  }

  const getEmailStatus = async () => {
    await queryEmail({ variables: { email: form.getFieldsValue().email } })
  }

  return (<div className={'login'}>
    <a onClick={handleSetVisible.bind(null, true)}>登录</a>
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
          <Button type="primary" htmlType="submit">
            { emailStatus && !emailStatus?.email?.available ? '注册' : '登录'}
          </Button>
        </Form.Item>
      </Form>
      <a className={'forget-password'}>忘记密码</a>
    </Modal>
  </div>)
}
export default Login
