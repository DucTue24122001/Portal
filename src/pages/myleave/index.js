import React from 'react'
import { useState } from 'react'
import { Row, Col, DatePicker, Table, Button, Modal } from 'antd'
import styles from './myleave.module.css'
import FormRequestAdd from './FormRequestAdd'

const MyLeavePage = () => {
  const [dataTable] = useState([])
  const [visible, setVisible] = useState(false)
  const onChangeYear = (date, dateString) => {}

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
      width: '20%'
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '10%'
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
                Year: <DatePicker picker='year' onChange={onChangeYear} />
              </Col>
              <Col span={4}>
                <Row className={styles['row-info']}>
                  <Col span={8}>Original:</Col>
                  <Col span={3} className={styles['row-info-title']}></Col>
                  <Col span={3}>day(s)</Col>
                </Row>
                <Row className={styles['row-info']}>
                  <Col span={8}>Addition:</Col>
                  <Col span={3} className={styles['row-info-title']}></Col>
                  <Col span={3}>day(s)</Col>
                </Row>
                <Row className={styles['row-info']}>
                  <Col span={8}>Remain:</Col>
                  <Col span={3} className={styles['row-info-title']}></Col>
                  <Col span={3}>day(s)</Col>
                </Row>
              </Col>
              <Col span={5}>
                <Row className={styles['row-info']}>
                  <Col span={8}>Paid leave:</Col>
                  <Col span={3} className={styles['row-info-title']}></Col>
                  <Col span={3}>day(s)</Col>
                </Row>
                <Row className={styles['row-info']}>
                  <Col span={8}>Unpaid leave:</Col>
                  <Col span={3} className={styles['row-info-title']}></Col>
                  <Col span={3}>day(s)</Col>
                </Row>
                <Row className={styles['row-info']}>
                  <Col span={8}>Total leave:</Col>
                  <Col span={3} className={styles['row-info-title']}></Col>
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
                  <FormRequestAdd onCancel={handleCancel}></FormRequestAdd>
                </Modal>
              </Col>
            </Row>
            <Row justify='space-around'>
              <Col span={22}>
                <Table
                  columns={columns}
                  dataSource={dataTable}
                  pagination={false}
                  rowKey={(dataSource) => dataSource?.id}
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
