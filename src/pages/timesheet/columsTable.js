import React from 'react'
import { Space, Typography } from 'antd'
import moment from 'moment'
import styles from './styles.module.css'

const { Text } = Typography

export const columns = [
  {
    title: 'No',
    dataIndex: 'id',
    width: '4%',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    width: '8%',
  },
  {
    title: 'Check In',
    dataIndex: 'checkin',
    width: '5%',
  },
  {
    title: 'Check Out',
    dataIndex: 'checkout',
    width: '5%',
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
    },
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
    },
  },
  {
    title: 'In Officle',
    dataIndex: 'inOfficle',
    width: '5%',
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
    },
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
    },
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
    },
  },
  {
    title: 'Comp',
    dataIndex: 'comp',
    width: '4%',
  },
  {
    title: 'Pleave',
    dataIndex: 'pleave',
    width: '4%',
  },
  {
    title: 'Uleave',
    dataIndex: 'uleave',
    width: '4%',
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
    },
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    width: '12%',
    fixed: 'right',
    render: () => {
      return (
        <Space>
          <Text className={styles.buttonTable} underline>
            Forget
          </Text>
          <Text className={styles.buttonTable} underline>
            Late/Early
          </Text>
          <Text className={styles.buttonTable} underline>
            Leave
          </Text>
          <Text className={styles.buttonTable} underline>
            OT
          </Text>
        </Space>
      )
    },
  },
]

export const columsModal = [
  {
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: 'Check in',
    dataIndex: 'checkin',
  },
  {
    title: 'Check in',
    dataIndex: 'checkout',
  },
  {
    title: 'Late',
    dataIndex: 'late',
  },
]
