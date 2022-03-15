import React from 'react'
import { useState, useEffect } from 'react'
import { Row, Col, DatePicker, Table, Button, Modal, Space } from 'antd'
import styles from './myleave.module.css'
import FormRequestAdd from './FormRequestAdd'
import { useDispatch, useSelector } from 'react-redux'
import { leaveQuotaActions } from '../../redux/myleave'
import moment from 'moment'
const MyLeavePage = () => {
  const [year, setYear] = useState(moment().format('YYYY'))
  const [visible, setVisible] = useState(false)
  const dispacth = useDispatch()
  const { leaveQuota, loadingLeaveQuota } = useSelector((state) => state.leaveQuota)

  useEffect(() => {
    dispacth(leaveQuotaActions.getLeaveQuota(year))
  }, [year])

  const onChangeYear = (date, dateString) => {
    setYear(dateString)
  }
  const handleCancel = () => {
    setVisible(false)
  }

  const columns = [
    {
      title: 'No',
      key: 'index',
      render: (text, record, index) => index + 1,
      width: '10%'
    },
    {
      title: 'Quota',
      dataIndex: 'quota',
      key: 'quota',
      width: '10%'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: '20%',
      render: (text) => {
        return <Space>{text === '0' ? 'Original' : 'Additional'}</Space>
      }
    },
    {
      title: 'Reason',
      dataIndex: 'note',
      key: 'note'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      render: (text) => {
        let status = ''
        if (text === '0') status = 'Sending'
        if (text === '1') status = 'Confirmed'
        if (text === '2') status = 'Approved'
        return <Space>{status}</Space>
      }
    }
  ]

  return (
    <div>
      <Row>
        <Col span={24}>
          <div className={styles['content']}>
            <Row justify='space-around' align='middle'>
              <Col span={22}>
                <div className={styles['content-title']}>My Leave</div>
              </Col>
            </Row>
            <Row justify='space-around'>
              <Col span={4}>
                Year: <DatePicker picker='year' onChange={onChangeYear} defaultValue={moment(year)} />
              </Col>
              <Col span={4}>
                <Row className={styles['row-info']}>
                  <Col span={8}>Original:</Col>
                  <Col span={3} className={styles['row-info-title']}>
                    {leaveQuota?.requests !== undefined
                      ? Array.from(leaveQuota?.requests)
                        .filter((u) => u.type === '0' && u.status === '2')
                        .reduce(function(total, x) {
                          return total + x.quota
                        }, 0)
                      : ''}
                  </Col>
                  <Col span={3}>day(s)</Col>
                </Row>
                <Row className={styles['row-info']}>
                  <Col span={8}>Addition:</Col>
                  <Col span={3} className={styles['row-info-title']}>
                    {leaveQuota?.requests !== undefined
                      ? Array.from(leaveQuota?.requests)
                        .filter((u) => u.type === '1' && u.status === '2')
                        .reduce(function(total, x) {
                          return total + x.quota
                        }, 0)
                      : ''}
                  </Col>
                  <Col span={3}>day(s)</Col>
                </Row>
                <Row className={styles['row-info']}>
                  <Col span={8}>Remain:</Col>
                  <Col span={3} className={styles['row-info-title']}>
                    {leaveQuota?.remain}
                  </Col>
                  <Col span={3}>day(s)</Col>
                </Row>
              </Col>
              <Col span={5}>
                <Row className={styles['row-info']}>
                  <Col span={8}>Paid leave:</Col>
                  <Col span={3} className={styles['row-info-title']}>
                    {leaveQuota?.paid_leave}
                  </Col>
                  <Col span={3}>day(s)</Col>
                </Row>
                <Row className={styles['row-info']}>
                  <Col span={8}>Unpaid leave:</Col>
                  <Col span={3} className={styles['row-info-title']}>
                    {leaveQuota?.unpaid_leave}
                  </Col>
                  <Col span={3}>day(s)</Col>
                </Row>
                <Row className={styles['row-info']}>
                  <Col span={8}>Total leave:</Col>
                  <Col span={3} className={styles['row-info-title']}>
                    {isNaN(leaveQuota?.paid_leave + leaveQuota?.unpaid_leave)
                      ? ''
                      : leaveQuota?.paid_leave + leaveQuota?.unpaid_leave}
                  </Col>
                  <Col span={3}>day(s)</Col>
                </Row>
              </Col>
              <Col>
                <Button type='primary' onClick={() => setVisible(true)}>
                  Additon
                </Button>
                <Modal
                  title='Request Addtion Leave'
                  visible={visible}
                  footer={false}
                  width={1000}
                  onCancel={handleCancel}
                  centered
                >
                  <FormRequestAdd onCancel={handleCancel} year={year}></FormRequestAdd>
                </Modal>
              </Col>
            </Row>
            <Row justify='space-around'>
              <Col span={22}>
                <Table
                  columns={columns}
                  dataSource={leaveQuota?.requests}
                  pagination={false}
                  rowKey={(dataSource) => dataSource?.id}
                  loading={loadingLeaveQuota}
                  bordered
                  className={styles['table']}
                  tableLayout='fixed'
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default MyLeavePage
