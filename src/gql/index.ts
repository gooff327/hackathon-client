import { gql } from 'apollo-boost'

export const fetchPosts = gql`    
    query ($category: String, $keyword: String, $page: Int!, $limit: Int!) {
        posts(filter: {category: $category, keyword: $keyword}, pagination: { page: $page, limit: $limit}) {
            hasPrevPage
            hasNextPage
            data {
                _id
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
    }
`

export const fetchCategory = gql`
query {
    category {
        label
        value
    }
}

`

export const doLikeAction = gql`
    mutation {
        likeAction(target: "5f994483daacb021bbe95877") {
            likes {
                _id
                avatar
            }
        }
    }
`
