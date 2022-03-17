import React, { useEffect } from 'react'
import { Row, Col, Input, InputNumber, Button, Form } from 'antd'
import styles from './myleave.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { leaveQuotaActions } from '../../redux/myleave'

const FormRequestAdd = ({ onCancel, year }) => {
  const [form] = Form.useForm()
  const dispacth = useDispatch()
  const { leaveQuota, successPostLeaveQuota } = useSelector((state) => state.leaveQuota)
  const { TextArea } = Input
  const onFinish = (values) => {
    const { quota, reason } = values
    const dataForm = { quota: quota, note: reason }
    dispacth(leaveQuotaActions.postLeaveQuota(dataForm))
  }
  const onFinishFailed = (errorInfo) => {}

  useEffect(() => {
    if (successPostLeaveQuota === true) onCancel()
  }, [leaveQuota?.length])

  return (
    <div>
      <Form onFinish={onFinish} form={form} onFinishFailed={onFinishFailed} autoComplete='off'>
        <Row className={styles['form-requests']}>
          <Col span={24}>
            <Row>
              <Col span={4}>Register for year:</Col>
              <Col> {year}</Col>
            </Row>
          </Col>
        </Row>
        <Row className={styles['form-requests']}>
          <Col span={4}>Quota:</Col>
          <Col>
            <Form.Item
              name={'quota'}
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
              name={'reason'}
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
            <Button type='primary' onClick={(e) => onCancel(form.resetFields())}>
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default FormRequestAdd
