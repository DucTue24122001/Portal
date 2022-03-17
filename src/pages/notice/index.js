import React from 'react'
import 'antd/dist/antd.css'
import { Col, Row, Select, Table, Space, Typography } from 'antd'
import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import SearchNotice from './searchNotice'
import { useDispatch, useSelector } from 'react-redux'
import { noticeRedux } from '../../redux/notice'
import { convertDataNotice } from './convertData'
import ModalNoticeEdit from '../../components/modalNotice/modamEdit'
import ModalNoticeView from '../../components/modalNotice/modalView'
import { Link } from 'react-router-dom'

const NoticePage = () => {
  const { Text } = Typography

  const [isModalEdit, setIsModalEdit] = useState(false)
  const [isModalView, setIsModalView] = useState(false)
  const [params, setParams] = useState({ page: 1, pageSize: 10 })
  const [valueSearch, setValueSearch] = useState(null)

  const dispatch = useDispatch()
  const dataRedux = useSelector((state) => state.notice.data)
  const length = useSelector((state) => state.notice.length)
  const loading = useSelector((state) => state.notice.loading)
  const optionSearch = useSelector((state) => state.notice.optionSearch)
  console.log(optionSearch)

  useEffect(() => {
    if (optionSearch === 1) {
      dispatch(noticeRedux.searchTableNotice(valueSearch, params, false))
    } else {
      dispatch(noticeRedux.selectTableNotice(params))
    }
  }, [params])

  const dataSource = convertDataNotice(dataRedux)

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
    dispatch(noticeRedux.loadingTableTrue())
  }

  const onSearch = (values) => {
    dispatch(noticeRedux.searchTableNotice(values, params, true))
    setValueSearch(values)
    if (values.radioBtn === 3) {
      setParams({ page: 1, pageSize: 10 })
      dispatch(noticeRedux.selectTableNotice({ page: 1, pageSize: 10 }))
      dispatch(noticeRedux.loadingTableTrue())
    }
  }

  const onActionEdit = (e, record) => {
    e.stopPropagation()
    dispatch(noticeRedux.modalRowTable(record))
    setIsModalEdit(true)
  }

  const onActionView = (e, record) => {
    dispatch(noticeRedux.modalRowTable(record))
    e.stopPropagation()
    setIsModalView(true)
  }

  const cancelModalEdit = () => {
    setIsModalEdit(false)
  }

  const cancelModalView = () => {
    setIsModalView(false)
  }

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      sorter: (a, b) => a.id < b.id
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      sorter: (a, b) => a.subject < b.subject,
      render: (subject, record) => {
        return (
          <>
            <Link to='/notice/1' className={styles.buttonTable} underline>
              {subject}
            </Link>
          </>
        )
      }
    },
    {
      title: 'Author',
      dataIndex: 'author'
    },
    {
      title: 'To Department',
      dataIndex: 'published_to',
      sorter: (a, b) => a.published_to < b.published_to
    },
    {
      title: 'Publish Date',
      dataIndex: 'published_date',
      sorter: (a, b) => a.published_date < b.published_date
    },
    {
      title: 'Atttachment',
      dataIndex: 'attachment',
      render: (attachment) => {
        return (
          <>
            <Link href='#' target='_blank'>
              {attachment}
            </Link>
          </>
        )
      }
    },
    {
      title: 'Detail',
      key: 'action',
      render: (index, record) => {
        return (
          <Space>
            <Text className={styles.buttonTable} underline onClick={(e) => onActionEdit(e, record)}>
              Edit
            </Text>
            <Text className={styles.buttonTable} underline onClick={(e) => onActionView(e, record)}>
              View
            </Text>
          </Space>
        )
      }
    }
  ]

  return (
    <>
      <SearchNotice onSearch={onSearch} />

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
        dataSource={dataSource}
        pagination={{
          position: ['bottomCenter'],
          pageSize: params.pageSize,
          total: length,
          current: params.page,
          onChange: handleChange,
          showSizeChanger: false
        }}
        className={styles.boderTable}
        bordered={true}
        loading={loading}
      />
      <ModalNoticeEdit isModalVisible={isModalEdit} handleOk={cancelModalEdit} handleCancel={cancelModalEdit} />
      <ModalNoticeView isModalVisible={isModalView} handleOk={cancelModalView} handleCancel={cancelModalView} />
    </>
  )
}

export default NoticePage
