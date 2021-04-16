import React, { FunctionComponent, useState } from 'react'
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/rootReducers'
import { User } from '../../store/user/types'
import { ProjUrl } from '../../constants'

interface UserPopoverProps {
  handleLogout: () => void
}
const UserPopover:FunctionComponent<UserPopoverProps> = ({ handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { name, avatar, email } = useSelector<RootState, User>(state => state.user.me)

  const open = () => setIsOpen(!isOpen)
  const close = () => setIsOpen(false)

  return <>
    <Avatar userSelect={'none'} name={name} h={['24px', '40px']} w={ ['24px', '40px']} src={avatar} onClick={open}/>
    <Popover isOpen={isOpen} onClose={close}>
      <PopoverTrigger>
        <Box h={'40px'} w={'1px'} visibility={'hidden'}/>
      </PopoverTrigger>
      <PopoverContent zIndex={999} bg={'white'} p={'8px 0'} _focus={{ boxShadow: 'unset' }}>
        <Flex as={'li'} p={'8px 20px'} align={'center'}>
          <Flex>
            <Avatar cursor={'pointer'} name={name} src={avatar}/>
          </Flex>
          <Flex marginLeft={'16px'} direction={'column'}>
            <Text cursor={'pointer'} fontWeight={500}>{name}</Text>
            <Box as={Text} cursor={'pointer'} color={'gray.600'}
              _hover={{ textDecoration: 'underline' }}>{email}</Box>
          </Flex>
        </Flex>
        <Divider/>
        <Flex as={'li'} direction={'column'}>
          <Box as={Text} p={'8px 20px'} cursor={'pointer'} color={'gray.600'}
            _hover={{ color: 'gray.900' }}>个人信息</Box>
          <Box as={Text} p={'8px 20px'} cursor={'pointer'} color={'gray.600'}
            _hover={{ color: 'gray.900' }}>我的帖子</Box>
          <Box as={Text} p={'8px 20px'} cursor={'pointer'} color={'gray.600'}
            _hover={{ color: 'gray.900' }}>设置</Box>
          <Divider/>
        </Flex>
        <Flex as={'li'} direction={'column'}>
          <Link as={'a'} target={'_blank'} href={ProjUrl} p={'8px 20px'} cursor={'pointer'} color={'gray.600'}
            _hover={{ color: 'gray.900' }}>加入我们</Link>
          <Box as={Text} p={'8px 20px'} cursor={'pointer'} color={'gray.600'}
            _hover={{ color: 'gray.900' }} onClick={handleLogout}>注销</Box>
        </Flex>

      </PopoverContent>
    </Popover>
  </>
}

// @ts-ignore
export default UserPopover
// @ts-ignore
