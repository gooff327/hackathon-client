import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import Post from './components/Post'
import './index.scss'
import { RouteComponentProps } from 'react-router'
import ButtonGroup from 'antd/lib/button/button-group'
import { CommentOutlined, HeartOutlined } from '@ant-design/icons'

const HOME_QUERY = gql`
    query getPosts {
        posts {
            data {
                title
                createdAt
                author {
                    name
                }
                likes{
                    avatar
                }
                comments{
                    _id
                }
                views
                images
                category {
                    label
                    value
                }
                }
            hasNextPage
        }
        category {
            label
            value
        }
    }
`
const Home = (props:RouteComponentProps) => {
  const { loading, error, data, fetchMore } = useQuery(HOME_QUERY)
  const [category, setCategory] = useState('')
  const [posts, setPosts] = useState([])

  console.log(error)
  useEffect(() => {
    if (data) {
      setCategory(data.category[0].value)
      setPosts(data.posts.data)
    }
  }, [data])

  const onBtnClick = (value: string) => {
    setCategory(value)
  }
  if (data) {
    return (
      <section className={'home-wrapper'}>
        <div className={'sub-header fixed-header shadow'}>{ data?.category.map(({ label, value }: any) =>
          <Button
            className={ category === value ? 'btn-active' : ''}
            key={value}
            type={'link'}
            onClick={() => onBtnClick(value)}
          >
            {label}
          </Button>)}
        </div>
        <div className={'sub-header'} />
        {
          posts?.map(({ likes, images, comments, title, author: { name }, createdAt }: any) => (
            <div key={createdAt}>
              <div className={'left-panel'}>
                <div className={'top-info'}>
                  <span>{name}</span>
                  <span>{createdAt}</span>
                </div>
                <h3>{title}</h3>
                <ButtonGroup>
                  <Button className={'btn-like'} type={'link'} icon={<HeartOutlined />}>{likes.length}</Button>
                  <Button className={'btn-comment'} type={'link'} icon={<CommentOutlined />}>{comments.length}</Button>
                </ButtonGroup>
              </div>
              <div className={'right-panel'}>
                {images.slice(0, 3).map((image: any) => <img key={image} src={image} alt="image" />)}
              </div>
            </div>
          ))
        }
      </section>
    )
  }
  return <></>
}

export default Home
