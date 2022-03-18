import { Button, Col, DatePicker, Form, Input, Radio, Row, Select, Typography } from 'antd'
import 'antd/dist/antd.css'
import Layout, { Content } from 'antd/lib/layout/layout'
import Title from 'antd/lib/typography/Title'
import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { timeSheetRedux } from '../../redux/timesheet'
import { noticeRedux } from '../../redux/notice'
import { Link } from 'react-router-dom'
import { PlusOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons'
import styles from './styles.module.css'

const SearchNotice = ({ onSearch }) => {
  const { Text } = Typography
  const { Option } = Select

  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const btnLoadingRedux = useSelector((state) => state.notice.btnLoading)
  const optionDepartment = useSelector((state) => state.notice.department)

  const onReset = () => {
    form.resetFields()
    onSearch({ btnForm: 2 })
    dispatch(noticeRedux.btnLoadingSearch(false))
    dispatch(noticeRedux.optionSearchorReset(0))
  }

  const onFinish = (value) => {
    dispatch(noticeRedux.btnLoadingSearch(true))
    dispatch(noticeRedux.loadingTableTrue())
    const values = { ...value, btnForm: 1 }
    onSearch(values)
  }

  const onFinishFailed = () => {}

  return (
    <>
      <Row className={styles.marginBottom}>
        <Col span={24} className={styles.toTheRight}>
          <Button type='primary' style={{ display: 'flex', alignItems: 'center' }} icon={<PlusOutlined />}>
            <Link to='/createNotice' className={styles.btnCreate}>
              Create New
            </Link>
          </Button>
        </Col>
      </Row>
      <div className={styles.notice}>
        <div className={styles.noticeTitle}>
          <Title level={4}>
            <Text className={styles.title}>Notice</Text>
          </Title>
        </div>
        <div className={styles.optionSearch}>
          <Layout>
            <Content className={styles.boderOption}>
              <Form
                name='basic'
                className={styles.formSearch}
                initialValues={{
                  remember: true
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete='off'
                form={form}
              >
                <Row gutter={24}>
                  <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6, offset: 4 }} lg={{ span: 4, offset: 2 }}>
                    <Form.Item>
                      <Text>Subject</Text>
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 4 }}>
                    <Form.Item
                      name='inputSearch'
                      rules={[
                        {
                          required: true,
                          message: 'Please input your search!'
                        }
                      ]}
                    >
                      <Input placeholder='String for search' />
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6, offset: 4 }} lg={{ span: 4, offset: 2 }}>
                    <Form.Item>
                      <Text>Sort by publish date</Text>
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 4 }}>
                    <Form.Item
                      name='SortBy'
                      rules={[
                        {
                          required: true,
                          message: 'Please input your publish date!'
                        }
                      ]}
                    >
                      <Select placeholder='Option sort'>
                        <Option value='asc'>Ascending</Option>
                        <Option value='desc'>Decrease</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 6, offset: 4 }} lg={{ span: 4, offset: 2 }}>
                    <Form.Item name='Department'>
                      <Text>To Department</Text>
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 4 }}>
                    <Form.Item
                      name='Department'
                      rules={[
                        {
                          required: true,
                          message: 'Please input department!'
                        }
                      ]}
                    >
                      <Select placeholder='Select time'>
                        {optionDepartment &&
                          optionDepartment.map((item, index) => (
                            <Option key={index} value={item}>
                              {item}
                            </Option>
                          ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24} justify='center'>
                  <Col xs={{ span: 12 }} sm={{ span: 6 }} md={{ span: 4 }} lg={{ span: 2 }}>
                    <Form.Item>
                      <Button
                        type='primary'
                        htmlType='submit'
                        style={{ display: 'flex', alignItems: 'center' }}
                        icon={<SearchOutlined />}
                        loading={btnLoadingRedux}
                      >
                        Search
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col xs={{ span: 12 }} sm={{ span: 6 }} md={{ span: 4, offset: 1 }} lg={{ span: 2, offset: 1 }}>
                    <Form.Item>
                      <Button
                        htmlType='button'
                        style={{ display: 'flex', alignItems: 'center' }}
                        onClick={onReset}
                        icon={<ReloadOutlined />}
                      >
                        Reset
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Content>
          </Layout>
        </div>
      </div>
    </>
  )
}

export default memo(SearchNotice)
