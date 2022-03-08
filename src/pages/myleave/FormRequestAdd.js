import React from 'react'
import { Row, Col, Input, InputNumber, Button, Form } from 'antd'
import styles from './myleave.module.css'

const FormRequestAdd = ({ onCancel }) => {
  const { TextArea } = Input
  const onFinish = (values) => {}
  const onFinishFailed = (errorInfo) => {}

  return (
    <div>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Row className={styles['form-requests']}>
          <Col span={24}>
            <Row>
              <Col span={4}>Register for year:</Col>
              <Col> </Col>
            </Row>
          </Col>
        </Row>
        <Row className={styles['form-requests']}>
          <Col span={4}>Quota:</Col>
          <Col>
            <Form.Item
              name={'Quota'}
              rules={[
                {
                  required: true,
                  message: 'Please input Quota'
                }
              ]}
            >
              <InputNumber min={1} max={10}></InputNumber>
            </Form.Item>
          </Col>
          <Col offset={1}>day(s)</Col>
        </Row>
        <Row className={styles['form-requests']}>
          <Col span={4}>Reason:</Col>
          <Col span={18}>
            <Form.Item
              name={'Reason'}
              rules={[
                {
                  required: true,
                  message: 'Please input Reason'
                }
              ]}
            >
              <TextArea rows={4} maxLength={100} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={3} offset={8}>
            <Button type='primary' htmlType='submit'>
              Register
            </Button>
          </Col>
          <Col>
            <Button type='primary' onClick={(e) => onCancel()}>
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default FormRequestAdd
