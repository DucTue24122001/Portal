import React, { useEffect, useRef, useState } from 'react'
import style from './FormLeave.module.css'
import moment from 'moment'
import {
  DatePicker,
  TimePicker,
  Checkbox,
  Radio,
  Input,
  Button,
  Form,
  Spin,
  Row,
  Col
} from 'antd'
import { useDispatch } from 'react-redux'
import { createLeave } from '../../redux/actions/leaveActions'

const { RangePicker } = TimePicker
const rangeConfig = {
  rules: [{ type: 'array', required: true, message: 'Please select time!' }]
}
const disabledTimeAM = [0, 1, 2, 3, 4, 5, 6, 7]
const disabledTimePM = [18, 19, 20, 21, 22, 23]
const initialTotalWorkTime = moment.duration(`8:00:00`).asSeconds()

const FormRegisterLeave = ({ onCancel }) => {
  const dispatch = useDispatch()

  const registerDate = useRef(moment().format('DD-MM-YY hh:mm'))
  const totalWorkTime = useRef(initialTotalWorkTime)
  const [checkin, setCheckin] = useState(0)
  const [checkout, setCheckout] = useState(0)
  const [freeTime, setFreetime] = useState(0)
  const [timeCount, setTimeCount] = useState(0)
  const [workTime, setWorkTime] = useState(0)
  const [lackTime, setLackTime] = useState(0)
  const [loading, setLoading] = useState(false)
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [disabledTimeCheckin, setDisabledTimeCheckin] = useState([
    ...disabledTimeAM,
    ...disabledTimePM
  ])
  const [disabledStartTime, setDisabledStartTime] = useState([
    ...disabledTimeAM,
    ...disabledTimePM
  ])

  useEffect(() => {
    if (checkout >= moment.duration(`13:00:00`).asSeconds()) {
      setFreetime(moment.duration(`1:00:00`).asSeconds())
    }
    if (checkout < moment.duration(`13:00:00`).asSeconds()) {
      setFreetime(moment.duration(`00:00:00`).asSeconds())
    }
    setWorkTime(checkout - checkin - freeTime)
    setLackTime(totalWorkTime.current - workTime)
  })

  const onFinish = (values) => {
    console.log('Success:', values)
    const { Reason, RegisterForDate, checkIn, checkOut, Range } = values
    const dataForm = {
      Reason: Reason,
      RegisterForDate: moment(RegisterForDate).format('DD-MM-YYYY'),
      checkIn: moment(checkIn).format('HH:mm'),
      checkOut: moment(checkOut).format('HH:mm'),
      workTime: moment
        .utc(moment.duration(workTime, 'seconds').as('milliseconds'))
        .format('HH:mm'),
      lackTime: moment
        .utc(moment.duration(lackTime, 'seconds').as('milliseconds'))
        .format('HH:mm'),
      Range: moment
        .utc(moment.duration(timeCount, 'seconds').as('milliseconds'))
        .format('HH:mm'),
      RangeStart: moment
        .utc(moment.duration(Range[0], 'seconds').as('milliseconds'))
        .format('HH:mm'),
      RangeEnd: moment
        .utc(moment.duration(Range[1], 'seconds').as('milliseconds'))
        .format('HH:mm'),
      status: 'Sent'
    }
    dispatch(createLeave(dataForm))
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const onCheckin = (time, timeString) => {
    const totalSecondsCheckin = moment
      .duration(time.format('HH:mm'))
      .asSeconds()
    const disabledTimeCheckout = []
    for (var i = moment(time).hour(); i > 0; i--) {
      disabledTimeCheckout.push(i)
    }
    setDisabledTimeCheckin([...disabledTimeCheckin, ...disabledTimeCheckout])
    setCheckin(totalSecondsCheckin)
  }

  const onCheckout = (time, timeString) => {
    const totalSecondsCheckout = moment
      .duration(time.format('HH:mm'))
      .asSeconds()
    setCheckout(totalSecondsCheckout)
  }

  const rangerTime = (time) => {
    const totalSecondsStart = moment
      .duration(time[0].format('HH:mm'))
      .asSeconds()
    const totalSecondsEnd = moment
      .duration(time[1].format('HH:mm'))
      .asSeconds()
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
      {loading ? (
        <Spin tip='Loading...' />
      ) : (
        <div className={style.wrapper_form}>
          <Form
            name='basic'
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
                <span> {registerDate.current}</span>
              </Col>

              <Col className={style.form_item} span={4}>
                Register for date:
              </Col>
              <Col className={style.form_item} span={20}>
                <Form.Item
                  className={style.form_item}
                  name='RegisterForDate'
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
                  name='checkIn'
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
                  name='checkOut'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your checkout time!'
                    }
                  ]}
                >
                  <TimePicker
                    disabledHours={() => disabledTimeCheckin}
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
                      .utc(
                        moment
                          .duration(workTime, 'seconds')
                          .as('milliseconds')
                      )
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
                          .duration(lackTime, 'seconds')
                          .as('milliseconds')
                      )
                      .format('HH:mm')}
                </span>
              </Col>

              <Col span={24} className={style.leaveAll}>
                <Form.Item
                  className={style.wrapper_item_form}
                  className={style.item_form}
                  name='checkAll'
                  valuePropName='checked'
                  noStyle
                >
                  <Checkbox>Leave all day</Checkbox>
                </Form.Item>
              </Col>

              <Col span={4} className={style.form_item}>
                  Range:
              </Col>
              <Col span={8} className={style.form_item}>
                <Form.Item
                  name='Range'
                  {...rangeConfig}
                >
                  <RangePicker
                    className={style.timeBox}
                    disabledHours={() => disabledStartTime}
                    onChange={rangerTime}
                    format='HH:mm'
                  />
                </Form.Item>
              </Col>
              <Col span={4} className={style.form_item} className={style.timeBox}>
                <Form.Item
                  name='radio-group'
                  rules={[
                    { required: true, message: 'Please pick an item!' }
                  ]}
                >
                  <Radio.Group className={style.wrapper_button_radio}>
                    <Radio value={1}>Paid</Radio>
                    <Radio value={2}>Unpaid</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>

              <Col span={8} className={style.form_item}>
                  Time count:
                <span
                  style={{
                    color:
                        timeCount < moment.duration(`1:00:00`).asSeconds()
                          ? 'red'
                          : 'unset'
                  }}
                >
                  {moment
                    .utc(
                      moment.duration(timeCount, 'seconds').as('milliseconds')
                    )
                    .format('HH:mm')}
                </span>
              </Col>

              <Col span={4} className={style.form_item}>
                    Reason:
              </Col>
              <Col span={18} className={style.form_item}>
                <Form.Item
                  className={style.item_form}
                  name='Reason'
                  rules={[{ required: true, message: 'Please input Intro' }]}
                >
                  <Input.TextArea showCount maxLength={100} rows={4} />
                </Form.Item>
              </Col>
            </Row>

            <div className={style.wrapper_item_button_form}>
              <Button
                className={style.button_form}
                htmlType='submit'
                type='primary'
                loading={loadingSubmit}
                onClick={enterLoading}
              >
                Register
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

export default FormRegisterLeave
