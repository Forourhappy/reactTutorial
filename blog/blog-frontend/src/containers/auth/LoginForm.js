import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const LoginForm = () => {
  const dispatch = useDispatch()
  const { form } = useSelector(({ auth }) => ({
    form: auth.login
  }))
  // 인푹 변경 이벤트 핸들러
  const onChange = e => {
    const { value, name } = e.target
    dispatch(
      changeField({

      })
    )
  }
  return (
    <div>LoginForm</div>
  )
}

export default LoginForm