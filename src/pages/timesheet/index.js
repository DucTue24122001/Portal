import React from 'react'
import 'antd/dist/antd.css'
import { Col, Row, Select, Table, Typography } from 'antd'
import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import DialogTimeSheetRedux from './dialogTimesheetRedux'
import SearchTimeSheetRedux from './searchTimeSheetRedux'
import { useDispatch, useSelector } from 'react-redux'
import {
  lengthTableTimeSheetAPI,
  selectTableTimeSheetApI,
  searchTableTimeSheetApI,
  loadingTableTrue
} from '../../redux/timesheet'
import { convertData } from './convertData'
import { columns } from './columsTable'

const TimesheetPage = () => {
  const { Text } = Typography

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [valueModal, setValueModal] = useState([{ date: '', checkin: '', checkout: '', late: '' }])
  const [params, setParams] = useState({ page: 1, pageSize: 10 })
  const [valueSearch, setValueSearch] = useState(null)

  const dispatch = useDispatch()
  const dataRedux = useSelector((state) => state.timesheet.data)
  const length = useSelector((state) => state.timesheet.length)
  const loading = useSelector((state) => state.timesheet.loading)
  const optionSearch = useSelector((state) => state.timesheet.optionSearch)
  const dataComp = useSelector((state) => state.timesheet.listMemberComp)
  useEffect(() => {
    dispatch(selectTableTimeSheetApI(params))
    dispatch(lengthTableTimeSheetAPI())
  }, [])

  useEffect(() => {
    if (optionSearch === 1) {
      dispatch(searchTableTimeSheetApI(valueSearch, params, false))
    } else {
      dispatch(selectTableTimeSheetApI(params))
    }
  }, [params])

  const dataSource = convertData(dataRedux, dataComp)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const onShowModal = (value) => {
    showModal()
    setValueModal([value])
  }

  const onChangeElement = (e) => {
    setParams({
      ...params,
      pageSize: e
    })
  }

  const handleChange = (e) => {
    setParams({
      ...params,
      page: e
    })
    dispatch(loadingTableTrue())
  }

  const onSearch = (values) => {
    dispatch(searchTableTimeSheetApI(values, params, true))
    setValueSearch(values)
    if (values.radioBtn === 3) {
      setParams({ page: 1, pageSize: 10 })
      dispatch(selectTableTimeSheetApI({ page: 1, pageSize: 10 }))
      dispatch(loadingTableTrue())
    }
  }

  return (
    <>
      <div className={styles.body}>
        <SearchTimeSheetRedux onSearch={onSearch} />

        <Row className={styles.marginBottom}>
          <Col span={12}>
            <Text>
              Total number of records : <Text strong> {length}</Text>
            </Text>
          </Col>
          <Col span={12} className={styles.toTheRight}>
            <Select defaultValue='10' onChange={onChangeElement}>
              <Select.Option value='10'>10 / page</Select.Option>
              <Select.Option value='20'>20 / page</Select.Option>
              <Select.Option value='50'>50 / page</Select.Option>
              <Select.Option value='100'>100 / page</Select.Option>
            </Select>
            <Text>Item per page &ensp;</Text>
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={dataSource || []}
          pagination={{
            position: ['bottomCenter'],
            pageSize: params.pageSize,
            total: length,
            current: params.page,
            onChange: handleChange,
            showSizeChanger: false
          }}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => onShowModal(record)
            }
          }}
          scroll={{ x: 1500 }}
          rowClassName={(record, rowIndex) => (record.is_holiday === 1 ? styles.tableRowLight : '')}
          className='boder-table'
          bordered={true}
          loading={loading}
        />
        <DialogTimeSheetRedux
          isModalVisible={isModalVisible}
          handleOk={handleOk}
          handleCancel={handleCancel}
          valueModal={valueModal}
        />
      </div>
    </>
  )
}

export default TimesheetPage
