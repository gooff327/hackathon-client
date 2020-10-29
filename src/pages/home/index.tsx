import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import Post from './components/Post'
import './index.scss'
import { RouteComponentProps } from 'react-router'

const HOME_QUERY = gql`
    query getPosts {
        posts {
            title
            createdAt
            author {
                name
            }
            likes{
                avatar
            }
            comments{
                id
            }
            views
            images
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

  console.log(error)
  useEffect(() => {
    if (data) {
      setCategory(data?.category[0]?.value)
    }
  }, [data])

  const onBtnClick = (value: string) => {
    setCategory(value)
  }
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
      <Post.ListView fetchMore={fetchMore} post={data?.posts} loading={loading} {...props}/>
    </section>
  )
}

export default Home
