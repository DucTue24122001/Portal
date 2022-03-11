import React, { useState, useEffect } from 'react'
import { Pagination, Table } from 'antd'
import { getNoticeData, showLoadingNotice } from '../../redux/notice'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import 'antd/dist/antd.css'
import style from './home.module.css'

const Notice = () => {
  const [param, setParam] = useState(1)
  const dispatch = useDispatch()
  const { data, loading } = useSelector((state) => state.notice)

  useEffect(() => {
    dispatch(getNoticeData(param))
  }, [])

  useEffect(() => {
    dispatch(showLoadingNotice(true))
    dispatch(getNoticeData(param))
  }, [param])

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      defaltSortOrder: 'descend',
      sorter: (a, b) => a.subject == b.subject
    },
    {
      title: 'Author',
      dataIndex: 'authorName',
      key: 'authorName',
      defaltSortOrder: 'descend',
      sorter: (a, b) => a.authorName == b.authorName
    },
    {
      title: 'To Department',
      dataIndex: 'department',
      key: 'department'
    },
    {
      title: 'Publish Date',
      dataIndex: 'date',
      key: 'date',
      defaltSortOrder: 'descend',
      sorter: (a, b) => a.date < b.date
    },
    {
      title: 'Attachment',
      dataIndex: 'attachment',
      key: 'attachment',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Detail',
      dataIndex: 'detail',
      key: 'detail',
      render: (text) => <a>{text}</a>
    }
  ]
  const dataSource = data.map((item) => {
    return {
      key: item.No,
      id: item.No,
      subject: item.Subject,
      authorName: item.Author,
      department: item.ToDepartment,
      date: moment(item.PushlishDate != null ? item.PushlishDate.slice(0, 10) : null).format('DD-MM-YYYY'),
      attachment: item.Attachment
    }
  })

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }
  const handleClickPage = (page) => {
    setParam(page)
  }
  return (
    <div>
      <h1>Official Notice</h1>
      <Table className={style.b_table} dataSource={dataSource} columns={columns} loading={loading} pagination={false} />
      <Pagination
        total={50}
        current={param}
        onChange={handleClickPage}
        className={style.pagination}
      />

      <p>
        Total numbers of records: <label className={style.l_name}>{dataSource.length}</label>
      </p>
    </div>
  )
}

export default Notice
