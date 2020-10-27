import React, { useState } from 'react'
import { Button, Dropdown, Form, Input, Menu, Modal } from 'antd'
import { DownOutlined, FormOutlined } from '@ant-design/icons'
import { PostTypeTest } from '../../constants/constant'
import './style.scss'

interface Values {
  title: string
  content: string
  type: string
}

interface EditPostFormProps {
  visible:boolean
  onCreate: (values: Values)=>void
  onCancel: () => void
}

const EditPostForm:React.FC<EditPostFormProps> = ({
  visible,
  onCreate,
  onCancel
}) => {
  const [form] = Form.useForm()

  const [postType, setPostType] = useState({ value: 'water-water' })

  const onClick = (value:any) => {
    console.log(value.key)
    setPostType({
      value: value.key
    })
  }

  const menu = (
    <Menu onClick={onClick}>
      {
        Object.entries(PostTypeTest).map(([key, value]) =>
          <Menu.Item key={key}>
            <a>{value}</a>
          </Menu.Item>)
      }
    </Menu>
  )

  const onFinish = (values:any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo:any) => {
    console.log('Failed:', errorInfo)
  }

  const onOk = () => {
    form.validateFields()
      .then(values => {
        form.resetFields()
        onCreate(values as any)
      })
      .catch(err => {
        console.log('Validate failed', err)
      })
  }

  return (
    <Modal
      visible={visible}
      closable={false}
      className={'post-modal'}
      okText={'确认发布'}
      cancelText={'取消'}
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form
        form={form}
        name={'post'}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name={'title'}
          rules={[{ required: true, message: '请输入标题' }]}>
          <Input placeholder={'请输入标题'}/>
        </Form.Item>
        <Form.Item
          name={'type'}
        >
          <span>选择一个帖子分类：</span>
          <Dropdown overlay={menu} trigger={['click']}>
            <a onClick={e => e.preventDefault()}>
              {(PostTypeTest as any)[postType.value]} <DownOutlined/>
            </a>
          </Dropdown>
        </Form.Item>
        <Form.Item
          name={'content'}
          rules={[{ required: true, message: '发布内容不能为空！' }]}>
          <Input.TextArea rows={6} placeholder={'这里输入内容~'}/>
        </Form.Item>
      </Form>
    </Modal>)
}

const EditPostModal = () => {
  const [visible, setVisible] = useState(false)

  const onCreate = (values:Values) => {
    console.log(values)
    setVisible(false)
  }

  return <>
    <Button type={'primary'} onClick={() => setVisible(true)}>发布<FormOutlined/></Button>
    <EditPostForm
      visible={visible}
      onCreate={onCreate}
      onCancel={() => setVisible(false)}
    />
  </>
}

export default EditPostModal
