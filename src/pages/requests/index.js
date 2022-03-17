import React from 'react'
import moment from 'moment'
import { Row, Col, Radio, Space, Select, DatePicker, Button, Table, Pagination, Modal } from 'antd'
import { useState, useEffect } from 'react'
import styles from './request.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { requestsActions } from './../../redux/requests'
import { useHistory } from 'react-router-dom'

const RequestsPage = () => {
  const history = useHistory()
  const { Option } = Select
  const { RangePicker } = DatePicker
  const [selectDisabled, setSelectDisable] = useState(true)
  const [rangePickerDisabled, setRangePickerDisable] = useState(true)
  const [params, setParams] = useState({ page: 1, limit: 5 })
  const [visibleForgetCheck, setVisibleForgetCheck] = useState(false)
  const [visiblePaiLeave, setVisiblePaiLeave] = useState(false)
  const [visibleUnPaiLeave, setVisibleUnPaiLeave] = useState(false)
  const [visibleLateEarly, setVisibleLateEarly] = useState(false)
  const [visibleOT, setVisibleOT] = useState(false)
  const valuecheckbox = ['this month', 'last month']
  const valueStatus = ['Reject', 'Sent', 'Confirmed', 'Approved']
  const dispacth = useDispatch()
  const { requests, loadingRequests } = useSelector((state) => state.requests)
  const { infoUser, successGetInfo } = useSelector((state) => state.infoUser)

  useEffect(() => {
    if (successGetInfo) {
      if (infoUser?.roles?.find((u) => ['Member'].includes(u.title)) && infoUser?.roles?.length === 1) {
        history.push('/')
      }
    }
  }, [successGetInfo])

  useEffect(() => {
    dispacth(requestsActions.getRequests(params))
  }, [params])

  const onCheckboxChange = (e) => {
    if (e.target.value === 0) {
      setSelectDisable(!selectDisabled)
      setRangePickerDisable(true)
    } else {
      setRangePickerDisable(!rangePickerDisabled)
      setSelectDisable(true)
    }
  }

  const handleChange = (value) => {
    console.log(value)
  }

  const handleChangeSearchStatus = (value) => {}

  const onChangePage = (e) => {
    setParams({
      ...params,
      page: e
    })
  }

  const onDateChange = (date, dateString) => {
    console.log('From: ', dateString[0], ', to: ', dateString[1])
  }

  const handleReset = () => {}

  const handleSearch = () => {
    setParams({
      ...params,
      page: 1
    })
  }

  const onActionClick = (record) => {
    console.log(record)
  }

  const onActionView = (record) => {
    switch (record.requests_type) {
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
      dataIndex: 'requests_type',
      key: 'requests_type',
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
        return <Space>{record.requests_type === 5 ? `${record.request_ot_time}` : ''}</Space>
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
        return <Space>{record.requests_type === 2 ? `${record.compensation_time}` : ''}</Space>
      }
    },
    {
      title: 'Uleave',
      key: 'compensation_time ,requests_type',
      align: 'center',
      width: '7%',
      render: (record) => {
        return <Space>{record.requests_type === 3 ? `${record.compensation_time}` : ''}</Space>
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
      dataIndex: 'compensation_date',
      key: 'compensation_date',
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
                      <Radio.Group onChange={onCheckboxChange}>
                        <Space direction='vertical' size={30}>
                          <Row justify='space-around' align='middle'>
                            <Col span={24}>
                              <Radio value={0} checked={true}>
                                Choose from list
                              </Radio>
                              <Select style={{ width: 150 }} disabled={selectDisabled} onChange={handleChange}>
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
                              <Radio value={1}>Choose start,end</Radio>
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
                            <Select style={{ width: 150 }} onChange={handleChange}>
                              <Option value={'asc'}>Asecending</Option>
                              <Option value={'desc'}>Decrease</Option>
                            </Select>
                          </Col>
                        </Row>
                        <Row justify='space-around' align='middle'>
                          <Col span={12}>Status</Col>
                          <Col span={12}>
                            <Select style={{ width: 150 }} onChange={handleChangeSearchStatus}>
                              {valueStatus.map((item, index) => (
                                <Option key={item} value={index - 1}>
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
                  <Row style={{ paddingTop: 10 }}>
                    <Col span={4}>
                      Total number of records: <b>{requests?.total}</b>
                    </Col>
                    <Col span={2} offset={17}>
                      Items per page
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Space direction='vertical' size={30} align='center'>
                        <Table
                          columns={columns}
                          dataSource={requests?.data}
                          pagination={false}
                          rowKey={(dataSource) => dataSource?.id}
                          bordered
                          loading={loadingRequests}
                          className={styles['table']}
                          tableLayout='fixed'
                        />
                        <Pagination total={20} onChange={onChangePage} defaultCurrent={params.page}></Pagination>
                        <Modal
                          visible={visibleForgetCheck}
                          footer={false}
                          width={1000}
                          title='title1'
                          onCancel={() => setVisibleForgetCheck(false)}
                        ></Modal>
                        <Modal
                          visible={visiblePaiLeave}
                          footer={false}
                          width={1000}
                          title='title2'
                          onCancel={() => setVisiblePaiLeave(false)}
                        ></Modal>
                        <Modal
                          visible={visibleUnPaiLeave}
                          footer={false}
                          width={1000}
                          title='title3'
                          onCancel={() => setVisibleUnPaiLeave(false)}
                        ></Modal>
                        <Modal
                          visible={visibleLateEarly}
                          footer={false}
                          width={1000}
                          title='title4'
                          onCancel={() => setVisibleLateEarly(false)}
                        ></Modal>
                        <Modal
                          visible={visibleOT}
                          footer={false}
                          width={1000}
                          title='title5'
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
