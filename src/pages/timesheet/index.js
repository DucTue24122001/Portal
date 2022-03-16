import React from 'react'
import 'antd/dist/antd.css'
import { Col, Row, Select, Table, Space, Typography } from 'antd'
import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import DialogTimeSheetRedux from './dialogTimesheetRedux'
import SearchTimeSheetRedux from './searchTimeSheetRedux'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { timeSheetRedux } from '../../redux/timesheet'
import { convertData } from './convertData'
import ModalForget from '../../components/modalTimesheet/modalForget'
import ModalLateEarly from '../../components/modalTimesheet/modalLateEarly'
import ModalLeave from '../../components/modalTimesheet/modalLeave'
import ModalOT from '../../components/modalTimesheet/modalOT'
import styled from 'styled-components'

const StyledTable = styled((props) => <Table {...props} />)`
  && tbody > tr:hover > td {
    background: unset;
  }
`

const TimesheetPage = () => {
  const { Text } = Typography

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalForget, setIsModalForget] = useState(false)
  const [isModalLate, setIsModalLate] = useState(false)
  const [isModalLeave, setIsModalLeave] = useState(false)
  const [isModalOT, setIsModalOT] = useState(false)
  const [valueModal, setValueModal] = useState(null)
  const [params, setParams] = useState({ page: 1, pageSize: 30 })
  const [valueSearch, setValueSearch] = useState(null)

  const dispatch = useDispatch()
  const dataRedux = useSelector((state) => state.timesheet.data)
  const length = useSelector((state) => state.timesheet.length)
  const loading = useSelector((state) => state.timesheet.loading)
  const optionSearch = useSelector((state) => state.timesheet.optionSearch)
  const dataComp = useSelector((state) => state.timesheet.listMemberComp)

  useEffect(() => {
    if (optionSearch === 1) {
      dispatch(timeSheetRedux.searchTableTimeSheetApI(valueSearch, params, false))
    } else {
      dispatch(timeSheetRedux.selectTableTimeSheetApI(params))
    }
  }, [params])

  const dataSource = convertData(dataRedux, dataComp)

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
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
    dispatch(timeSheetRedux.loadingTableTrue())
  }

  const onSearch = (values) => {
    dispatch(timeSheetRedux.searchTableTimeSheetApI(values, params, true))
    setValueSearch(values)
    if (values.radioBtn === 3) {
      setParams({ page: 1, pageSize: 30 })
      dispatch(timeSheetRedux.selectTableTimeSheetApI({ page: 1, pageSize: 30 }))
      dispatch(timeSheetRedux.loadingTableTrue())
    }
  }

  const onActionForget = (e, record) => {
    e.stopPropagation()
    dispatch(timeSheetRedux.modalRowTable(record))
    setIsModalForget(true)
  }

  const onActionLate = (e, record) => {
    e.stopPropagation()
    dispatch(timeSheetRedux.modalRowTable(record))
    setIsModalLate(true)
  }

  const onActionLeave = (e, record) => {
    dispatch(timeSheetRedux.modalRowTable(record))
    e.stopPropagation()
    setIsModalLeave(true)
  }

  const onActionOT = (e, record) => {
    dispatch(timeSheetRedux.modalRowTable(record))
    e.stopPropagation()
    setIsModalOT(true)
  }

  const cancelModalForget = () => {
    setIsModalForget(false)
  }

  const cancelMadalLate = () => {
    setIsModalLate(false)
    form.resetFields()
  }

  const cancelModalLeave = () => {
    setIsModalLeave(false)
  }

  const cancelModalOT = () => {
    setIsModalOT(false)
  }

  const onClickRow = (record) => {
    setValueModal([record])
    setIsModalVisible(true)
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
            <Text
              type={
                record.late === null ||
                (record.Note.includes('Approved') && record.Note.includes('Late/Early')) ||
                record.late === '00:00'
                  ? ''
                  : 'danger'
              }
            >
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
            <Text
              type={
                record.early === null ||
                record.early === '00:00' ||
                (record.Note.includes('Approved') && record.Note.includes('Late/Early'))
                  ? ''
                  : 'danger'
              }
            >
              {early}
            </Text>
          </>
        )
      }
    },
    {
      title: 'In Officle',
      dataIndex: 'inOfficle',
      width: '5%',
      responsive: ['xxl', 'xl', 'lg', 'md']
    },
    {
      title: 'OT',
      dataIndex: 'Ot',
      width: '4%',
      responsive: ['xxl', 'xl', 'lg', 'md'],
      render: (Ot, record) => {
        return (
          <>
            <Text
              type={
                record.Ot === null ||
                record.Ot === '00:00' ||
                (record.Note.includes('Approved') && record.Note.includes('OT'))
                  ? ''
                  : 'danger'
              }
            >
              {Ot}
            </Text>
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
                    ? record.Note.includes('Approved') && record.Note.includes('Late/Early')
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
      responsive: ['xxl', 'xl', 'lg', 'md'],
      render: (lack, record) => {
        const Note = ['Late/Early:Approved', 'Leave:Approved', 'Check-in/out:Approved', 'Forget:Approved']
        return (
          <>
            <Text type={Note.includes(record.Note) || record.lack === '00:00' ? '' : 'danger'}>{lack}</Text>
          </>
        )
      }
    },
    {
      title: 'Comp',
      dataIndex: 'comp',
      width: '4%',
      responsive: ['xxl', 'xl', 'lg']
    },
    {
      title: 'Pleave',
      dataIndex: 'pleave',
      width: '4%',
      responsive: ['xxl', 'xl', 'lg']
    },
    {
      title: 'Uleave',
      dataIndex: 'uleave',
      width: '4%',
      responsive: ['xxl', 'xl', 'lg']
    },
    {
      title: 'Note',
      dataIndex: 'Note',
      width: '8%',
      responsive: ['xxl', 'xl', 'lg'],
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
      render: (index, record) => {
        return (
          <Space>
            {record.is_holiday === 0 ? (
              <>
                <Text className={styles.buttonTable} underline onClick={(e) => onActionForget(e, record)}>
                  Forget
                </Text>
                <Text className={styles.buttonTable} underline onClick={(e) => onActionLate(e, record)}>
                  Late/Early
                </Text>
                <Text className={styles.buttonTable} underline onClick={(e) => onActionLeave(e, record)}>
                  Leave
                </Text>
              </>
            ) : (
              <></>
            )}
            <Text className={styles.buttonTable} underline onClick={(e) => onActionOT(e, record)}>
              OT
            </Text>
          </Space>
        )
      }
    }
  ]

  return (
    <>
      <SearchTimeSheetRedux onSearch={onSearch} />
      <Row className={styles.marginBottom}>
        <Col span={12}>
          <Text>
            Total number of records : <Text strong> {length}</Text>
          </Text>
        </Col>
        <Col span={12} className={styles.toTheRight}>
          <Select defaultValue={30} onChange={onChangeElement}>
            <Select.Option value={30}>30 / page</Select.Option>
            <Select.Option value={50}>50 / page</Select.Option>
            <Select.Option value={100}>100 / page</Select.Option>
          </Select>
          <Text>Item per page &ensp;</Text>
        </Col>
      </Row>
      <StyledTable
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
        rowClassName={(record, rowIndex) => (record.is_holiday === 1 ? styles.tableRowLight : '')}
        className={styles.boderTable}
        bordered={true}
        loading={loading}
      />
      <ModalForget isModalVisible={isModalForget} handleOk={cancelModalForget} handleCancel={cancelModalForget} />
      <ModalLateEarly isModalVisible={isModalLate} handleOk={cancelMadalLate} handleCancel={cancelMadalLate} />
      <ModalLeave isModalVisible={isModalLeave} handleOk={cancelModalLeave} handleCancel={cancelModalLeave} />
      <ModalOT isModalVisible={isModalOT} handleOk={cancelModalOT} handleCancel={cancelModalOT} />
      <DialogTimeSheetRedux
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        valueModal={valueModal}
      />
    </>
  )
}

export default TimesheetPage
