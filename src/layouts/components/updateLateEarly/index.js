import React, { useState, useEffect } from 'react'
import { Row, Col, DatePicker, Button, Modal, Form, Input } from 'antd'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { fetchLateEarly } from '../../../redux/lateEarly'
import 'antd/dist/antd.css'
import style from './updateLateEarly.module.css'

const EditLateEarly = () => {
  const [form] = Form.useForm()

  const dispatch = useDispatch()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [reason, setReason] = useState()
  const [dateCoverUp, setDateCoverUp] = useState('')
  const [lateTime, setLateTime] = useState(0)
  const [earlyTime, setEarlyTime] = useState(0)
  const [timeRequest, setTimeRequest] = useState(0)

  const { lateEarly } = useSelector((state) => state.lateEarly)

  const checkIn = moment(lateEarly.check_in).format('HH:mm')
  const checkOut = moment(lateEarly.check_out).format('HH:mm')
  const registerForDate = moment(lateEarly.request_for_date).format('YYYY-MM-DD')

  const totalSecondsCheckIn = moment.duration(checkIn).asSeconds()
  const totalSecondsCheckOut = moment.duration(checkOut).asSeconds()

  useEffect(() => {
    dispatch(fetchLateEarly())
  }, [])

  useEffect(() => {
    if (totalSecondsCheckIn > moment.duration(`08:00:00`).asSeconds()) {
      setLateTime(totalSecondsCheckIn - moment.duration(`08:00:00`).asSeconds())
    }
    if (totalSecondsCheckOut < moment.duration(`17:00:00`).asSeconds()) {
      setEarlyTime(moment.duration(`17:00:00`).asSeconds() - totalSecondsCheckOut)
    }

    setReason(lateEarly.reason)
    setDateCoverUp(moment(lateEarly.compensation_date).format('YYYY-MM-DD'))
    setTimeRequest(lateTime + earlyTime)
  })

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleUpdateLateEarly = () => {}

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  return (
    <div className={style.editLateEarly}>
      <Button type='primary' onClick={showModal}>
        Edit Late Early
      </Button>
      <Modal
        style={{ fontWeight: 500 }}
        width={700}
        title='Edit Late/Early'
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form}>
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
            <Col sm={7}>{registerForDate}</Col>
          </Row>

          <Row className={style.row_lineHeight}>
            <Col xs={10} sm={5}>
              Check-in:
            </Col>
            <Col xs={14} sm={8}>
              {checkIn}
            </Col>
            <Col xs={10} sm={3}>
              Check-out:
            </Col>
            <Col sm={7}>{checkOut}</Col>
          </Row>

          <Row className={style.row_lineHeight}>
            <Col xs={10} sm={5}>
              Late time:
            </Col>
            <Col xs={14} sm={8}>
              <span style={{ color: 'red' }}>{moment.utc(lateTime * 1000).format('mm:ss')}</span>
            </Col>
            <Col sm={3}>Early time:</Col>
            <Col sm={7}></Col>
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
                  defaultValue={moment(dateCoverUp)}
                  onChange={(e) => setDateCoverUp(e.format('YYYY-MM-DD'))}
                />
              </Form.Item>
            </Col>
            <Col xs={10} sm={6}>
              Overtime: <b>00:16</b>
            </Col>
            <Col>
              Time request:
              <span style={{ color: 'red' }}> {moment.utc(timeRequest * 1000).format('mm:ss')}</span>
            </Col>
          </Row>

          <Row className={style.row_lineHeight}>
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
                  style={{ height: '120px' }}
                  defaultValue={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row className={style.status}>
            <Col xs={4} sm={5}>
              Status:
            </Col>
            <Col sm={7}>Sent</Col>
          </Row>

          <Row gutter={30} justify='center'>
            <Col>
              <Button type='primary' htmlType='submit' onClick={handleUpdateLateEarly}>
                Update
              </Button>
            </Col>
            <Col>
              <Button type='danger'>Delete</Button>
            </Col>
            <Col>
              <Button type='dash' onClick={handleCancel}>Cancel</Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  )
}

export default EditLateEarly
