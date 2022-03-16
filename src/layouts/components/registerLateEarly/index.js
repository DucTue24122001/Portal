import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Row, Col, DatePicker, Button, Modal, Form, Input } from 'antd'
import 'antd/dist/antd.css'
import style from './registerLateEarly.module.css'
import moment from 'moment'
import { LateEarlyActions } from '../../../redux/lateEarly'

const dataModal = {
  checkin: '8:30',
  checkout: '16:00',
  date: '2022-01-12',
  late: '00:10',
  early: '00:20'
}

const { checkin, checkout, date, late, early } = dataModal
const in_office = '09:50'
const initial_in_office = moment.duration(`09:00:00`).asSeconds()

const RegisterLateEarly = ({
  onCancel,
  onOk,
  isUser = true,
  isManager = false,
  isAdmin = false
}) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const in_office_seconds = moment.duration(in_office).asSeconds()
  const timeLateSeconds = moment.duration(late).asSeconds()
  const timeEarlySeconds = moment.duration(early).asSeconds()
  const timeRequestSeconds = timeLateSeconds + timeEarlySeconds
  const timeRequest = moment.utc(timeRequestSeconds * 1000).format('HH:mm')
  const overtimeSeconds = in_office_seconds - initial_in_office

  const [dateCoverUp, setDateCoverUp] = useState('')
  const [reason, setReason] = useState('')
  const [overTime, setOverTime] = useState('')
  const [nameUserConfirm] = useState('Vu Van Vinh')
  const [nameUserApproved] = useState('Trần Xuân Đức')
  const [dateConfirm] = useState('2022-02-20 12:04')
  const [status] = useState()
  const [nameStatus, setNameStatus] = useState()

  console.log('timeRequestSeconds', timeRequestSeconds, timeRequest)
  useEffect(() => {
    setOverTime(
      moment
        .utc(
          moment
            .duration(overtimeSeconds, 'seconds')
            .as('milliseconds')
        )
        .format('HH:mm')
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

  const handleRegister = () => {
    // const value = {
    //   compensation_date: dateCoverUp,
    //   reason: reason,
    //   status: 'sent'
    // }
    // if (reason !== '' && dateCoverUp !== 0) {
    //   dispatch(LateEarlyActions.registerLateEarly(value))
    //   setReason('')
    //   setDateCoverUp('')
    //   onOk()
    // }
  }

  const handleCancel = () => {
    form.resetFields()
    onCancel()
  }

  const disabledDate = (current) => {
    return (
      current &&
      (current < moment().subtract(2, 'days').endOf('day') ||
        current >= moment().startOf('day'))
    )
  }

  return (
    <div className={style.registerLateEarly}>
      <Form form={form}>
        {nameStatus !== undefined && !isUser && (
          <Row className={style.row_lineHeight}>
            <Col xs={10} sm={5}>
              Member:
            </Col>
            <Col sm={7}>Vu Van Vịnh</Col>
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
          <Col sm={7}>{date}</Col>
        </Row>

        <Row className={style.row_lineHeight}>
          <Col xs={10} sm={5}>
            Check-in:
          </Col>
          <Col xs={14} sm={8}>
            {checkin}
          </Col>
          <Col xs={10} sm={2}>
            Check-out:
          </Col>
          <Col sm={7}>{checkout}</Col>
        </Row>

        <Row className={style.row_lineHeight}>
          <Col xs={10} sm={5}>
            Late time:
          </Col>
          <Col xs={14} sm={8}>
            <span style={{ color: 'red' }}>{late}</span>
          </Col>
          <Col xs={10} sm={2}>Early time:</Col>
          <Col xs={14} sm={7}>
            <span style={{ color: 'red' }}>{early}</span>
          </Col>
        </Row>

        <Row className={style.date_corer_up}>
          <Col xs={10} sm={5}>
            Date cover up: <span style={{ color: 'red' }}>(*)</span>
          </Col>
          <Col sm={8}>
            <Form.Item
              name='dateCoverUp'
              rules={[
                {
                  required: true,
                  message: 'Please input your date cover up!'
                }
              ]}
            >
              <DatePicker
                disabled={
                  ((nameStatus == 'confirm' || nameStatus == 'approved') &&
                    true) ||
                  (nameStatus !== undefined && (isManager || isAdmin) && true)
                }
                format='YYYY-MM-DD'
                disabledDate={disabledDate}
                onChange={(e) => setDateCoverUp(e.format('YYYY-MM-DD'))}
              />
            </Form.Item>
          </Col>
          <Col xs={10} sm={2}>
            Overtime:
          </Col>
          <Col sm={4}>
            <b>{overTime}</b>
          </Col>
          <Col sm={3}>Time request:</Col>
          <Col sm={2}>
            <span
              style={{
                color: (overtimeSeconds < timeLateSeconds) ? 'red' : 'unset'
              }}>
              {timeRequest}
            </span>
          </Col>
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
                  ((nameStatus == 'confirm' || nameStatus == 'approved') &&
                    true) ||
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
              Comment: <span style={{ color: 'red' }}>(*)</span>
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
                    (nameStatus !== 'sent' && isManager && true) ||
                    (nameStatus === 'approved' && isAdmin)
                  }
                  style={{ height: '120px' }}
                  onChange={(e) => setReason(e.target.value)}
                  showCount
                  maxLength={100}
                />
              </Form.Item>
            </Col>
          </Row>
        )}

        <Row gutter={30} justify='center' className={style.row_button}>
          {/* <Col>
            <Button type="primary" htmlType="submit" onClick={handleRegister}>
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
                disabled={
                  (nameStatus === 'confirm' || nameStatus === 'approved') &&
                  true
                }
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
                disabled={
                  (nameStatus === 'confirm' || nameStatus === 'approved') &&
                  true
                }
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
                disabled={
                  (nameStatus === 'approved' || nameStatus === 'confirm') &&
                  true
                }
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
                disabled={
                  (nameStatus === 'approved' || nameStatus === 'confirm') &&
                  true
                }
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
            <Button className={style.button_form} onClick={handleCancel}>
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default RegisterLateEarly
