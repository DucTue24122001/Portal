import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { registerOT } from '../../../redux/registerOT'
import { OtAction } from '../../../redux/registerOT'
import { Row, Col, TimePicker, Button, Modal, Form, Input } from 'antd'
import 'antd/dist/antd.css'
import style from './registerOT.module.css'
import moment from 'moment'

const format = 'HH:mm'

const dataModal = {
  checkin: '8:30',
  checkout: '16:00',
  date: '2022-01-12',
  late: '00:30',
  early: '1:00'
}

const { checkin, checkout, date, late, early } = dataModal
const in_office = '10:50'
const initial_in_office = moment.duration(`10:00:00`).asSeconds()

const RegisterOT = ({
  onCancel,
  onOk,
  isUser = false,
  isManager = false,
  isAdmin = true
}) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const registerOtLoading = useSelector((state) => state.registerOT.loading)

  const in_office_seconds = moment.duration(in_office).asSeconds()

  const [reason, setReason] = useState('')
  const [actualOverTime, setActualOverTime] = useState('')
  const [requestOT, setRequestOT] = useState(0)
  const [nameUserConfirm] = useState('Vu Van Vinh')
  const [nameUserApproved] = useState('Trần Xuân Đức')
  const [dateConfirm] = useState('2022-02-20 12:04')
  const [status] = useState(2)
  const [nameStatus, setNameStatus] = useState()

  useEffect(() => {
    setActualOverTime(
      moment.utc(moment.duration(in_office_seconds - initial_in_office, 'seconds').as('milliseconds')).format('HH:mm')
    )
  }, [])

  useEffect(() => {
    if (status === 0) {
      setNameStatus('sent')
    }
    if (status === 1) {
      setNameStatus('confirm')
    }
    if (status === 2) {
      setNameStatus('approved')
    }
    if (status === -1) {
      setNameStatus('reject')
    }
  }, [])

  const handleRegisterOT = () => {
    // const value = {
    //   compensation_date: moment().format('YYYY-MM-DD HH:mm'),
    //   request_for_date: 1646971964,
    //   check_in: 1646971964,
    //   check_out: 1646971964,
    //   request_ot: requestOT,
    //   actual_overtime: actualOverTime,
    //   reason: reason
    // }
    // if (reason !== '' && requestOT !== 0) {
    //   setTimeout(dispatch(OtAction.registerOt(value)), 6000)
    //   setReason('')
    //   setRequestOT(0)
    //   onOk()
    // }
  }

  const handleCancel = () => {
    form.resetFields()
    // setReason('')
    // setRequestOT(0)
    onCancel()
  }

  const handleChangeTimeRequestOT = (time, timeString) => {
    const totalTimeRequestOtSecond = moment.duration(time.format('HH:mm:ss')).asSeconds()
    if (totalTimeRequestOtSecond > actualOverTime) {
      alert('Thời gian request OT không lớn hơn thời gian Overtime Actual')
    } else {
      setRequestOT(totalTimeRequestOtSecond)
    }
  }

  return (
    <div className={style.registerOT}>
      <Form form={form}>
        {nameStatus !== undefined && !isUser && (
          <Row className={style.row_lineHeight}>
            <Col xs={10} sm={5}>
              Member:
            </Col>
            <Col sm={7}>Vu Van Vinh</Col>
          </Row>
        )}
        <Row className={style.row_lineHeight}>
          <Col xs={10} sm={5}>
            Registration date:
          </Col>
          <Col sm={7}>{moment().format('YYYY-MM-DD HH:mm')}</Col>
        </Row>

        <Row className={style.row_lineHeight}>
          <Col xs={10} sm={5}>
            Register for date:
          </Col>
          <Col sm={7}>2022-02-19</Col>
        </Row>

        <Row className={style.rowCheckIn}>
          <Col xs={10} sm={5}>
            Check-in:
          </Col>
          <Col xs={14} sm={8}>
            08:00
          </Col>
          <Col xs={10} sm={3}>
            Check-out:
          </Col>
          <Col sm={7}>18:40</Col>
        </Row>

        <Row className={style.row_lineHeight}>
          <Col xs={10} sm={5}>
            Request OT:{' '}
          </Col>
          <Col xs={14} sm={8}>
            <Form.Item
              name='requestOT'
              rules={[
                {
                  required: true,
                  message: 'Please input your request OT!'
                }
              ]}
            >
              <TimePicker
                disabled={
                  ((nameStatus == 'confirm' || nameStatus == 'approved') && true) ||
                  (nameStatus !== undefined && (isManager || isAdmin) && true)
                }
                onChange={handleChangeTimeRequestOT}
                format={format}
              />
            </Form.Item>
          </Col>
          <Col sm={5}>Actual Overtime:</Col>
          <Col sm={6}>{actualOverTime}</Col>
        </Row>

        <Row>
          <b>Note:</b>
        </Row>
        <Row className={style.content__note}>
          <Col sm={24}>
            <p>-Thời gian bắt đầu được tính OT là sau 01:00 sau giờ kết thúc làm việc chính thức.</p>
          </Col>
          <Col sm={24}>
            <p className={style.content__note_example}>
              <i>Ví dụ: Ca làm việc 08:00 AM đến 17:00 PM, thì thời gian gian bắt đầu tính OT là 18:00 PM.</i>
            </p>
          </Col>
          <p>
            -Thời gian request OT<span style={{ color: 'red' }}> không lớn hơn </span>thời gian Overtime Actual. Các
            trường hợp OT khi remote cần yêu cầu qua email.
          </p>
        </Row>

        <Row className={style.reason}>
          <Col xs={10} sm={5}>
            Reason: <span style={{ color: 'red' }}>(*)</span>
          </Col>
          <Col xs={24} sm={19}>
            <Form.Item
              name='reason'
              rules={[
                {
                  required: true,
                  message: 'Please input your reason!'
                }
              ]}
            >
              <Input.TextArea
                disabled={
                  ((nameStatus == 'confirm' || nameStatus == 'approved') && true) ||
                  (nameStatus !== undefined && (isManager || isAdmin) && true)
                }
                style={{ height: '120px' }}
                onChange={(e) => setReason(e.target.value)}
                showCount
                maxLength={100}
              />
            </Form.Item>
          </Col>
        </Row>

        {nameStatus && (
          <Row className={style.status}>
            <Col xs={10} sm={5}>
              Status:
            </Col>
            <Col xs={10} sm={5}>
              <span> {nameStatus}</span>
            </Col>
          </Row>
        )}
        {(nameStatus == 'confirm' || nameStatus == 'approved') && isUser && (
          <Row className={style.confirm}>
            <Col xs={10} sm={5}>
              {nameUserConfirm}:
            </Col>
            <Col xs={10} sm={5}>
              <span>Confirm</span>
            </Col>
          </Row>
        )}

        {nameStatus !== undefined && !isUser && (
          <Row className={style.comment}>
            <Col xs={10} sm={5}>
              Comment:
            </Col>
            <Col xs={24} sm={19}>
              <Form.Item
                name='reason'
                rules={[
                  {
                    required: true,
                    message: 'Please input your reason!'
                  }
                ]}
              >
                <Input.TextArea
                  disabled={(nameStatus !== 'sent' && isManager && true) || (nameStatus === 'approved' && isAdmin)}
                  style={{ height: '120px' }}
                  onChange={(e) => setReason(e.target.value)}
                  showCount
                  maxLength={100}
                />
              </Form.Item>
            </Col>
          </Row>
        )}

        <Row gutter={30} justify='center'>
          {/* <Col>
            <Button type="primary" htmlType="submit" loading={registerOtLoading} onClick={handleRegisterOT}>
              Register
            </Button>
          </Col>
          <Col>
            <Button type="dash" onClick={handleCancel}>
              Cancel
            </Button>
          </Col> */}
          {!nameStatus && (
            <Col>
              <Button htmlType='submit' type='primary'>
                Register
              </Button>
            </Col>
          )}

          {nameStatus && isUser && (
            <Col>
              <Button
                disabled={(nameStatus === 'confirm' || nameStatus === 'approved') && true}
                htmlType='submit'
                type='primary'
              >
                Update
              </Button>
            </Col>
          )}

          {nameStatus && isUser && (
            <Col>
              <Button
                disabled={(nameStatus === 'confirm' || nameStatus === 'approved') && true}
                htmlType='submit'
                type='primary'
              >
                Delete
              </Button>
            </Col>
          )}

          {nameStatus !== undefined && isManager && (
            <Col>
              <Button
                disabled={(nameStatus === 'approved' || nameStatus === 'confirm') && true}
                htmlType='submit'
                type='primary'
              >
                Confirmed
              </Button>
            </Col>
          )}

          {nameStatus === 'confirm' && isAdmin && (
            <Col>
              <Button htmlType='submit' type='primary'>
                Approved
              </Button>
            </Col>
          )}
          {nameStatus !== undefined && isManager && (
            <Col>
              <Button
                disabled={(nameStatus === 'approved' || nameStatus === 'confirm') && true}
                htmlType='submit'
                type='primary'
              >
                Reject
              </Button>
            </Col>
          )}
          {nameStatus === 'confirm' && isAdmin && (
            <Col>
              <Button htmlType='submit' type='primary'>
                Reject
              </Button>
            </Col>
          )}
          <Col>
            <Button className={style.button_form} onClick={(e) => onCancel()}>
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default RegisterOT
