import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, DatePicker, Button, Modal, Form, Input } from 'antd'
import 'antd/dist/antd.css'
import style from './registerLateEarly.module.css'
import moment from 'moment'
import { LateEarlyActions } from '../../../redux/lateEarly'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const in_office = '09:50'
const initial_in_office = moment.duration(`09:00:00`).asSeconds()

const RegisterLateEarly = ({
  dataLateEarly = {},
  status: statusRequest,
  onCancel,
  onOk
}) => {
  const { date, checkin, checkout, late, early, member_id } = dataLateEarly

  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const { infoUser } = useSelector((state) => state.infoUser)

  const in_office_seconds = moment.duration(in_office).asSeconds()
  const timeLateSeconds = moment.duration(late).asSeconds()
  const timeEarlySeconds = moment.duration(early).asSeconds()
  const timeRequestSeconds = timeLateSeconds + timeEarlySeconds
  const timeRequest = moment.utc(timeRequestSeconds * 1000).format('HH:mm')
  const overtimeSeconds = in_office_seconds - initial_in_office

  const [isUser, setIsUser] = useState(false)
  const [isManager, setIsManager] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const [dateCoverUp, setDateCoverUp] = useState('')
  const [reason, setReason] = useState('')
  const [comment, setComment] = useState('')
  const [overTime, setOverTime] = useState('')
  const [nameUserConfirm] = useState('Vu Van Vinh')
  const [nameUserApproved] = useState('Trần Xuân Đức')
  const [dateConfirm] = useState('2022-02-20 12:04')
  const [status] = useState(statusRequest)
  const [nameStatus, setNameStatus] = useState()
  const {
    loadingRegisterLateEarly,
    loadingUpdateLateEarly,
    loadingDeleteLateEarly,
    loadingConfirmLateEarly,
    loadingApprovedLateEarly,
    loadingRejectLateEarly,

    successRegisterLateEarly,
    successUpdateLateEarly,
    successDeleteLateEarly,
    successConfirmLateEarly,
    successApprovedLateEarly,
    successRejectLateEarly,

    errorRegisterLateEarly,
    errorUpdateLateEarly,
    errorDeleteLateEarly,
    errorConfirmLateEarly,
    errorApprovedLateEarly,
    errorRejectLateEarly
  } = useSelector((state) => state.lateEarly)

  const dataDefaultLateEarly = {
    request_type: 4,
    request_for_date: date,
    check_in: checkin,
    check_out: checkout,
    compensation_time: timeRequest,
    compensation_date: '2022-02-19',
    leave_all_day: '',
    leave_start: '',
    leave_end: '',
    leave_time: '',
    request_ot_time: '',
    reason: 'Em xin làm bù ngày 20/2 cho thời gian thiếu ngày 19/02.',
    error_count: '',
    created_at: moment().format('YYYY-MM-DD'),
    manager_confirmed_comment: 'Confirm',
    admin_approved_comment: 'Approved'
  }

  const dataRequest = {
    request_type: 4,
    request_for_date: date,
    check_in: checkin,
    check_out: checkout,
    compensation_time: timeRequest,
    compensation_date: dateCoverUp,
    leave_all_day: '',
    leave_start: '',
    leave_end: '',
    leave_time: '',
    request_ot_time: '',
    reason: reason,
    error_count: '',
    created_at: moment().format('DD-MM-YY hh:mm')
  }

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
      setIsUser(true)
      return
    }
  }, [])

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
  }, [status])

  useEffect(() => {
    if ((successRegisterLateEarly || successUpdateLateEarly || successConfirmLateEarly) === true) {
      dispatch(LateEarlyActions.getRequest(idLateEarly))
    }
    if (successRegisterLateEarly === true) {
      toast('successRegisterLateEarly')
      dispatch(LateEarlyActions.clearSuccess())
    }
    if (successUpdateLateEarly === true) {
      toast('successUpdateLateEarly')
      dispatch(LateEarlyActions.clearSuccess())
    }
    if (successConfirmLateEarly === true) {
      toast('Success Confirm LateEarly')
      dispatch(LateEarlyActions.clearSuccess())
    }
    if (successDeleteLateEarly === true) {
      toast('Success DeleteLateEarly Request')
      dispatch(LateEarlyActions.clearSuccess())
    }
    if (successApprovedLateEarly === true) {
      toast('Success Approved Request')
      dispatch(LateEarlyActions.clearSuccess())
    }
    if (successRejectLateEarly === true) {
      toast('Success Reject Request')
      dispatch(LateEarlyActions.clearSuccess())
    }
    if (errorRegisterLateEarly !== '') {
      toast(errorRegisterLateEarly)
      dispatch(LateEarlyActions.clearSuccess())
    }
    if (errorUpdateLateEarly !== '') {
      toast(errorUpdateLateEarly)
      dispatch(LateEarlyActions.clearSuccess())
    }
    if (errorConfirmLateEarly !== '') {
      toast(errorConfirmLateEarly)
      dispatch(LateEarlyActions.clearSuccess())
    }
    if (errorDeleteLateEarly !== '') {
      toast(errorDeleteLateEarly)
      dispatch(LateEarlyActions.clearSuccess())
    }
    if (errorApprovedLateEarly !== '') {
      toast(errorApprovedLateEarly)
      dispatch(LateEarlyActions.clearSuccess())
    }
    if (errorRejectLateEarly !== '') {
      toast(errorRejectLateEarly)
      dispatch(LateEarlyActions.clearSuccess())
    }
  }, [
    successRegisterLateEarly,
    successUpdateLateEarly,
    successConfirmLateEarly,
    successDeleteLateEarly,
    successRejectLateEarly,

    errorRegisterLateEarly,
    errorUpdateLateEarly,
    errorConfirmLateEarly,
    errorApprovedLateEarly,
    errorDeleteLateEarly,
    errorRejectLateEarly
  ])

  const handleRegister = () => {
    if (reason !== '' && dateCoverUp !== 0) {
      dispatch(LateEarlyActions.registerLateEarly(dataRequest))
      setReason('')
      setDateCoverUp('')
      onOk()
    }
  }

  const handleUpdateLateEarly = () => {
    dispatch(LateEarlyActions.updateLateEarly(dataRequest, member_id))
    onOk()
  }

  const handleDeleteLateEarly = () => {
    dispatch(LateEarlyActions.deleteLateEarly(member_id))
    onOk()
  }

  const handleConfirmLateEarly = () => {
    const dataConfirm = {
      ...dataRequest,
      manager_confirmed_status: 1,
      manager_id: 1,
      manager_confirmed_comment: comment,
      manager_confirmed_at: moment().format('DD-MM-YY hh:mm')
    }
    dispatch(LateEarlyActions.confirm(dataConfirm, dataConfirm.manager_id))
  }

  const handleApprovedLateEarly = () => {
    const dataApproved = {
      ...dataRequest,
      admin_confirmed_status: 1,
      admin_id: 68,
      admin_confirmed_comment: comment,
      admin_confirmed_at: moment().format('DD-MM-YY hh:mm')
    }
    dispatch(LateEarlyActions.approved(dataApproved, dataApproved.admin_id))
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
      <Form
        form={form}
        initialValues={{
          dateCoverUp: moment(dataDefaultLateEarly.compensation_date),
          reason: dataDefaultLateEarly.reason,
          comment: isManager
            ? dataDefaultLateEarly.manager_confirmed_comment
            : dataDefaultLateEarly.admin_approved_comment
        }}
      >
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
        {nameStatus && !isAdmin && (
          <Row className={style.status}>
            <Col xs={10} sm={5}>
              Status:
            </Col>
            <Col xs={10} sm={5}>
              <span> {nameStatus}</span>
            </Col>
          </Row>
        )}
        {nameStatus && isAdmin && (
          <Row className={style.status}>
            <Col xs={10} sm={5}>
              {nameUserApproved}
            </Col>
            <Col xs={10} sm={5}>
              <span> Confirm | {dateConfirm}</span>
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
                name='comment'
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
                  onChange={(e) => setComment(e.target.value)}
                  showCount
                  maxLength={100}
                />
              </Form.Item>
            </Col>
          </Row>
        )}

        <Row gutter={30} justify='center' className={style.row_button}>
          {!nameStatus && (
            <Col>
              <Button
                htmlType='submit'
                type='primary'
                onClick={handleRegister}
                loading={loadingRegisterLateEarly}
                disabled={(isAdmin || isManager) && true}
              >
                Register
              </Button>
            </Col>
          )}

          {nameStatus && isUser && (
            <Col>
              <Button
                disabled={(nameStatus === 'confirm' || nameStatus === 'approved') &&
                (isAdmin || isManager) && true}
                htmlType='submit'
                type='primary'
                onClick={handleUpdateLateEarly}
                loading={loadingUpdateLateEarly}
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
                  (isAdmin || isManager) && true
                }
                htmlType='submit'
                type='primary'
                onClick={handleDeleteLateEarly}
                loading={loadingDeleteLateEarly}
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
                  isUser && true
                }
                htmlType='submit'
                type='primary'
                onClick={handleConfirmLateEarly}
                loading={loadingConfirmLateEarly}
              >
                Confirmed
              </Button>
            </Col>
          )}

          {nameStatus === 'confirm' && isAdmin && (
            <Col>
              <Button
                disabled={nameStatus === 'approved' && isManager && isUser && true}
                htmlType='submit'
                type='primary'
                onClick={handleApprovedLateEarly}
                loading={loadingApprovedLateEarly}
              >
                Approved
              </Button>
            </Col>
          )}
          {nameStatus !== undefined && isManager && (
            <Col>
              <Button
                disabled={(nameStatus === 'approved' || nameStatus === 'confirm') && isUser && true}
                htmlType='submit'
                type='primary'
                loading={loadingRejectLateEarly}
              >
                Reject
              </Button>
            </Col>
          )}
          {nameStatus === 'confirm' && isAdmin && (
            <Col>
              <Button
                htmlType='submit'
                type='primary'
                loading={loadingRejectLateEarly}
              >
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
      <ToastContainer />
    </div>
  )
}

export default RegisterLateEarly
