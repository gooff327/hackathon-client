import React, { ChangeEvent, useRef, useState } from 'react'
import {
  Box,
  Flex,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useColorMode
} from '@chakra-ui/react'
import { SearchIcon, BellIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'

import EditPostModal from '../../pages/editPostModal'
import { useDispatch, useSelector } from 'react-redux'

import { useHistory } from 'react-router-dom'
import Login from '../../pages/login'

import { RootState } from '../../store/rootReducers'
import { User } from '../../store/user/types'
import { PostFilter } from '../../store/home/types'
import { updateKeyword } from '../../store/home/actions'
import UserPopover from '../UserPopover'
import logo from '../../assets/images/logo.svg'

const HeaderContent = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const [inputExpanded, setInputExpanded] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const history = useHistory()
  const user = useSelector<RootState, User>(state => state.user.me)
  const { keyword: keywordFormRedux } = useSelector<RootState, PostFilter>(state => state.home.filters)
  const [keyword, setKeyword] = useState('')
  const dispatch = useDispatch()

  const handleSearchBtnClicked = () => {
    setInputExpanded(!inputExpanded)
    if (inputExpanded) {
      dispatch(updateKeyword({ keyword }))
      setKeyword('')
      console.log()
      inputRef?.current?.blur()
    } else {
      inputRef?.current?.focus()
    }
    return false
  }

  return <Flex m={['0 24px', '0 24px', '0 48px', '0 48px']} width={'100%'} wrap={'wrap'}
    justify={'space-between'} align={'center'} gridGap={'10px'}
    padding={{ sm: '0 12px', md: '0 16px' }}
  >
    <Flex userSelect={'none'} onClick={() => history.push('/')} flex={1} align={'center'} justify={'flex-start'} className={'left-panel'}>
      <Image src={logo} w={{ base: '24px', sm: '24px', md: '40px' }} h={{ base: '24px', sm: '24px', md: '40px' }}/>
      <Box cursor={'pointer'} as={'span'} ml={'16px'}
        fontSize={['20px', '20px', '38px', '38px']} fontWeight={600} fontFamily={'cursive'}>Monkey</Box>
      <Box cursor={'pointer'} as={'span'}
        fontSize={['20px', '20px', '38px', '38px']} fontWeight={300} fontFamily={'monospace'}
        color={'purple.400'}>Bar</Box>
    </Flex>
    <Flex flex={1} align={'center'}
      justifyContent={'flex-end'} className={'right-panel'}>
      <InputGroup ref={inputRef} itemRef={'input'}
        transition={'all .3s ease-in-out'} display={{ base: 'none', sm: 'block' }} w={inputExpanded ? '240px' : '40px'}
      >
        <InputLeftElement>
          <IconButton
            height={'40px'}
            boxShadow={0}
            variant={'link'}
            aria-label="Search database" icon={<SearchIcon/>} className={'shadow-none'}
            onClick={handleSearchBtnClicked}/>
        </InputLeftElement>
        <Input
          border={0}
          paddingRight={'4px'}
          defaultValue={keywordFormRedux}
          placeholder={'请输入关键字'}
          onBlur={() => setInputExpanded(false)}
          onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>): void => setKeyword(value)}
          onKeyDown={({ key }: { key: string }) => key === 'Enter' ? handleSearchBtnClicked() : undefined}
        />
      </InputGroup>
      {user && <EditPostModal/>}
      <IconButton
        variant={'link'}
        isDisabled
        onClick={toggleColorMode}
        aria-label={'notifications'}
        icon={<BellIcon/>}
        fontSize={'20px'}
      />
      <IconButton
        variant={'link'}
        onClick={toggleColorMode}
        aria-label={'dark-mode'}
        icon={colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}
        fontSize={'20px'}
        mr={'16px'}
      />
      {
        user ? <UserPopover/> : <Login/>
      }
    </Flex>
    <Flex w={'100%'} display={{ base: 'flex', sm: 'none' }} pt={{ base: '12px', sm: '0px' }} gridGap={'12px'}>
      <InputGroup
        ref={inputRef}
        minW={'300px'}
        rounded="md"
        bg="gray.100"
        borderWidth="1px"
        _focus={{
          outline: 'none',
          bg: 'white',
          boxShadow: 'outline',
          borderColor: 'gray.200'
        }}
      >
        <InputRightElement width="4.5rem">
          <IconButton
            h="1.75rem" size="md"
            isDisabled={!keyword}
            variant={'link'}
            aria-label="Search database" icon={<SearchIcon/>} className={'shadow-none'}
            onClick={handleSearchBtnClicked}/>
        </InputRightElement>
        <Input
          border={0}
          paddingRight={'4px'}
          defaultValue={keywordFormRedux}
          placeholder={'请输入关键字'}
          onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>): void => setKeyword(value)}
          onKeyDown={({ key }: { key: string }) => key === 'Enter' ? handleSearchBtnClicked() : undefined}
        />
      </InputGroup>

    </Flex>
  </Flex>
}
const Header = () => {
  return (<>
    <Box
      zIndex={500}
      as={'nav'}
      position={'absolute'}
      top={'24px'}
      left={0}
      right={0}
      shadow={location.pathname !== '/' ? 'rgba(0, 0, 0, 0.05) 0px 4x 12px 0px' : 'unset'}>
      <Flex
        as={'header'}
        justify={'space-between'}
        maxW={'1192px'}
        width={'100%'}
        m={'auto'}
        flex={1}
        height={'65px'}
        maxH={'100px'}
        pb={'48px'}
        align={'center'}
        className={'header'}
      >
        <HeaderContent/>
      </Flex>
    </Box>
    <Box
      h={'65px'}
      m={'24px'}
      visibility={'hidden'}
    />
  </>
  )
}

export default Header
