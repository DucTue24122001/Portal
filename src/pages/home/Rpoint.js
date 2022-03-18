import React, { useEffect, useState } from 'react'
import { Table, Pagination } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Select } from 'antd'
import style from './home.module.css'
import { rpoint } from '../../redux/home'

const Rpoint = () => {
  const { Option } = Select
  const [pages, setPages] = useState(1)
  const dispatch = useDispatch()
  const { data, loading } = useSelector((state) => state.rpoint)

  useEffect(() => {
    dispatch(rpoint.getRpointApi(pages))
  }, [])

  useEffect(() => {
    dispatch(rpoint.showloading(true))
    dispatch(rpoint.getRpointApi(pages))
  }, [pages])

  const columns = [
    {
      title: 'TXI',
      dataIndex: 'txt',
      key: 'txt'
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      defaltSortOrder: 'descend',
      sorter: (a, b) => a.date < b.date
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      defaltSortOrder: 'descend',
      sorter: (a, b) => a.action === b.action
    },
    {
      title: 'Point',
      dataIndex: 'point',
      key: 'point',
      render: (text) => <a style={text < 0 ? { color: 'red' } : { color: 'blue' }}>{text}</a>,
      sorter: (a, b) => a.point < b.point
    }
  ]

  const dataSource = data?.data?.map((item) => {
    return {
      key: item.id,
      txt: item.id,
      date: item.date,
      action: item.action,
      point: item.point
    }
  })
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }

  const handlePageClick = (page) => {
    setPages(page)
    console.log('page', page)
  }

  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }

  return (
    <div className={style.container}>
      <div className={style.header_title}>
        <div className={style.d_flex}>
          <h1 className={style.l_name}>R-Point</h1>
          <p className={style.mrl_10}>
            Total points: <span className={style.l_name}>{data?.current_point}</span>
          </p>
          <p className={style.mrl_10}>
            This month: <span className={style.s_point}>{data?.month_point}</span>
          </p>
        </div>

        <Select defaultValue='1' onChange={handleChange}>
          <Option value='1'>1 Tháng</Option>
          <Option value='3'>3 Tháng</Option>
          <Option value='6'>6 Tháng</Option>
        </Select>
      </div>
      <Table
        className={style.b_table}
        dataSource={dataSource}
        columns={columns}
        onChange={onChange}
        loading={loading}
        pagination={false}
      />
      <Pagination className={style.pagination} pageSize={5} total={data?.total} current={pages} onChange={handlePageClick} />
      <p className={style.l_total}>
        Total numbers of records:
        <label className={style.l_name}>{data?.total}</label>
      </p>
      <hr className={style.custom_hr} />
    </div>
  )
}

export default Rpoint
