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

const FormConfirmLeave = ({ onCancel, dataModalRequest }) => {
  const {
    admin_approved_comment,
    admin_full_name,
    check_in,
    check_out,
    leave_all_day,
    leave_end,
    leave_start,
    leave_time,
    manager_confirmed_comment,
    manager_full_name,
    member_full_name,
    reason,
    request_for_date,
    request_type,
    status
  } = dataModalRequest

  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const { infoUser } = useSelector((state) => state.infoUser)
  const [idRequest] = useState(0)
  const [isMember, setIsMember] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [nameStatus, setNameStatus] = useState()
  const [disabledStartTime] = useState([...disabledTimeAM, ...disabledTimePM])
  const registerDate = useRef(moment().format('DD-MM-YY hh:mm'))
  const {
    loadingConfirmLeave,
    loadingGetLeaveRequest,
    loadingApprovedLeave,
    loadingRejectLeaveRequest,

    successConfirmLeave,
    successRejectLeaveRequest,
    successApprovedLeave,

    errorConfirmLeave,
    errorApprovedLeave,
    errorRejectLeaveRequest
  } = useSelector((state) => state.leave)

  const onFinish = (values) => {
    const { reason, Range, request_type, leave_all_day } = values
    const dataForm = {
      request_type: request_type,
      request_for_date: request_for_date,
      leave_all_day: leave_all_day ? 1 : 0,
      leave_start: moment.utc(moment.duration(Range[0], 'seconds').as('milliseconds')).format('HH:mm'),
      leave_end: moment.utc(moment.duration(Range[1], 'seconds').as('milliseconds')).format('HH:mm'),
      leave_time: moment.utc(moment.duration(leave_time, 'seconds').as('milliseconds')).format('HH:mm'),
      reason: reason,
      member_id: infoUser?.id
    }
    const dataConfirm = {
      ...dataForm,
      manager_confirmed_status: 1,
      manager_id: infoUser?.id,
      manager_confirmed_at: moment().format('DD-MM-YY hh:mm')
    }
    const dataApprove = {
      ...dataConfirm,
      admin_approved_status: 2,
      admin_id: infoUser?.id,
      admin_approved_at: moment().format('DD-MM-YY hh:mm')
    }

    if (nameStatus === 'sent' && isAdmin) {
      dispatch(leaveActions.confirm(dataConfirm, idRequest))
    }
    if (nameStatus === 'confirm' && isAdmin) {
      dispatch(leaveActions.appproved(dataApprove, idRequest))
    }
  }

  useEffect(() => {
    if (successConfirmLeave) {
      toast('Success Confirm Leave')
      dispatch(leaveActions.clearSuccess())
      setTimeout(() => {
        onCancel()
      }, 5000)
    }
    if (successApprovedLeave) {
      toast('Success Approved Request')
      dispatch(leaveActions.clearSuccess())
      setTimeout(() => {
        onCancel()
      }, loadingApprovedLeave)
    }
    if (successRejectLeaveRequest) {
      toast('Success Reject Request')
      dispatch(leaveActions.clearSuccess())
      setTimeout(() => {
        onCancel()
      }, loadingRejectLeaveRequest)
    }
    if (errorConfirmLeave !== '') {
      toast(errorConfirmLeave)
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
  }, [successConfirmLeave, successRejectLeaveRequest, errorConfirmLeave, errorApprovedLeave, errorRejectLeaveRequest])

  useEffect(() => {
    const arrRoleId = []
    infoUser.roles.map((role) => {
      arrRoleId.push(role.id)
    })
    if (arrRoleId.includes(1) || arrRoleId.includes(2) || arrRoleId.includes(3)) {
      setIsAdmin(true)
      return
    }
    if (arrRoleId.includes(4)) {
      setIsMember(true)
      return
    }
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
  }, [status])

  const rangerTime = (time) => {
    const totalSecondsStart = moment.duration(time[0].format('HH:mm')).asSeconds()
    const totalSecondsEnd = moment.duration(time[1].format('HH:mm')).asSeconds()
    setLeaveTime(totalSecondsEnd - totalSecondsStart)
  }

  const handleDelete = () => {
    dispatch(leaveActions.delete(idRequest))
    form.resetFields()
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
              leave_all_day: leave_all_day !== 0,
              reason: reason,
              manager_confirmed_comment: manager_confirmed_comment,
              admin_approved_comment: admin_approved_comment,
              request_type: request_type
            }}
          >
            <Row gutter={[10, 10]}>
              {nameStatus !== undefined && !isMember && (
                <div style={{ display: 'flex', width: '100%' }}>
                  <Col className={style.form_item} span={4}>
                    Member:
                  </Col>
                  <Col className={style.form_item} span={20}>
                    <span>{member_full_name}</span>
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
                <span>{request_for_date}</span>
              </Col>

              <Col span={4} className={style.form_item}>
                Check-in:
              </Col>
              <Col span={8} className={style.form_item}>
                <span> {check_in}</span>
              </Col>

              <Col span={4} className={style.form_item}>
                Check-out:
              </Col>
              <Col span={8} className={style.form_item}>
                <span> {check_out}</span>
              </Col>

              <Col span={4} className={style.form_item}>
                Work time:
              </Col>
              <Col span={8} className={style.form_item}>
                <span> {leave_time}</span>
              </Col>

              <Col span={4} className={style.form_item}>
                Lack time:
              </Col>
              <Col span={8} className={style.form_item}>
                <span> {leave_time}</span>
              </Col>

              <Col span={24} className={style.leaveAll}>
                <Form.Item className={style.wrapper_item_form} className={style.item_form} name='leave_all_day' noStyle>
                  <Checkbox
                    defaultChecked={leave_all_day !== 0}
                    disabled={
                      nameStatus == 'confirm' ||
                      nameStatus == 'approved' ||
                      (nameStatus !== undefined && (isAdmin || isAdmin))
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
                      nameStatus == 'confirm' ||
                      nameStatus == 'approved' ||
                      (nameStatus !== undefined && (isAdmin || isAdmin))
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
                      nameStatus == 'confirm' ||
                      nameStatus == 'approved' ||
                      (nameStatus !== undefined && (isAdmin || isAdmin))
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
                    color: leave_time < moment.duration(`1:00:00`).asSeconds() ? 'red' : 'unset'
                  }}
                >
                  {moment.utc(moment.duration(leave_time, 'seconds').as('milliseconds')).format('HH:mm')}
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
                      nameStatus == 'confirm' ||
                      nameStatus == 'approved' ||
                      (nameStatus !== undefined && (isAdmin || isAdmin))
                    }
                    showCount
                    maxLength={100}
                    rows={4}
                  />
                </Form.Item>
              </Col>
              {nameStatus && !isAdmin && (
                <div style={{ display: 'flex', width: '100%' }}>
                  <Col className={style.form_item} span={4}>
                    Status:
                  </Col>
                  <Col className={style.form_item} span={20}>
                    <span> {nameStatus}</span>
                  </Col>
                </div>
              )}
              {(nameStatus == 'confirm' || nameStatus == 'approved') && isMember && (
                <div style={{ display: 'flex', width: '100%' }}>
                  <Col className={style.form_item} span={4}>
                    {manager_full_name}:
                  </Col>
                  <Col className={style.form_item} span={20}>
                    <span>Confirm</span>
                  </Col>
                </div>
              )}
              {nameStatus == 'approved' && isAdmin && (
                <div style={{ display: 'flex', width: '100%' }}>
                  <Col className={style.form_item} span={4}>
                    {admin_full_name}:
                  </Col>
                  <Col className={style.form_item} span={20}>
                    <span>Approved</span>
                  </Col>
                </div>
              )}
              {nameStatus === 'sent' && isAdmin && (
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
                        disabled={nameStatus !== 'sent' || (nameStatus === 'approved' && isAdmin)}
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
                        disabled={nameStatus !== 'sent' || (nameStatus === 'approved' && isAdmin)}
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
              {nameStatus !== undefined && isAdmin && (
                <Button
                  loading={loadingConfirmLeave}
                  disabled={(nameStatus === 'approved' || nameStatus === 'confirm') && isMember}
                  className={style.button_form}
                  htmlType='submit'
                  type='primary'
                >
                  Confirmed
                </Button>
              )}

              {nameStatus === 'confirm' && isAdmin && (
                <Button
                  disabled={nameStatus === 'approved' && isMember}
                  loading={loadingApprovedLeave}
                  className={style.button_form}
                  htmlType='submit'
                  type='primary'
                >
                  Approved
                </Button>
              )}
              {nameStatus === 'confirm' && isAdmin && (
                <Button
                  loading={loadingRejectLeaveRequest}
                  className={style.button_form}
                  htmlType='submit'
                  type='danger'
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

export default FormConfirmLeave
