import React, { useState } from 'react'
import { Button, Form, Input, Modal } from 'antd'

import './style.scss'

const Login = () => {
  const [visible, setVisible] = useState(false)

  const handleSetVisible = (val:boolean) => {
    setVisible(val)
  }

  const onFinish = (values:any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo:any) => {
    console.log('Failed:', errorInfo)
  }

  return <div className={'login'}>
    <a onClick={handleSetVisible.bind(null, true)}>登录</a>
    <Modal
      title={'登录'}
      className={'login-modal'}
      visible={visible}
      width={350}
      footer={null}
      onCancel={handleSetVisible.bind(null, false)}
    >
      <Form
        name={'login'}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入邮箱!' }]}>
          <Input placeholder={'请输入邮箱账号'} allowClear/>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password placeholder={'请输入密码'} allowClear/>
        </Form.Item>
        <Form.Item className={'login-button'}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
      <a className={'forget-password'}>忘记密码</a>
    </Modal>
  </div>
}
export default Login
