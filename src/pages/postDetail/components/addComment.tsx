import { Box, InputGroup, Textarea, InputRightElement, Input, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import './addComment.scss'

interface commentProps{
  handleSubmit:(comment:string)=>Promise<any>
  onBlur:(e:any)=>void
}

const AddComment:React.FC<commentProps> = ({ handleSubmit, onBlur }) => {
  const [value, setValue] = useState('')

  const onFinish = async () => {
    console.info('comments')
    await handleSubmit(value)
    setValue('')
  }

  return <Box className={'comment-input-area'}>

    <InputGroup
      size="md"
      onBlur={onBlur}
    >
      <Textarea
        resize={'none'}
        value={value}
        pr="6rem"
        placeholder={'输入评论...'}
        onChange={ ({ target: { value: val } }) => setValue(val)}
      />
      {
        value !== '' &&
        <InputRightElement
          width="6rem"
          height="100%"
          pb={'1rem'}
          alignItems={'flex-end'}
          pointerEvents={'all'}
          onClick={() => alert('121')}
        >
          <Button size={'sm'} onClick={onFinish}
          >评论</Button>
        </InputRightElement>
      }
    </InputGroup>

  </Box>
}

export default AddComment
