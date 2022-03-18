import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, TimePicker, Button, Modal, Form, Input } from 'antd'
import 'antd/dist/antd.css'
import style from './registerOT.module.css'
import moment from 'moment'
import { OTActions } from '../../../redux/registerOT'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const format = 'HH:mm'

const initial_in_office = moment.duration(`10:00:00`).asSeconds()

const RegisterOT = ({
  dataOT = {},
  status: statusRequest,
  onCancel,
  onOk,
  isUser = false,
  isManager = false,
  isAdmin = false
}) => {
  const { date, checkin, checkout, member_id, inOfficle } = dataOT
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  // const in_office_seconds = moment.duration(inOfficle).asSeconds()
  const in_office_seconds = moment.duration(`10:40:00`).asSeconds()

  const [reason, setReason] = useState('')
  const [actualOverTime, setActualOverTime] = useState('')
  const [requestOT, setRequestOT] = useState(0)
  const [nameUserConfirm] = useState('Vu Van Vinh')
  const [nameUserApproved] = useState('Trần Xuân Đức')
  const [dateConfirm] = useState('2022-02-20 12:04')
  const [status] = useState(statusRequest)
  const [nameStatus, setNameStatus] = useState()

  const {
    loadingRegisterOT,
    loadingUpdateOT,
    loadingDeleteOT,
    loadingConfirmOT,
    loadingApprovedOT,
    loadingRejectOT,

    successRegisterOT,
    successUpdateOT,
    successDeleteOT,
    successConfirmOT,
    successApprovedOT,
    successRejectOT,

    errorRegisterOT,
    errorUpdateOT,
    errorDeleteOT,
    errorConfirmOT,
    errorApprovedOT,
    errorRejectOT
  } = useSelector((state) => state.OT)

  const dataDefaultOT = {
    request_type: 5,
    reason: 'Khách hàng request OT để deploy hệ thống.',
    request_ot_time: 1800,
    manager_confirmed_comment: 'Confirm',
    admin_approved_comment: 'Approved'
  }

  const dataRequest = {
    request_type: 5,
    request_for_date: date.split('|')[0],
    check_in: checkin,
    check_out: checkout,
    // compensation_time: '8:00',
    // compensation_date: '',
    leave_all_day: '0',
    leave_start: '8:00',
    leave_end: '16:00',
    leave_time: '1:00',
    request_ot_time: moment.utc(requestOT * 1000).format('HH:mm'),
    reason: reason
  }

  useEffect(() => {
    setActualOverTime(
      moment
        .utc(moment
          .duration(in_office_seconds - initial_in_office, 'seconds')
          .as('milliseconds'))
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
    if ((successRegisterOT || successUpdateOT || successConfirmOT) === true) {
      dispatch(OTActions.getRequest(member_id))
    }
    if (successRegisterOT === true) {
      toast('successRegisterOT')
      dispatch(OTActions.clearSuccess())
    }
    if (successUpdateOT === true) {
      toast('successUpdateOT')
      dispatch(OTActions.clearSuccess())
    }
    if (successConfirmOT === true) {
      toast('Success Confirm OT')
      dispatch(OTActions.clearSuccess())
    }
    if (successDeleteOT === true) {
      toast('Success DeleteOT Request')
      dispatch(OTActions.clearSuccess())
    }
    if (successApprovedOT === true) {
      toast('Success Approved Request')
      dispatch(OTActions.clearSuccess())
    }
    if (successRejectOT === true) {
      toast('Success Reject Request')
      dispatch(OTActions.clearSuccess())
    }
    if (errorRegisterOT !== '') {
      toast(errorRegisterOT)
      dispatch(OTActions.clearSuccess())
    }
    if (errorUpdateOT !== '') {
      toast(errorUpdateOT)
      dispatch(OTActions.clearSuccess())
    }
    if (errorConfirmOT !== '') {
      toast(errorConfirmOT)
      dispatch(OTActions.clearSuccess())
    }
    if (errorDeleteOT !== '') {
      toast(errorDeleteOT)
      dispatch(OTActions.clearSuccess())
    }
    if (errorApprovedOT !== '') {
      toast(errorApprovedOT)
      dispatch(OTActions.clearSuccess())
    }
    if (errorRejectOT !== '') {
      toast(errorRejectOT)
      dispatch(OTActions.clearSuccess())
    }
  }, [
    successRegisterOT,
    successUpdateOT,
    successConfirmOT,
    successDeleteOT,
    successRejectOT,

    errorRegisterOT,
    errorUpdateOT,
    errorConfirmOT,
    errorApprovedOT,
    errorDeleteOT,
    errorRejectOT
  ])

  const handleRegisterOT = () => {
    if (reason !== '') {
      dispatch(OTActions.registerOT(dataRequest))
      // onOk()
    }
  }

  const handleUpdateOT = () => {
    dispatch(OTActions.updateOT(dataRequest, member_id))
    // onOk()
  }

  const handleDeleteOT = () => {
    dispatch(OTActions.deleteOT(member_id))
    // onOk()
  }

  const handleCancel = () => {
    form.resetFields()
    onCancel()
  }

  const handleChangeTimeRequestOT = (time, timeString) => {
    const totalTimeRequestOtSecond = moment.duration(time.format('HH:mm:ss')).asSeconds()
    if (totalTimeRequestOtSecond > (moment.duration(actualOverTime).asSeconds())) {
      alert('Thời gian request OT không lớn hơn thời gian Overtime Actual')
    } else {
      setRequestOT(totalTimeRequestOtSecond)
    }
  }

  return (
    <div className={style.registerOT}>
      <Form
        form={form}
        initialValues={{
          reason: dataDefaultOT.reason,
          requestOT: moment(moment.utc(dataDefaultOT.request_ot_time * 1000).format('HH:mm'), 'HH:mm'),
          comment: isManager
            ? dataDefaultOT.manager_confirmed_comment
            : dataDefaultOT.admin_approved_comment
        }}
      >
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
          <Col sm={7}>{date.split('|')[0]}</Col>
        </Row>

        <Row className={style.rowCheckIn}>
          <Col xs={10} sm={5}>
            Check-in:
          </Col>
          <Col xs={14} sm={8}>
            {checkin}
          </Col>
          <Col xs={10} sm={3}>
            Check-out:
          </Col>
          <Col sm={7}>{checkout}</Col>
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
                name='comment'
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

        <Row gutter={30} justify='center' className={style.row_button}>
          {!nameStatus && (
            <Col>
              <Button
                htmlType='submit'
                type='primary'
                onClick={handleRegisterOT}
                loading={loadingRegisterOT}
              >
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
                onClick={handleUpdateOT}
                loading={loadingUpdateOT}
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
                onClick={handleDeleteOT}
                loading={loadingDeleteOT}
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
                loading={loadingConfirmOT}
              >
                Confirmed
              </Button>
            </Col>
          )}

          {nameStatus === 'confirm' && isAdmin && (
            <Col>
              <Button htmlType='submit' type='primary' loading={loadingApprovedOT}>
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
                loading={loadingRejectOT}
              >
                Reject
              </Button>
            </Col>
          )}
          {nameStatus === 'confirm' && isAdmin && (
            <Col>
              <Button htmlType='submit' type='primary' loading={loadingRejectOT}>
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

export default RegisterOT
