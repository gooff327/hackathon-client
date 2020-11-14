import React, { Component, ErrorInfo } from 'react'
interface IProps{
  children: any
}
export default class ErrorBoundary extends Component<IProps, { hasError: any }> {
  constructor (props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError (error: any) {
    // Update state so the next render will show the fallback UI.
    console.log(error)
    return { hasError: true }
  }

  componentDidCatch (error: Error, info: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, info)
  }

  render () {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}
