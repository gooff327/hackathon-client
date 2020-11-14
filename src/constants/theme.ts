import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const breakpoints = createBreakpoints({
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px'
})

export const titleColor = {
  light: 'gray.700',
  dark: 'gray.200'
}

export const styles = {
  global: (props: any) => ({
    'html, body': {
      fontSize: 'sm',
      color: props.colorMode === 'dark' ? 'white' : 'gray.600',
      lineHeight: 'tall'
    },
    img: { filter: props.colorMode === 'dark' ? 'brightness(75%)' : '' },
    hr: { color: props.colorMode === 'dark' ? 'gray.100' : 'gray.200' },
    div: { borderBottomColor: props.colorMode === 'dark' ? 'gray.400' : 'gray.200' },
    h2: { color: props.colorMode === 'dark' ? 'gray.200' : 'gray.900' },
    h3: { color: props.colorMode === 'dark' ? 'gray.300' : 'gray.600' },
    span: { color: props.colorMode === 'dark' ? 'gray.300' : 'gray.500' },
    p: { color: props.colorMode === 'dark' ? 'gray.300' : 'gray.500' },
    small: { color: props.colorMode === 'dark' ? 'gray.400' : 'gray.400' },
    a: {
      color: props.colorMode === 'dark' ? 'teal.300' : 'teal.500'
    }
  })
}

export const customTheme = extendTheme({ breakpoints, styles })
