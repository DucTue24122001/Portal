import React, { useEffect, useRef, useState } from 'react'
import style from './FormLeave.module.css'
import moment from 'moment'
import { TimePicker, Checkbox, Radio, Input, Button, Form, Spin, Row, Col } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { leaveActions } from '../../redux/leave'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const { RangePicker } = TimePicker
const rangeConfig = {
  rules: [{ type: 'array', required: true, message: 'Please select time!' }]
}
const disabledTimeAM = [0, 1, 2, 3, 4, 5, 6, 7]
const disabledTimePM = [18, 19, 20, 21, 22, 23]

const dataLeave = {
  check_in: '8:00',
  check_out: '16:00',
  compensation_date: '',
  compensation_time: '',
  leave_all_day: 1,
  leave_end: '08:07:00',
  leave_start: '06:07:00',
  leave_time: '01:00',
  reason: 'xin nghi 1 ngay',
  request_for_date: '2022-01-12',
  request_ot_time: '',
  request_type: 2,
  status: 0,
  manager_confirmed_comment: 'manager_confirmed_comment',
  admin_approved_comment: 'admin_approved_comment'
}

const FormLeave = ({ onCancel, isUser = false, isManager = false, isAdmin = false, dataModal = {}}) => {
  const { checkin, checkout, date, Worktime, lack } = dataModal
  const [form] = Form.useForm(0)
  const [status] = useState(0)
  const dispatch = useDispatch()
  const registerDate = useRef(moment().format('DD-MM-YY hh:mm'))
  const [nameStatus, setNameStatus] = useState()
  const [nameUserConfirm] = useState('Vu Van Vinh')
  const [leaveTime, setLeaveTime] = useState((dataLeave && dataLeave.leave_time) || '')
  const [disabledStartTime] = useState([...disabledTimeAM, ...disabledTimePM])
  const {
    loadingRegisterLeave,
    loadingUpdateLeave,
    loadingConfirmLeave,
    loadingGetLeaveRequest,
    loadingDeleteLeaveRequest,
    loadingApprovedLeave,
    loadingRejectLeaveRequest,

    successRegisterLeave,
    successUpdateLeave,
    successConfirmLeave,
    successDeleteLeaveRequest,
    successApprovedLeave,
    successRejectLeaveRequest,

    errorRegisterLeave,
    errorUpdateLeave,
    errorConfirmLeave,
    errorDeletetLeaveRequest,
    errorApprovedLeave,
    errorRejectLeaveRequest
  } = useSelector((state) => state.leave)

  const onFinish = (values) => {
    const { reason, Range, request_type, leave_all_day } = values
    const dataForm = {
      request_type: request_type,
      request_for_date: date,
      check_in: checkin,
      check_out: checkout,
      compensation_time: '',
      compensation_date: '',
      leave_all_day: leave_all_day ? 1 : 0,
      leave_start: moment.utc(moment.duration(Range[0], 'seconds').as('milliseconds')).format('HH:mm'),
      leave_end: moment.utc(moment.duration(Range[1], 'seconds').as('milliseconds')).format('HH:mm'),
      leave_time: moment.utc(moment.duration(leaveTime, 'seconds').as('milliseconds')).format('HH:mm'),
      request_ot_time: '',
      reason: reason
    }

    if (nameStatus === undefined && isUser) {
      console.log(1)
      dispatch(leaveActions.register(dataForm))
    }
    if (nameStatus === 'sent' && isUser) {
      console.log('dataUpdate', dataForm)
      dispatch(leaveActions.update(dataForm, idLeave))
    }
    if (nameStatus === 'sent' && isManager) {
      const dataConfirm = {
        ...dataForm,
        manager_confirmed_status: 1,
        manager_id: '',
        manager_confirmed_at: moment().format('DD-MM-YY hh:mm')
      }
      console.log('dataConfirm', dataConfirm)
      dispatch(leaveActions.confirm(dataConfirm, idLeave))
    }
    if (nameStatus === 'confirm' && isAdmin) {
      const dataApprove = {
        ...dataForm,
        admin_approved_status: 2,
        admin_id: '',
        admin_approved_at: moment().format('DD-MM-YY hh:mm')
      }
      console.log('dataApprove', dataApprove)
      dispatch(leaveActions.appproved(dataApprove, idLeave))
    }
  }

  useEffect(() => {
    if ((successRegisterLeave || successUpdateLeave || successConfirmLeave) === true) {
      dispatch(leaveActions.getRequest(idLeave))
    }
    if (successRegisterLeave === true) {
      toast('successRegisterLeave')
      dispatch(leaveActions.clearSuccess())
    }
    if (successUpdateLeave === true) {
      toast('successUpdateLeave')
      dispatch(leaveActions.clearSuccess())
    }
    if (successConfirmLeave === true) {
      toast('Success Confirm Leave')
      dispatch(leaveActions.clearSuccess())
    }
    if (successDeleteLeaveRequest === true) {
      toast('Success DeleteLeave Request')
      dispatch(leaveActions.clearSuccess())
    }
    if (successApprovedLeave === true) {
      toast('Success Approved Request')
      dispatch(leaveActions.clearSuccess())
    }
    if (successRejectLeaveRequest === true) {
      toast('Success Reject Request')
      dispatch(leaveActions.clearSuccess())
    }
    if (errorRegisterLeave !== '') {
      toast(errorRegisterLeave)
      dispatch(leaveActions.clearSuccess())
    }
    if (errorUpdateLeave !== '') {
      toast(errorUpdateLeave)
      dispatch(leaveActions.clearSuccess())
    }
    if (errorConfirmLeave !== '') {
      toast(errorConfirmLeave)
      dispatch(leaveActions.clearSuccess())
    }
    if (errorDeletetLeaveRequest !== '') {
      toast(errorDeletetLeaveRequest)
      dispatch(leaveActions.clearSuccess())
    }
    if (errorApprovedLeave !== '') {
      toast(errorApprovedLeave)
      dispatch(leaveActions.clearSuccess())
    }
    if (errorRejectLeaveRequest !== '') {
      toast(errorRejectLeaveRequest)
      dispatch(leaveActions.clearSuccess())
    }
  }, [
    successRegisterLeave,
    successUpdateLeave,
    successConfirmLeave,
    successDeleteLeaveRequest,
    successRejectLeaveRequest,

    errorRegisterLeave,
    errorUpdateLeave,
    errorConfirmLeave,
    errorApprovedLeave,
    errorDeletetLeaveRequest,
    errorRejectLeaveRequest
  ])

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
  }, [status])

  const rangerTime = (time) => {
    const totalSecondsStart = moment.duration(time[0].format('HH:mm')).asSeconds()
    const totalSecondsEnd = moment.duration(time[1].format('HH:mm')).asSeconds()
    setLeaveTime(totalSecondsEnd - totalSecondsStart)
  }

  const handleDelete = () => {
    dispatch(leaveActions.delete())
  }

  return (
    <>
      {loadingGetLeaveRequest ? (
        <Spin tip='Loading...' />
      ) : (
        <div className={style.wrapper_form}>
          <Form
            form={form}
            name='basic'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete='off'
            initialValues={{
              leave_all_day: dataLeave?.leave_all_day !== 0,
              Range: dataLeave
                ? [
                  moment(moment.duration(dataLeave.leave_start).asMilliseconds()),
                  moment(moment.duration(dataLeave.leave_end).asMilliseconds())
                ]
                : [],
              reason: dataLeave ? dataLeave.reason : '',
              manager_confirmed_comment: dataLeave ? dataLeave.manager_confirmed_comment : '',
              admin_approved_comment: dataLeave ? dataLeave.admin_approved_comment : '',
              request_type: dataLeave ? dataLeave.request_type : ''
            }}
          >
            <Row gutter={[10, 10]}>
              {nameStatus !== undefined && !isUser && (
                <div style={{ display: 'flex', width: '100%' }}>
                  <Col className={style.form_item} span={4}>
                    Member:
                  </Col>
                  <Col className={style.form_item} span={20}>
                    <span>{nameUserConfirm}</span>
                  </Col>
                </div>
              )}
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
                <span>{date}</span>
              </Col>

              <Col span={4} className={style.form_item}>
                Check-in:
              </Col>
              <Col span={8} className={style.form_item}>
                <span> {checkin}</span>
              </Col>

              <Col span={4} className={style.form_item}>
                Check-out:
              </Col>
              <Col span={8} className={style.form_item}>
                <span> {checkout}</span>
              </Col>

              <Col span={4} className={style.form_item}>
                Work time:
              </Col>
              <Col span={8} className={style.form_item}>
                <span> {Worktime}</span>
              </Col>

              <Col span={4} className={style.form_item}>
                Lack time:
              </Col>
              <Col span={8} className={style.form_item}>
                <span> {lack}</span>
              </Col>

              <Col span={24} className={style.leaveAll}>
                <Form.Item className={style.wrapper_item_form} className={style.item_form} name='leave_all_day' noStyle>
                  <Checkbox
                    defaultChecked={dataLeave.leave_all_day !== 0}
                    disabled={
                      ((nameStatus == 'confirm' || nameStatus == 'approved') && true) ||
                      (nameStatus !== undefined && (isManager || isAdmin) && true)
                    }
                  >
                    Leave all day
                  </Checkbox>
                </Form.Item>
              </Col>

              <Col span={4} className={style.form_item}>
                Range:
              </Col>
              <Col span={8} className={style.form_item}>
                <Form.Item name='Range' {...rangeConfig}>
                  <RangePicker
                    disabled={
                      ((nameStatus == 'confirm' || nameStatus == 'approved') && true) ||
                      (nameStatus !== undefined && (isManager || isAdmin) && true)
                    }
                    className={style.timeBox}
                    disabledHours={() => disabledStartTime}
                    onChange={rangerTime}
                    format='HH:mm'
                  />
                </Form.Item>
              </Col>

              <Col span={4} className={style.form_item} className={style.timeBox}>
                <Form.Item name='request_type' rules={[{ required: true, message: 'Please pick an item!' }]}>
                  <Radio.Group
                    disabled={
                      ((nameStatus == 'confirm' || nameStatus == 'approved') && true) ||
                      (nameStatus !== undefined && (isManager || isAdmin) && true)
                    }
                    className={style.wrapper_button_radio}
                  >
                    <Radio value={2}>Paid</Radio>
                    <Radio value={3}>Unpaid</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>

              <Col span={8} className={style.form_item}>
                Time count:
                <span
                  style={{
                    color: leaveTime < moment.duration(`1:00:00`).asSeconds() ? 'red' : 'unset'
                  }}
                >
                  {moment.utc(moment.duration(leaveTime, 'seconds').as('milliseconds')).format('HH:mm')}
                </span>
              </Col>

              <Col span={4} className={style.form_item}>
                Reason:
              </Col>
              <Col span={20} className={style.form_item}>
                <Form.Item
                  className={style.item_form}
                  name='reason'
                  rules={[{ required: true, message: 'Please input Intro' }]}
                >
                  <Input.TextArea
                    disabled={
                      ((nameStatus == 'confirm' || nameStatus == 'approved') && true) ||
                      (nameStatus !== undefined && (isManager || isAdmin) && true)
                    }
                    showCount
                    maxLength={100}
                    rows={4}
                  />
                </Form.Item>
              </Col>
              {nameStatus && (
                <div style={{ display: 'flex', width: '100%' }}>
                  <Col className={style.form_item} span={4}>
                    Status:
                  </Col>
                  <Col className={style.form_item} span={20}>
                    <span> {nameStatus}</span>
                  </Col>
                </div>
              )}
              {(nameStatus == 'confirm' || nameStatus == 'approved') && isUser && (
                <div style={{ display: 'flex', width: '100%' }}>
                  <Col className={style.form_item} span={4}>
                    {nameUserConfirm}:
                  </Col>
                  <Col className={style.form_item} span={20}>
                    <span>Confirm</span>
                  </Col>
                </div>
              )}
              {nameStatus === 'sent' && isManager && (
                <div style={{ display: 'flex', width: '100%', marginTop: '20px' }}>
                  <Col className={style.form_item} span={4}>
                    Comment:
                  </Col>
                  <Col className={style.form_item} span={20}>
                    <Form.Item
                      className={style.item_form}
                      name='manager_confirmed_comment'
                      rules={[{ required: true, message: 'Please input comment' }]}
                    >
                      <Input.TextArea
                        disabled={
                          (nameStatus !== 'sent' && isManager && true) || (nameStatus === 'approved' && isAdmin)
                        }
                        showCount
                        maxLength={100}
                        rows={4}
                      />
                    </Form.Item>
                  </Col>
                </div>
              )}
              {nameStatus === 'confirm' && isAdmin && (
                <div style={{ display: 'flex', width: '100%', marginTop: '20px' }}>
                  <Col className={style.form_item} span={4}>
                    Comment:
                  </Col>
                  <Col className={style.form_item} span={20}>
                    <Form.Item
                      className={style.item_form}
                      name='admin_approved_comment'
                      rules={[{ required: true, message: 'Please input comment' }]}
                    >
                      <Input.TextArea
                        disabled={
                          (nameStatus !== 'sent' && isManager && true) || (nameStatus === 'approved' && isAdmin)
                        }
                        showCount
                        maxLength={100}
                        rows={4}
                      />
                    </Form.Item>
                  </Col>
                </div>
              )}
            </Row>

            <div className={style.wrapper_item_button_form}>
              {!nameStatus && (
                <Button loading={loadingRegisterLeave} className={style.button_form} htmlType='submit' type='primary'>
                  Register
                </Button>
              )}

              {nameStatus && isUser && (
                <Button
                  loading={loadingUpdateLeave}
                  disabled={(nameStatus === 'confirm' || nameStatus === 'approved') && true}
                  className={style.button_form}
                  htmlType='submit'
                  type='primary'
                >
                  Update
                </Button>
              )}

              {nameStatus && isUser && (
                <Button
                  loading={loadingDeleteLeaveRequest}
                  onClick={handleDelete}
                  disabled={(nameStatus === 'confirm' || nameStatus === 'approved') && true}
                  className={style.button_form}
                  type='danger'
                >
                  Delete
                </Button>
              )}

              {nameStatus !== undefined && isManager && (
                <Button
                  loading={loadingConfirmLeave}
                  disabled={(nameStatus === 'approved' || nameStatus === 'confirm') && true}
                  className={style.button_form}
                  htmlType='submit'
                  type='primary'
                >
                  Confirmed
                </Button>
              )}

              {nameStatus === 'confirm' && isAdmin && (
                <Button loading={loadingApprovedLeave} className={style.button_form} htmlType='submit' type='primary'>
                  Approved
                </Button>
              )}
              {nameStatus !== undefined && isManager && (
                <Button
                  loading={loadingRejectLeaveRequest}
                  disabled={(nameStatus === 'approved' || nameStatus === 'confirm') && true}
                  className={style.button_form}
                  htmlType='submit'
                  type='danger'
                >
                  Reject
                </Button>
              )}
              {nameStatus === 'confirm' && isAdmin && (
                <Button
                  loading={loadingRejectLeaveRequest}
                  className={style.button_form}
                  htmlType='submit'
                  ype='danger'
                >
                  Reject
                </Button>
              )}

              <Button className={style.button_form} onClick={(e) => onCancel()}>
                Cancel
              </Button>
            </div>
          </Form>
          <ToastContainer />
        </div>
      )}
    </>
  )
}

export default FormLeave
