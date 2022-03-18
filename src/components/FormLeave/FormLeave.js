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

const FormLeave = ({ onCancel }) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const dataModal = useSelector((state) => state.timesheet.modalRowTable)
  const { checkin, checkout, date, Worktime, lack } = dataModal
  const { infoUser } = useSelector((state) => state.infoUser)
  const { dataLeave } = useSelector((state) => state.leave)
  const [status, setStatus] = useState()
  const [idRequest, setIdRequest] = useState()
  const [isMember, setIsMember] = useState(false)
  const [isManager, setIsManager] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [nameStatus, setNameStatus] = useState()
  const [leaveTime, setLeaveTime] = useState(dataLeave?.leave_time)
  const [disabledStartTime] = useState([...disabledTimeAM, ...disabledTimePM])
  const registerDate = useRef(moment().format('DD-MM-YY hh:mm'))
  const {
    loadingRegisterLeave,
    loadingUpdateLeave,
    loadingGetLeaveRequest,
    loadingDeleteLeave,

    successRegisterLeave,
    successUpdateLeave,
    successDeleteLeave,
    successGetLeaveRequest,

    errorRegisterLeave,
    errorUpdateLeave,
    errorDeletetLeave
  } = useSelector((state) => state.leave)

  useEffect(() => {
    if (successGetLeaveRequest || successUpdateLeave || successRegisterLeave) {
      if (dataLeave !== {} && dataLeave !== undefined) {
        dispatch(leaveActions.getRequest(dataLeave?.id))
        setStatus(dataLeave?.status)
        setIdRequest(dataLeave?.id)
      }
    }
  }, [successRegisterLeave, successGetLeaveRequest, successUpdateLeave])

  const onFinish = (values) => {
    const { reason, Range, request_type, leave_all_day } = values
    const request_for_date = date.split('|')
    const dataForm = {
      request_type: request_type,
      request_for_date: request_for_date[0],
      leave_all_day: leave_all_day ? 1 : 0,
      leave_start: moment.utc(moment.duration(Range[0], 'seconds').as('milliseconds')).format('HH:mm'),
      leave_end: moment.utc(moment.duration(Range[1], 'seconds').as('milliseconds')).format('HH:mm'),
      leave_time: moment.utc(moment.duration(leaveTime, 'seconds').as('milliseconds')).format('HH:mm'),
      reason: reason,
      member_id: infoUser?.id
    }

    if (nameStatus === undefined) {
      dispatch(leaveActions.register(dataForm))
    }
    if (nameStatus === 'sent') {
      dispatch(leaveActions.update(dataForm, idRequest))
    }
  }

  useEffect(() => {
    if (successRegisterLeave) {
      toast('successRegisterLeave')
      dispatch(leaveActions.clearSuccess())
    }
    if (successUpdateLeave) {
      toast('successUpdateLeave')
      dispatch(leaveActions.clearSuccess())
      setTimeout(() => {
        onCancel()
      }, 5000)
    }
    if (successDeleteLeave) {
      setNameStatus(undefined)
      toast('Success DeleteLeave Request')
      dispatch(leaveActions.clearSuccess())
      setTimeout(() => {
        onCancel()
      }, 5000)
    }
    if (errorRegisterLeave !== '') {
      toast(errorRegisterLeave)
      dispatch(leaveActions.clearSuccess())
    }
    if (errorUpdateLeave !== '') {
      toast(errorUpdateLeave)
      dispatch(leaveActions.clearSuccess())
    }
    if (errorDeletetLeave !== '') {
      toast(errorDeletetLeave)
      dispatch(leaveActions.clearSuccess())
    }
  }, [successRegisterLeave, successUpdateLeave, errorRegisterLeave, errorUpdateLeave, errorDeletetLeave])

  useEffect(() => {
    const arrRoleId = []
    infoUser.roles.map((role) => {
      arrRoleId.push(role.id)
    })
    if (arrRoleId.includes(1) || arrRoleId.includes(2)) {
      setIsAdmin(true)
      return
    }
    if (arrRoleId.includes(3)) {
      setIsManager(true)
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
    setStatus(undefined)
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
              {nameStatus !== undefined && !isMember && (
                <div style={{ display: 'flex', width: '100%' }}>
                  <Col className={style.form_item} span={4}>
                    Member:
                  </Col>
                  <Col className={style.form_item} span={20}>
                    <span>{dataLeave?.member_full_name}</span>
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
                    defaultChecked={dataLeave?.leave_all_day !== 0}
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
                    {nameUserConfirm}:
                  </Col>
                  <Col className={style.form_item} span={20}>
                    <span>Confirm</span>
                  </Col>
                </div>
              )}
              {nameStatus == 'approved' && isAdmin && (
                <div style={{ display: 'flex', width: '100%' }}>
                  <Col className={style.form_item} span={4}>
                    {nameUserApproved}:
                  </Col>
                  <Col className={style.form_item} span={20}>
                    <span>Approved</span>
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
                <Button
                  loading={loadingRegisterLeave}
                  className={style.button_form}
                  htmlType='submit'
                  type='primary'
                >
                  Register
                </Button>
              )}

              {nameStatus && isMember && (
                <Button
                  loading={loadingUpdateLeave}
                  disabled={(nameStatus === 'confirm' || nameStatus === 'approved') && (isAdmin || isManager) && true}
                  className={style.button_form}
                  htmlType='submit'
                  type='primary'
                >
                  Update
                </Button>
              )}

              {nameStatus && isMember && (
                <Button
                  loading={loadingDeleteLeave}
                  onClick={handleDelete}
                  disabled={(nameStatus === 'confirm' || nameStatus === 'approved') && (isAdmin || isManager) && true}
                  className={style.button_form}
                  type='danger'
                >
                  Delete
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
