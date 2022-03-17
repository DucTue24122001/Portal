import React from 'react'
import moment from 'moment'
import { Row, Col, Radio, Space, Select, DatePicker, Button, Table, Pagination, Modal } from 'antd'
import { useState, useEffect } from 'react'
import styles from './request.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { requestsActions } from './../../redux/requests'
import { useHistory } from 'react-router-dom'
import RegisterLateEarly from '../../layouts/components/registerLateEarly'
import FormConfirmLeave from '../../components/FormLeave/FormConfirmLeave'

const RequestsPage = () => {
  const history = useHistory()
  const [dataModal, setDataModal] = useState()
  const { Option } = Select
  const { RangePicker } = DatePicker
  const [selectDisabled, setSelectDisable] = useState(false)
  const [rangePickerDisabled, setRangePickerDisable] = useState(true)
  const [params, setParams] = useState({ page: 1, per_page: 5 })
  const [visibleForgetCheck, setVisibleForgetCheck] = useState(false)
  const [visiblePaiLeave, setVisiblePaiLeave] = useState(false)
  const [visibleUnPaiLeave, setVisibleUnPaiLeave] = useState(false)
  const [visibleLateEarly, setVisibleLateEarly] = useState(false)
  const [visibleOT, setVisibleOT] = useState(false)
  const valuecheckbox = ['this month', 'last month']
  const valueStatus = ['Sent', 'Confirmed', 'Approved']
  const valuePerPage = [30, 50, 100]
  const dispacth = useDispatch()
  const { requests, loadingRequests } = useSelector((state) => state.requests)
  const { infoUser, successGetInfo } = useSelector((state) => state.infoUser)
  const [valueCheckboxMonth, setValueCheckboxMonth] = useState(1)
  const [selectType, setSelectType] = useState(1)
  const [valueSort, setValueSort] = useState('asc')
  const [valueSearchStatus, setValueSearchStatus] = useState(0)
  const [role, setRole] = useState()

  useEffect(() => {
    if (successGetInfo) {
      if (infoUser?.roles?.find((u) => ['Member'].includes(u.title)) && infoUser?.roles?.length === 1) {
        history.push('/')
      } else if (infoUser?.roles?.find((u) => ['Manager'].includes(u.title)) && infoUser?.roles?.length === 2) {
        setRole('Manager')
      } else setRole('Admin')
    }
  }, [successGetInfo])

  useEffect(() => {
    if (role === 'Admin') {
      dispacth(requestsActions.getAdminRequests(params, valueSort, valueSearchStatus, selectType, valueCheckboxMonth))
    } else {
      dispacth(requestsActions.getManagerRequests(params, valueSort, valueSearchStatus, selectType, valueCheckboxMonth))
    }
  }, [params])

  const onCheckboxChange = (e) => {
    if (e.target.value === 1) {
      setSelectType(e.target.value)
      setSelectDisable(!selectDisabled)
      setRangePickerDisable(true)
    } else {
      setSelectType(e.target.value)
      setRangePickerDisable(!rangePickerDisabled)
      setSelectDisable(true)
    }
  }

  const handleChange = (value) => {
    setValueCheckboxMonth(value)
  }
  const handleSortChange = (value) => {
    setValueSort(value)
  }

  const handleChangeSearchStatus = (value) => {
    setValueSearchStatus(value)
  }

  const handleChangePerPage = (value) => {
    setParams({
      ...params,
      per_page: value
    })
  }

  const onChangePage = (e) => {
    setParams({
      ...params,
      page: e
    })
    if (role === 'Admin') {
      dispacth(requestsActions.getAdminRequests(params, valueSort, valueSearchStatus, selectType, valueCheckboxMonth))
    } else {
      dispacth(requestsActions.getManagerRequests(params, valueSort, valueSearchStatus, selectType, valueCheckboxMonth))
    }
  }

  const onDateChange = (date, dateString) => {
    console.log('From: ', dateString[0], ', to: ', dateString[1])
  }

  const handleReset = () => {
    setSelectType(1)
    setValueCheckboxMonth(1)
    setValueSearchStatus(0)
    setValueSort('asc')
    setParams({
      page: 1,
      per_page: 5
    })
    if (role === 'Admin') {
      dispacth(requestsActions.getAdminRequests(params, valueSort, valueSearchStatus, selectType, valueCheckboxMonth))
    } else {
      dispacth(requestsActions.getManagerRequests(params, valueSort, valueSearchStatus, selectType, valueCheckboxMonth))
    }
  }

  const handleSearch = () => {
    setParams({
      ...params,
      page: 1
    })
    if (role === 'Admin') {
      dispacth(requestsActions.getAdminRequests(params, valueSort, valueSearchStatus, selectType, valueCheckboxMonth))
    } else {
      dispacth(requestsActions.getManagerRequests(params, valueSort, valueSearchStatus, selectType, valueCheckboxMonth))
    }
  }

  const onActionClick = (record) => {}

  const onActionView = (record) => {
    setDataModal(record)
    switch (record.request_type) {
      case 1:
        return setVisibleForgetCheck(true)
      case 2:
        return setVisiblePaiLeave(true)
      case 3:
        return setVisibleUnPaiLeave(true)
      case 4:
        return setVisibleLateEarly(true)
      case 5:
        return setVisibleOT(true)
    }
  }

  const columns = [
    {
      title: 'No',
      key: 'index',
      render: (text, record, index) => index + 1,
      width: '5%'
    },
    {
      title: 'Member',
      dataIndex: 'member_full_name',
      key: 'member_full_name',
      align: 'left',
      width: '10%'
    },
    {
      title: 'Date',
      dataIndex: 'requests_for_date',
      key: 'requests_for_date',
      align: 'center',
      width: '12%',
      render: (record) => {
        return <Space>{moment(record).format('YYYY/MM/DD | ddd')}</Space>
      }
    },
    {
      title: 'Request type',
      dataIndex: 'request_type',
      key: 'request_type',
      width: '9%',
      align: 'center',
      render: (record) => {
        let requests = ''
        if (record === 1) requests = 'Forget check-in/out'
        if (record === 2) requests = 'Paid leave'
        if (record === 3) requests = 'Unpaid leave'
        if (record === 4) requests = 'Late/early'
        if (record === 5) requests = 'OT'
        return <Space>{requests}</Space>
      }
    },
    {
      title: 'OT',
      key: 'request_ot_time, requests_type',
      align: 'center',
      width: '6%',
      render: (record) => {
        return <Space>{record.request_type === 5 ? `${record.request_ot_time}` : ''}</Space>
      }
    },
    {
      title: 'Lack',
      key: 'compensation_time',
      align: 'center',
      width: '6%'
    },
    {
      title: 'Comp',
      key: 'compensation_time',
      align: 'center',
      width: '6%'
    },
    {
      title: 'Pleave',
      key: 'compensation_time, requests_type',
      align: 'center',
      width: '7%',
      render: (record) => {
        return <Space>{record.request_type === 2 ? `${record.compensation_time}` : ''}</Space>
      }
    },
    {
      title: 'Uleave',
      key: 'compensation_time ,requests_type',
      align: 'center',
      width: '7%',
      render: (record) => {
        return <Space>{record.request_type === 3 ? `${record.compensation_time}` : ''}</Space>
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: '8%',
      render: (record) => {
        let status = ''
        if (record === -1) status = 'Reject'
        if (record === 0) status = 'Sent'
        if (record === 1) status = 'Comfirmed'
        if (record === 2) status = 'Approved'
        return <Space>{status}</Space>
      }
    },
    {
      title: 'Request date',
      dataIndex: 'request_for_date',
      key: 'request_for_date',
      align: 'center',
      width: '8%',
      render: (record) => {
        return <Space>{moment(record).format('YYYY/MM/DD hh:mm:ss')}</Space>
      }
    },
    {
      title: 'Action',
      key: 'status',
      align: 'center',
      render: (text, record, index) => {
        let status = ''
        if (record.status === 0) status = 'Comfirmed'
        if (record.status === 1) status = 'Approved'
        return (
          <>
            {status === '' ? (
              ''
            ) : (
              <Space>
                <Button type='primary' onClick={() => onActionClick(record)}>
                  {status}
                </Button>
                <Button onClick={() => onActionView(record)}>View</Button>
              </Space>
            )}
          </>
        )
      }
    }
  ]
  return (
    <div>
      <Row>
        <Col span={24}>
          <div className={styles['content1']}>
            <Row justify='space-around' align='middle'>
              <Col span={22}>
                <div className={styles['content1-header']}>
                  <div className={styles['content1-header-title']}>Requests</div>
                  <Row justify='space-around'>
                    <Col className={styles['cow-content']}>
                      <Radio.Group onChange={onCheckboxChange} defaultValue={selectType}>
                        <Space direction='vertical' size={30}>
                          <Row justify='space-around' align='middle'>
                            <Col span={24}>
                              <Radio value={1} checked={true}>
                                Choose from list
                              </Radio>
                              <Select
                                style={{ width: 150 }}
                                disabled={selectDisabled}
                                onChange={handleChange}
                                defaultValue={valuecheckbox}
                              >
                                {valuecheckbox.map((item, index) => (
                                  <Option key={item} value={index + 1}>
                                    {item}
                                  </Option>
                                ))}
                              </Select>
                            </Col>
                          </Row>
                          <Row justify='space-around' align='middle'>
                            <Col>
                              <Radio value={2}>Choose start,end</Radio>
                              <RangePicker
                                disabled={rangePickerDisabled}
                                ranges={{
                                  Today: [moment(), moment()],
                                  'This Month': [moment().startOf('month'), moment().endOf('month')]
                                }}
                                onChange={onDateChange}
                              />
                            </Col>
                          </Row>
                        </Space>
                      </Radio.Group>
                    </Col>
                    <Col className={styles['cow-content']}>
                      <Space direction='vertical' size={30}>
                        <Row justify='space-around' align='middle'>
                          <Col span={12}>Sort by requests date</Col>
                          <Col span={12}>
                            <Select style={{ width: 150 }} onChange={handleSortChange} defaultValue={valueSort}>
                              <Option value={'asc'}>Asecending</Option>
                              <Option value={'desc'}>Decrease</Option>
                            </Select>
                          </Col>
                        </Row>
                        <Row justify='space-around' align='middle'>
                          <Col span={12}>Status</Col>
                          <Col span={12}>
                            <Select
                              style={{ width: 150 }}
                              onChange={handleChangeSearchStatus}
                              defaultValue={valueStatus}
                            >
                              {valueStatus.map((item, index) => (
                                <Option key={item} value={index}>
                                  {item}
                                </Option>
                              ))}
                            </Select>
                          </Col>
                        </Row>
                      </Space>
                    </Col>
                  </Row>
                  <Row>
                    <Col offset={11}>
                      <Button type='primary' onClick={handleSearch}>
                        Search
                      </Button>
                    </Col>
                    <Col offset={1}>
                      <Button type='primary' onClick={handleReset}>
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
            <Row justify='space-around' align='middle'>
              <Col span={22}>
                <div className={styles['content1-body']}>
                  <Row style={{ paddingTop: 10 }} align='middle'>
                    <Col span={4} offset={1}>
                      Total number of records: <b>{requests?.total}</b>
                    </Col>
                    <Col span={2} offset={15}>
                      Items per page:
                    </Col>
                    <Col>
                      <Select style={{ width: 70 }} onChange={handleChangePerPage}>
                        {valuePerPage.map((item) => (
                          <Option key={item} value={item}>
                            {item}
                          </Option>
                        ))}
                      </Select>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Space direction='vertical' size={30} align='center'>
                        <Table
                          columns={columns}
                          dataSource={requests?.data}
                          pagination={false}
                          rowKey={requests?.data?.id}
                          bordered
                          loading={loadingRequests}
                          className={styles['table']}
                          tableLayout='fixed'
                        />
                        <Pagination
                          total={requests?.total}
                          pageSize={params.per_page}
                          onChange={onChangePage}
                          defaultCurrent={requests?.current_page}
                        ></Pagination>
                        <Modal
                          visible={visibleForgetCheck}
                          footer={false}
                          width={1000}
                          title='Forget Check/in'
                          onCancel={() => setVisibleForgetCheck(false)}
                        ></Modal>
                        <Modal
                          visible={visiblePaiLeave}
                          footer={false}
                          width={1000}
                          title='Paid Leave'
                          onCancel={() => setVisiblePaiLeave(false)}

                        >
                          <FormConfirmLeave dataModalRequest={dataModal} />
                        </Modal>
                        <Modal
                          visible={visibleUnPaiLeave}
                          footer={false}
                          width={1000}
                          title='UnPaid Leave'
                          onCancel={() => setVisibleUnPaiLeave(false)}
                        >
                          <FormConfirmLeave dataModalRequest={dataModal} />
                        </Modal>
                        <Modal
                          visible={visibleLateEarly}
                          footer={false}
                          width={1000}
                          title='Late Early'
                          onCancel={() => setVisibleLateEarly(false)}
                        >
                          <RegisterLateEarly status={1} onCancel={setVisibleLateEarly} />
                        </Modal>
                        <Modal
                          visible={visibleOT}
                          footer={false}
                          width={1000}
                          title='OT '
                          onCancel={() => setVisibleOT(false)}
                        ></Modal>
                      </Space>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default RequestsPage
