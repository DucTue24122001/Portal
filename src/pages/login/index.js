import React, { useEffect } from 'react'
import style from './login.module.css'
import { Form, Input, Button, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../redux/auth'
import { useHistory } from 'react-router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const { Title } = Typography
const LoginPage = () => {
  const history = useHistory()
  const { successLogin, loadingLogin, errorLogin } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (successLogin === true) {
      history.push('/')
    }
  }, [successLogin])

  useEffect(() => {
    if (errorLogin !== '') {
      toast(errorLogin)
    }
  }, [errorLogin])

  const onFinish = (values) => {
    dispatch(authActions.login(values))
  }

  const onFinishFailed = (errorInfo) => {}

  return (
    <div className={style.wrapper}>
      <Title className={style.title_form}>
        <span className={style.title_form}>Relipa Portal</span>
      </Title>
      <Form
        className={style.form_login}
        name='basic'
        labelCol={{
          span: 8
        }}
        wrapperCol={{
          span: 16
        }}
        initialValues={{
          remember: true
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item
          className={style.form_item}
          name='email'
          rules={[
            {
              required: true,
              message: 'Please input your email!'
            }
          ]}
        >
          <Input className={style.item_input} placeholder='Email' />
        </Form.Item>

        <Form.Item
          className={style.form_item}
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            }
          ]}
        >
          <Input.Password className={style.item_input} placeholder='Password' />
        </Form.Item>

        <div className={style.form_item}>
          <Form.Item>
            <Button className={style.item_input} loading={loadingLogin} type='primary' htmlType='submit'>
              Đăng nhập
            </Button>
          </Form.Item>
        </div>
      </Form>
      <ToastContainer />
    </div>
  )
}

export default LoginPage
