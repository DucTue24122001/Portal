import React, { useEffect, useRef, useState } from 'react'
import style from './FormLeave.module.css'
import moment from 'moment'
import { DatePicker, TimePicker, Checkbox, Radio, Input, Button, Form, Spin } from 'antd'

const { RangePicker } = TimePicker
const rangeConfig = {
  rules: [{ type: 'array', required: true, message: 'Please select time!' }]
}
const disabledTimeAM = [0, 1, 2, 3, 4, 5, 6, 7]
const disabledTimePM = [18, 19, 20, 21, 22, 23]
const initialStatus = {
  1: 'Sent',
  2: 'Confirmed',
  3: 'Approved'
}
const initialStatusDisable = ['Confirmed', 'Approved']
const initialTotalWorkTime = moment.duration(`08:00:00`).asSeconds()
const initialFreeTime = moment.duration(`01:00:00`).asSeconds()

const FormConfirmLeave = ({ onCancel }) => {
  const registerDate = useRef(moment().format('DD-MM-YY hh:mm'))
  const totalWorkTime = useRef(initialTotalWorkTime)
  const [status, setStatus] = useState(initialStatus[1])
  const [disabled, setDisabled] = useState(false)
  const [checkin, setCheckin] = useState(0)
  const [checkout, setCheckout] = useState(0)
  const [freeTime, setFreetime] = useState(0)
  const [timeCount, setTimeCount] = useState(0)
  const [loadingData, setLoadingData] = useState(false)
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [disabledTimeCheckin, setDisabledTimeCheckin] = useState([...disabledTimeAM, ...disabledTimePM])
  const [disabledStartTime, setDisabledStartTime] = useState([...disabledTimeAM, ...disabledTimePM])

  useEffect(() => {
    if (initialStatusDisable.includes(status)) {
      setDisabled(true)
    }
    if (checkout >= moment.duration(`13:00:00`).asSeconds()) {
      setFreetime(initialFreeTime)
    }
    if (checkout < moment.duration(`13:00:00`).asSeconds()) {
      setFreetime(moment.duration(`00:00:00`).asSeconds())
    }
  }, [status, checkout, checkin])

  const onFinish = (values) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const onCheckin = (time, timeString) => {
    const totalSecondsCheckin = moment.duration(time.format('HH:mm:ss')).asSeconds()
    const disabledTimeCheckout = []
    for (var i = moment(time).hour(); i > 0; i--) {
      disabledTimeCheckout.push(i)
    }
    setDisabledTimeCheckin([...disabledTimeCheckin, ...disabledTimeCheckout])
    setCheckin(totalSecondsCheckin)
  }

  const onCheckout = (time, timeString) => {
    const totalSecondsCheckout = moment.duration(time.format('HH:mm:ss')).asSeconds()
    setCheckout(totalSecondsCheckout)
  }

  const rangerTime = (time) => {
    const totalSecondsStart = moment.duration(time[0].format('HH:mm:ss')).asSeconds()
    const totalSecondsEnd = moment.duration(time[1].format('HH:mm:ss')).asSeconds()

    setTimeCount(totalSecondsEnd - totalSecondsStart)
  }

  const enterLoading = () => {
    setLoadingSubmit(true)
    setTimeout(() => {
      setLoadingSubmit(false)
    }, 2000)
  }

  return (
    <>
      {loadingData ? (
        <Spin tip='Loading...' />
      ) : (
        <div className={style.wrapper_form}>
          <Form
            name='Confirm Leave'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
          >
            <Row gutter={[10, 10]}>
              <Col className={style.form_item} span={4}>
                Registration date:
              </Col>
              <Col className={style.form_item} span={18}>
                {registerDate.current}
              </Col>

              <Col className={style.form_item} span={4}>
                Register for date:
              </Col>
              <Col className={style.form_item} span={20}>
                <Form.Item
                  name='dateRegister'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your register date!'
                    }
                  ]}
                >
                  <DatePicker className={style.timeBox} />
                </Form.Item>
              </Col>

              <Col span={4} className={style.form_item}>
                Check-in:
              </Col>
              <Col span={8} className={style.form_item}>
                <Form.Item
                  name='timeCheckin'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your checkin time!'
                    }
                  ]}
                >
                  <TimePicker
                    disabledHours={() => disabledTimeCheckin}
                    format='HH:mm'
                    onChange={onCheckin}
                    className={style.timeBox}
                  />
                </Form.Item>
              </Col>

              <Col span={4} className={style.form_item}>
                Check-out:
              </Col>
              <Col span={8} className={style.form_item}>
                <Form.Item
                  name='timeCheckout'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your checkout time!'
                    }
                  ]}
                >
                  <TimePicker
                    disabledHours={() => disabledTimeCheckin}
                    format='HH:mm'
                    onChange={onCheckout}
                    className={style.timeBox}
                  />
                </Form.Item>
              </Col>

              <Col span={4} className={style.form_item}>
                Work time:
              </Col>
              <Col span={8} className={style.form_item}>
                <span>
                  {checkout == ''
                    ? 0
                    : moment
                      .utc(moment.duration(checkout - checkin - freeTime, 'seconds').as('milliseconds'))
                      .format('HH:mm')}
                </span>
              </Col>

              <Col span={4} className={style.form_item}>
                Lack time:
              </Col>
              <Col span={8} className={style.form_item}>
                <span>
                  {checkout == ''
                    ? 0
                    : moment
                      .utc(
                        moment
                          .duration(totalWorkTime.current - (checkout - checkin - freeTime), 'seconds')
                          .as('milliseconds')
                      )
                      .format('HH:mm')}
                </span>
              </Col>

              <Col span={24} className={style.leaveAll}>
                <Form.Item className={style.wrapper_item_form} name='checkAll' valuePropName='checked' noStyle>
                  <Checkbox disabled={disabled}>Leave all day</Checkbox>
                </Form.Item>
              </Col>

              <Col span={4} className={style.form_item}>
                Range:
              </Col>
              <Col span={8} className={style.form_item}>
                <Form.Item name='range-picker' {...rangeConfig}>
                  <RangePicker
                    className={style.timeBox}
                    disabledHours={() => disabledStartTime}
                    onChange={rangerTime}
                    format='HH:mm'
                    disabled={disabled}
                  />
                </Form.Item>
              </Col>

              <Col span={4} className={style.form_item} className={style.timeBox}>
                <Form.Item
                  className={style.item_form}
                  name='radio-group'
                  rules={[{ required: true, message: 'Please pick an item!' }]}
                >
                  <Radio.Group className={s.wrapper_item_button_form} disabled={disabled}>
                    <Radio value={1}>Paid</Radio>
                    <Radio value={2}>Unpaid</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={8} className={style.form_item}>
                <span className={s.label}>Time count:</span>
                <span
                  style={{
                    color: timeCount < moment.duration(`1:00:00`).asSeconds() ? 'red' : 'unset'
                  }}
                >
                  {moment.utc(moment.duration(timeCount, 'seconds').as('milliseconds')).format('HH:mm')}
                </span>
              </Col>

              <Col span={4} className={style.form_item}>
                Reason:
              </Col>
              <Col span={18} className={style.form_item}>
                <Form.Item name='reasonInfo' rules={[{ required: true, message: 'Please input Intro' }]}>
                  <Input.TextArea disabled={disabled} showCount maxLength={100} rows={4} />
                </Form.Item>
              </Col>

              <Col span={4} className={style.form_item}>
                Status:
              </Col>
              <Col span={18} className={style.form_item}>
                {status}
              </Col>

              <Col span={4} className={style.form_item}>
                Comment:
              </Col>
              <Col span={18} className={style.form_item}>
                <Form.Item name='comment' rules={[{ required: true, message: 'Please input Intro' }]}>
                  <Input.TextArea disabled={disabled} showCount maxLength={100} rows={4} />
                </Form.Item>
              </Col>
            </Row>

            <div className={style.wrapper_item_button_form}>
              <Button
                htmlType='submit'
                disabled={disabled}
                type='primary'
                loading={loadingSubmit}
                onClick={enterLoading}
                className={s.button_form}
              >
                Confirm
              </Button>
              <Button disabled={disabled} className={style.button_form}>
                Reject
              </Button>
              <Button className={style.button_form} onClick={(e) => onCancel()}>
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      )}
    </>
  )
}

export default FormConfirmLeave
