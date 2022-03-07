import React from 'react'
import s from './login.module.css'
import { Form, Input, Button, Typography } from 'antd'
// import { useDispatch } from "react-redux";
// import {login} from '../../redux/actions/userAction'
const { Title } = Typography
const LoginPage = () => {
//   const dispatch = useDispatch()
  const onFinish = (values) => {
    // dispatch(login(values))
    console.log(values)
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className={s.wrapper}>
      <Title className={s.title_form} ><span className={s.title_form}>Relipa Portal</span></Title>
      <Form
        className={s.form_login}
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

          className={s.form_item}
          name='email'
          rules={[
            {
              required: true,
              message: 'Please input your email!'
            }
          ]}
        >
          <Input className={s.item_input} placeholder='Email' />
        </Form.Item>

        <Form.Item

          className={s.form_item}
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            }
          ]}
        >
          <Input.Password className={s.item_input} placeholder='Password' />
        </Form.Item>

        <div className={s.form_item}>
          <Form.Item >
            <Button className={s.item_input} type='primary' htmlType='submit'>
            Đăng nhập
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}

export default LoginPage
