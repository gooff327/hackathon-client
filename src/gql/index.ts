import { gql } from 'apollo-boost'

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
