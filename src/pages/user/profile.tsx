import React, { useEffect } from 'react'
import { Form, Input, Button, Upload, Spin, Avatar } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useSelector, useDispatch } from 'react-redux'
import './profile.scss'
import { RootState } from '../../store/rootReducers'
import { User } from '../../store/user/types'
import { setToLocalStorage } from '../../utils'
import { updateUser } from '../../store/user/actions'

const UPLOAD_IMAGE = gql`
  mutation sendImageToCloud($file: Image!) {
    sendImageToCloud(file: $file) {
      message,
      res
    }
  }
`
const UPDATE_USER = gql`
    mutation updateMe($avatar: String, $desc: String) {
      updateMe(input: {avatar: $avatar, desc: $desc, verified: false}) {
        _id
        name
        avatar
        email
        verified
        desc
        role
      }
    }
`

interface UploadConProps {
  value?: string;
  onChange?: (value: string) => void;
}

const UploadCon: React.FC<UploadConProps> = (props) => {
  const { value, onChange } = props
  const [uploadImage, { loading }] = useMutation(UPLOAD_IMAGE)

  const uploadProps = {
    name: 'file',
    action: '',
    showUploadList: false,
    customRequest: (options: any) => {
      const { file } = options
      uploadImage({ variables: { file } })
        .then(({ data: { sendImageToCloud: { message, res } } }) => {
          if (onChange) {
            onChange(res)
          }
        })
    }
  }

  return <div>
    <Spin spinning={loading}>
      <Avatar
        src={value}
        className='avatar'
        shape="square"
        size={80}>Z</Avatar>
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>点击上传</Button>
      </Upload>
    </Spin>
  </div>
}

const Profile = (props: any) => {
  const [form] = Form.useForm()
  const [updateUserMutation, { loading }] = useMutation(UPDATE_USER)
  const dispatch = useDispatch()
  const user = useSelector<RootState, User>(state => state.user.me)
  const { avatar, name, email, desc } = user
  form.setFieldsValue({
    avatar,
    name,
    email,
    desc
  })

  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 12 }
  }
  const tailLayout = {
    wrapperCol: { offset: 3, span: 12 }
  }

  const onFinish = (values: any) => {
    const { avatar, desc, email, name } = values
    updateUserMutation({ variables: { avatar, desc } }).then(res => {
      const { _id, name, avatar, role, verified, desc } = res.data.updateMe
      const user = { id: _id, email, avatar, name, role, verified, desc }
      setToLocalStorage('me', user)
      dispatch(updateUser(user))
      props.history.push('/user')
    })
  }

  return (<div className='profile-page'>
    <h1>个人资料</h1>
    <Form
      {...layout}
      form={form}
      name="basic"
      labelAlign='left'
      onFinish={onFinish}
    >
      <Form.Item
        {...layout}
        label='头像'
        name='avatar'
      >
        <UploadCon />
      </Form.Item>
      <Form.Item
        {...layout}
        label="用户名"
        name="name"
        rules={[{ message: '请输入用户名!' }]}
      >
        <Input disabled />
      </Form.Item>
      <Form.Item
        label="邮箱"
        name="email"
      >
        <Input disabled />
      </Form.Item>
      <Form.Item
        label="个人简介"
        name="desc"
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  </div>)
}

export default Profile
