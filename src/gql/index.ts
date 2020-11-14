import { gql } from 'apollo-boost'

export const fetchHotPosts = gql`    
    query{
        hotPosts{
            _id
            title
            createdAt
            author{
                name
            }
            likes{
                avatar
            }
            comments {
                _id
            }
            images
            content
            category{
                value
                label
            }
        }
    }
`
export const fetchPosts = gql`    
    query ($category: String, $keyword: String, $page: Int!, $limit: Int!, $sortByDate: Boolean, $sortByHot: Boolean, $sortReverse: Boolean) {
        posts(filter: {category: $category, keyword: $keyword},
            pagination: { page: $page, limit: $limit}, 
            rank: {sortByDate: $sortByDate, sortByHot: $sortByHot, sortReverse: $sortReverse}) 
        {
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
                content
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
        __typename
        label
        value
    }
}

`

export const doLikeAction = gql`
    mutation($target: ID!) {
        likeAction(target: $target) {
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
    }
`
