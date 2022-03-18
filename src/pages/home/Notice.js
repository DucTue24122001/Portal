import React, { useState, useEffect } from 'react'
import { Pagination, Table, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { notice } from '../../redux/officialNotice'
import 'antd/dist/antd.css'
import style from './home.module.css'

const Notice = () => {
  const [param, setParam] = useState(1)
  const dispatch = useDispatch()
  const { data, loading } = useSelector((state) => state.notices)

  useEffect(() => {
    dispatch(notice.getNoticeData(param))
  }, [])

  useEffect(() => {
    dispatch(notice.showLoadingNotice(true))
    dispatch(notice.getNoticeData(param))
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
      sorter: (a, b) => a.subject === b.subject
    },
    {
      title: 'Author',
      dataIndex: 'authorName',
      key: 'authorName',
      defaltSortOrder: 'descend',
      sorter: (a, b) => a.authorName === b.authorName
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
      render: (text) => (
        <Typography.Link href={text} underline target='_blank'>
          {text.slice(27)}
        </Typography.Link>
      )
    },
    {
      title: 'Detail',
      dataIndex: 'detail',
      key: 'detail',
      render: (text) => <a style={{ color: 'blue' }}>{text}</a>
    }
  ]
  const dataSource = data?.data?.map((item) => {
    return {
      key: item.No,
      id: item.id,
      subject: item.subject,
      authorName: item.author,
      department: item.published_to,
      date: item.published_date,
      attachment: item.attachment,
      detail: 'view'
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
      <Table
        className={style.b_table}
        rowKey='id'
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        pagination={false}
      />
      <Pagination
        total={data?.total}
        pageSize={5}
        current={param}
        onChange={handleClickPage}
        className={style.pagination}
      />

      <p>
        Total numbers of records: <label className={style.l_name}>{data.total}</label>
      </p>
    </div>
  )
}

export default Notice
