import React, { useState } from 'react'
import { Button, Col, Dropdown, Form, Input, Menu, message, Modal, Row, Switch, Upload } from 'antd'
import { DownOutlined, PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { EditIcon } from '@chakra-ui/icons'
import './style.scss'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { IconButton } from '@chakra-ui/react'
import { PostTypeTest } from '../../constants'

interface Values {
  title: string
  content: string
  category: string
  images: string[]
  isPublic: boolean
}

interface EditPostFormProps {
  visible:boolean
  onCreate: (values: Values)=>void
  onCancel: () => void
}

const UPLOAD_IMAGE = gql`
    mutation sendImageToCloud($file: Image!) {
      sendImageToCloud(file: $file) {
        message,
        res
      }
    }
`

const CREATE_POST = gql`
    mutation createPost($input: NewPostInput!) {
      createPost(input: $input) {
        _id,
      }
    }
`

const EditPostForm:React.FC<EditPostFormProps> = ({
  visible,
  onCreate,
  onCancel
}) => {
  const [form] = Form.useForm()

  const [postType, setPostType] = useState({ value: 'roast' })

  const [uploadImage] = useMutation(UPLOAD_IMAGE)

  const [fileList, setFileList] = useState([])
  const [postImages, setPostImages] = useState([])

  const onClick = (value:any) => {
    setPostType({
      value: value.key
    })
    form.setFieldsValue({
      ...form.getFieldsValue(),
      category: value.key
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

  const onOk = () => {
    form.validateFields()
      .then(values => {
        console.log(values)
        const input = {
          ...values,
          images: postImages
        }
        onCreate(input as any)
      })
      .catch(err => {
        console.log('Validate failed', err)
      })
  }

  const onCancel1 = () => {
    onCancel()
  }

  const uploadButton = (
    <div>
      <PlusOutlined/>
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  )

  const handleUploadImg = (data:any) => {
    setFileList(data.fileList)
  }

  const uploadProps = {
    beforeUpload: (file: File) => {
      uploadImage({ variables: { file } })
        .then(({ data: { sendImageToCloud: { message, res } } }) => {
          console.info(message)
          setPostImages((postImages || []).concat(res))
        })
        .catch(() => {
          console.log('error')
        })
      return false
    }
  }

  return (
    <Modal
      visible={visible}
      closable={false}
      className={'post-modal'}
      okText={'确认发布'}
      cancelText={'取消'}
      onCancel={onCancel1}
      onOk={onOk}
    >
      <Form
        form={form}
        name={'post'}
      >
        <Form.Item
          name={'title'}
          rules={[{ required: true, message: '请输入标题!' }]}>
          <Input placeholder={'请输入标题'}/>
        </Form.Item>
        <Row justify={'space-between'}>
          <Col>
            <Form.Item
              name={'category'}
              label={'选择一个帖子分类：'}
              initialValue={postType.value}
            >
              <Dropdown overlay={menu} trigger={['click']}>
                <a onClick={e => e.preventDefault()}>
                  {(PostTypeTest as any)[postType.value]} <DownOutlined/>
                </a>
              </Dropdown>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name={'isPublic'}
              label={'公开这篇帖子：'}
              initialValue={true}
            >
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name={'content'}
          rules={[{ required: true, message: '发布内容不能为空！' }]}>
          <Input.TextArea rows={10} placeholder={'这里输入内容~'}/>
        </Form.Item>
        <Form.Item
          name={'images'}
        >
          <Upload
            action=''
            fileList={fileList}
            listType={'picture-card'}
            onPreview={() => {} }
            onChange={handleUploadImg}
            {...uploadProps}
          >
            {uploadButton}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>)
}

const EditPostModal = () => {
  const [visible, setVisible] = useState(false)

  const [createPost] = useMutation(CREATE_POST)

  const onCreate = (input:Values) => {
    createPost({ variables: { input } })
      .then(({ data }) => {
        console.log(data)
        setVisible(false)
        message.success('发布成功！')
      })
      .catch(() => {
        message.warning('发布失败了:(')
      })
  }

  const onCancel = () => {
    setVisible(false)
  }

  return <>
    <IconButton variant={'link'} onClick={() => setVisible(true)} icon={<EditIcon/>} aria-label={'new post'}/>
    <EditPostForm
      visible={visible}
      onCreate={onCreate}
      onCancel={onCancel}
    />
  </>
}

export default EditPostModal
