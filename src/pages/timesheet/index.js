import React from 'react'
import 'antd/dist/antd.css'
import { Col, Row, Select, Table, Space, Typography } from 'antd'
import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import DialogTimeSheetRedux from './dialogTimesheetRedux'
import SearchTimeSheetRedux from './searchTimeSheetRedux'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import {
  lengthTableTimeSheetAPI,
  selectTableTimeSheetApI,
  searchTableTimeSheetApI,
  loadingTableTrue
} from '../../redux/timesheet'
import { convertData } from './convertData'
import ModalForget from './modal/modalForget'
import ModalLateEarly from './modal/modalLateEarly'
import ModalLeave from './modal/modalLeave'
import ModalOT from './modal/modalOT'

const TimesheetPage = () => {
  const { Text } = Typography

  const [isModalVisible, setIsModalVisible] = useState({
    modalTable: false,
    modalForget: false,
    modalLate: false,
    modalLeave: false,
    modalOt: false
  })
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

  const handleOk = () => {
    setIsModalVisible({ ...isModalVisible, modalTable: false })
  }

  const handleCancel = () => {
    setIsModalVisible({ ...isModalVisible, modalTable: false })
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

  const onAction = (e, name) => {
    e.stopPropagation()
    if (name === 'Forget') {
      setIsModalVisible({ ...isModalVisible, modalForget: true })
    } else if (name === 'LateEarly') {
      setIsModalVisible({ ...isModalVisible, modalLate: true })
    } else if (name === 'Leave') {
      setIsModalVisible({ ...isModalVisible, modalLeave: true })
    } else if (name === 'Ot') {
      setIsModalVisible({ ...isModalVisible, modalOt: true })
    }
  }

  const cancelModalForget = () => {
    setIsModalVisible({ ...isModalVisible, modalForget: false })
  }

  const cancelMadalLate = () => {
    setIsModalVisible({ ...isModalVisible, modalLate: false })
  }

  const cancelModalLeave = () => {
    setIsModalVisible({ ...isModalVisible, modalLeave: false })
  }

  const cancelModalOT = () => {
    setIsModalVisible({ ...isModalVisible, modalOt: false })
  }

  const onClickRow = (record) => {
    setValueModal([record])
    setIsModalVisible({ ...isModalVisible, modalTable: true })
  }

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      width: '4%'
    },
    {
      title: 'Date',
      dataIndex: 'date',
      width: '8%'
    },
    {
      title: 'Check In',
      dataIndex: 'checkin',
      width: '5%'
    },
    {
      title: 'Check Out',
      dataIndex: 'checkout',
      width: '5%'
    },
    {
      title: 'Late',
      dataIndex: 'late',
      width: '4%',
      render: (late, record) => {
        return (
          <>
            <Text type={record.late === null || record.Note.includes('Approved', 'Late/Early') ? '' : 'danger'}>
              {late}
            </Text>
          </>
        )
      }
    },
    {
      title: 'Early',
      dataIndex: 'early',
      width: '4%',
      render: (early, record) => {
        return (
          <>
            <Text type={record.early === null || record.Note.includes('Approved', 'Late/Early') ? '' : 'danger'}>
              {early}
            </Text>
          </>
        )
      }
    },
    {
      title: 'In Officle',
      dataIndex: 'inOfficle',
      width: '5%'
    },
    {
      title: 'OT',
      dataIndex: 'Ot',
      width: '4%',
      render: (Ot, record) => {
        return (
          <>
            <Text type={record.Ot === null || record.Note.includes('Approved', 'OT') ? '' : 'danger'}>{Ot}</Text>
          </>
        )
      }
    },
    {
      title: 'Work Time',
      dataIndex: 'Worktime',
      width: '4%',
      render: (Worktime, record) => {
        return (
          <>
            <Text
              type={
                record.Worktime === '00:00'
                  ? ''
                  : moment(record.Worktime, 'hh:mm').isBefore(moment('08:00', 'hh:mm')) ||
                    record.colorWorkTime === 'default'
                    ? record.Note.includes('Approved', 'Late/Early') === true
                      ? 'warning'
                      : 'danger'
                    : ''
              }
            >
              {Worktime}
            </Text>
          </>
        )
      }
    },
    {
      title: 'Lack',
      dataIndex: 'lack',
      width: '4%',
      render: (lack, record) => {
        return (
          <>
            <Text
              type={
                record.Note.includes('Approved', 'Late/Early') === true ||
                record.Note.includes('Approved', 'Leave') === true ||
                record.Note.includes('Approved', 'check-in/out') === true ||
                record.Note.includes('Approved', 'Forget') === true
                  ? ''
                  : 'danger'
              }
            >
              {lack}
            </Text>
          </>
        )
      }
    },
    {
      title: 'Comp',
      dataIndex: 'comp',
      width: '4%'
    },
    {
      title: 'Pleave',
      dataIndex: 'pleave',
      width: '4%'
    },
    {
      title: 'Uleave',
      dataIndex: 'uleave',
      width: '4%'
    },
    {
      title: 'Note',
      dataIndex: 'Note',
      width: '8%',
      render: (Note) => {
        return (
          <>
            <Text>{Note}</Text>
          </>
        )
      }
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: '12%',
      render: () => {
        return (
          <Space>
            <Text className={styles.buttonTable} underline onClick={(e) => onAction(e, 'Forget')}>
              Forget
            </Text>
            <Text className={styles.buttonTable} underline onClick={(e) => onAction(e, 'LateEarly')}>
              Late/Early
            </Text>
            <Text className={styles.buttonTable} underline onClick={(e) => onAction(e, 'Leave')}>
              Leave
            </Text>
            <Text className={styles.buttonTable} underline onClick={(e) => onAction(e, 'Ot')}>
              OT
            </Text>
          </Space>
        )
      }
    }
  ]

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
              onClick: () => onClickRow(record)
            }
          }}
          rowClassName={(record, rowIndex) => (record.is_holiday === 1 ? styles.tableRowLight : 'name')}
          className='boder-table'
          bordered={true}
          loading={loading}
        />
        <ModalForget
          isModalVisible={isModalVisible.modalForget}
          handleOk={cancelModalForget}
          handleCancel={cancelModalForget}
        />
        <ModalLateEarly
          isModalVisible={isModalVisible.modalLate}
          handleOk={cancelMadalLate}
          handleCancel={cancelMadalLate}
        />
        <ModalLeave
          isModalVisible={isModalVisible.modalLeave}
          handleOk={cancelModalLeave}
          handleCancel={cancelModalLeave}
        />
        <ModalOT isModalVisible={isModalVisible.modalOt} handleOk={cancelModalOT} handleCancel={cancelModalOT} />
        <DialogTimeSheetRedux
          isModalVisible={isModalVisible.modalTable}
          handleOk={handleOk}
          handleCancel={handleCancel}
          valueModal={valueModal}
        />
      </div>
    </>
  )
}

export default TimesheetPage
