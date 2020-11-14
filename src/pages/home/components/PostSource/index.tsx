import React from 'react'
import { Flex, Skeleton, Text } from '@chakra-ui/react'
import { CategoryIconMap } from '../../../../constants'

const PostSource = ({ category, author: { name }, mt }: any) =>
  <Flex align={'center'} mt={mt || 0}>
    <Text as={'span'} mr={'4px'} fontSize={'20px'}>{CategoryIconMap[category.value]}</Text>
    <Text as={'span'} fontSize={'13px'} fontWeight={500}>{name}</Text>
    <Text as={'small'} fontSize={'13px'} fontWeight={500} m={'0 4px'}>in</Text>
    <Text as={'span'} fontSize={'13px'} fontWeight={500}>{category.label}</Text>
  </Flex>
export const PostSourceSkeleton = ({ mt }: any) =>
  <Skeleton w={'120px'} height={'12px'} mt={mt} fontSize={'20px'}/>

export default PostSource
