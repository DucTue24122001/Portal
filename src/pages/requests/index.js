import React from 'react'
import moment from 'moment'
import { Row, Col, Radio, Space, Select, DatePicker, Button, Table, Pagination } from 'antd'
import { useState } from 'react'
import styles from './request.module.css'

const RequestsPage = () => {
  const { Option } = Select
  const { RangePicker } = DatePicker
  const [selectDisabled, setSelectDisable] = useState(true)
  const [rangePickerDisabled, setRangePickerDisable] = useState(true)
  const [params, setParams] = useState({ page: 1, limit: 5 })
  const valuecheckbox = [1, 2, 3]
  const valueStatus = ['Reject', 'Sent', 'Confirmed', 'Approved']
  const datatable = [
    {
      name: 'Ms. Emmett Douglas',
      requests_type: 4,
      requests_date: '2042-03-22T09:17:35.811Z',
      status: 0,
      comp_time: '3:00',
      compensation_date: '2091-09-12T20:22:26.242Z',
      id: '1'
    },
    {
      name: 'Tonya Medhurst',
      requests_type: 5,
      requests_date: '2045-12-17T05:44:29.036Z',
      status: 1,
      comp_time: '3:30',
      compensation_date: '2034-12-27T16:15:12.878Z',
      id: '2'
    },
    {
      name: 'Mercedes Robel',
      requests_type: 1,
      requests_date: '2029-02-11T16:55:19.499Z',
      status: 0,
      comp_time: '1:30',
      compensation_date: '2074-02-12T14:59:55.743Z',
      id: '3'
    },
    {
      name: 'Natalie Crooks',
      requests_type: 2,
      requests_date: '2049-07-02T03:46:57.877Z',
      status: 0,
      comp_time: '1:00',
      compensation_date: '2081-08-30T03:34:10.578Z',
      id: '4'
    },
    {
      name: 'Lillian Quitzon Sr.',
      requests_type: 3,
      requests_date: '2069-03-13T06:09:45.904Z',
      status: 2,
      comp_time: '4:00',
      compensation_date: '2070-03-18T17:12:03.345Z',
      id: '5'
    }
  ]
  const onCheckboxChange = (e) => {
    if (e.target.value === 0) {
      setSelectDisable(!selectDisabled)
      setRangePickerDisable(true)
    } else {
      setRangePickerDisable(!rangePickerDisabled)
      setSelectDisable(true)
    }
  }

  const handleChange = (value) => {}

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

  const onActionClick = () => {}

  const onActionView = () => {}

  const columns = [
    {
      title: 'No',
      key: 'index',
      render: (text, record, index) => index + 1,
      width: '5%'
    },
    {
      title: 'Member',
      dataIndex: 'name',
      key: 'name',
      align: 'left',
      width: '10%'
    },
    {
      title: 'Date',
      dataIndex: 'requests_date',
      key: 'requests_date',
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
      key: 'comp_time, requests_type',
      align: 'center',
      width: '6%',
      render: (record) => {
        return <Space>{record.requests_type === 5 ? `${record.comp_time}` : ''}</Space>
      }
    },
    {
      title: 'Lack',
      key: 'comp_time',
      align: 'center',
      width: '6%'
    },
    {
      title: 'Comp',
      key: 'comp_time',
      align: 'center',
      width: '6%'
    },
    {
      title: 'Pleave',
      key: 'comp_time, requests_type',
      align: 'center',
      width: '7%',
      render: (record) => {
        return <Space>{record.requests_type === 2 ? `${record.comp_time}` : ''}</Space>
      }
    },
    {
      title: 'Uleave',
      key: 'comp_time ,requests_type',
      align: 'center',
      width: '7%',
      render: (record) => {
        return <Space>{record.requests_type === 3 ? `${record.comp_time}` : ''}</Space>
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
      align: 'center',
      key: 'status, requests_type',
      render: (record) => {
        let status = ''
        if (record.status === 0) status = 'Comfirmed'
        else if (record.status === 1) status = 'Approved'
        else status = ''
        return (
          <>
            {status === '' ? (
              ' '
            ) : (
              <Space>
                <Button type='primary' onClick={onActionClick}>
                  {status}
                </Button>
                <Button onClick={onActionView}>View</Button>
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
                                {valuecheckbox.map((item) => (
                                  <Option key={item} value={item}>
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
                      Total number of records: <b></b>
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
                          dataSource={datatable}
                          pagination={false}
                          rowKey={(dataSource) => dataSource?.id}
                          bordered
                          className={styles['table']}
                          tableLayout='fixed'
                        />
                        <Pagination total={20} onChange={onChangePage} defaultCurrent={params.page}></Pagination>
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
