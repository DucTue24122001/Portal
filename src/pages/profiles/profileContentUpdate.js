import React, { useEffect } from 'react'
import { getProfileApi, showLoadingProfile } from '../../redux/profile'
import { useDispatch, useSelector } from 'react-redux'
import Title from 'antd/lib/typography/Title'
import Text from 'antd/lib/typography/Text'
import { Col, Row, Avatar, Divider, Button, Select, DatePicker, Input, Form } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import Loading from './Loading'
import moment from 'moment'
import style from './profile.module.css'

const gender = ['Nam', 'Nữ', 'Khác']
const dateFormat = 'DD/MM/YYYY'
const fomatDate = 'MM/YYYY'
const statusMarriage = ['Married', 'Single']

const profileContentUpdate = () => {
  const dispatch = useDispatch()
  const { data, loading } = useSelector((state) => state.profile)

  useEffect(() => {
    dispatch(showLoadingProfile(true))
    dispatch(getProfileApi(data))
  }, [])
  console.log(data)
  let datalist = data
  if (data[0]) {
    datalist = data[0].data
  }

  const { Option } = Select
  const validateMessages = {
    required: "'${name}' is required!"
  }
  const onFinish = (value) => {
    console.log('Success:', value)
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className={style.timesheet}>
      <div className={style.timesheet_title}>
        <Title level={4}>
          <Text className={style.f_font}>My profile</Text>
        </Title>
      </div>
      {loading === true ? (
        <Loading />
      ) : (
        <Form
          wrapperCol={{ span: 14, push: 4 }}
          labelCol={{ span: 6, push: 2 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className={style.Container}>
            <div className={style.d_flex}>
              <div className={style.avatar}>
                <div className={style.col_flex}>
                  <Avatar shape='square' size={150} icon={<UserOutlined />} className={style.m_right} />
                  <Button type='link' block>
                    choose file
                  </Button>
                </div>
                <div className={style.col_flex}>
                  <Avatar shape='square' size={100} icon={<UserOutlined />} />
                  <Button type='link' block>
                    choose file
                  </Button>
                </div>
              </div>
              <div className={style.userInfo}>
                <Row>
                  <Col span={15}>
                    <label>Member Code:</label>
                  </Col>
                  <Col span={1}>
                    <span>{datalist.member_code}</span>
                  </Col>
                </Row>

                <Row>
                  <Col span={15}>
                    <label>Email: </label>
                  </Col>
                  <Col span={1}>
                    <span>{datalist.email}</span>
                  </Col>
                </Row>

                <Row>
                  <Col span={1}>
                    <label>Name: </label>
                  </Col>
                  <Col span={20} push={14}>
                    <span>{datalist.full_name}</span>
                  </Col>
                </Row>

                <Row>
                  <Col span={15}>
                    <label>Phone number: </label>
                  </Col>
                  <Col span={1}>
                    <span>{datalist.phone}</span>
                  </Col>
                </Row>
              </div>
            </div>
            <div className={style.m_right}>
              <Form.Item>
                <Button className={style.e_button} htmlType='submit'>
                  Update Profile
                </Button>
              </Form.Item>
            </div>
          </div>
          <Divider className={style.divider} />

          <div className={style.d_flex}>
            <div>
              <Form.Item
                name='gender'
                label='Gender'
                rules={[
                  {
                    required: true,
                    message: 'Please enter your option'
                  }
                ]}
              >
                <Select defaultValue={gender[datalist.gender]} className={style.l_width}>
                  {gender.map((item, index) => (
                    <Option value={index} key={index}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name='birthDate'
                label='Birth Date'
                rules={[
                  {
                    required: true,
                    message: 'Please enter your birth date'
                  }
                ]}
              >
                <DatePicker
                  defaultValue={moment(datalist.birth_date, dateFormat)}
                  format={dateFormat}
                  className='l-width'
                />
              </Form.Item>

              <Form.Item
                name='Identity'
                label='Identity Number'
                rules={[
                  {
                    required: true,
                    message: 'Please enter your identity number'
                  }
                ]}
              >
                <Input
                  defaultValue={datalist.identity_number}
                  className='l-width'
                  placeholder='Input your identity...'
                />
              </Form.Item>

              <Form.Item
                name='date_of_issue'
                label='Date of issue Identity'
                rules={[
                  {
                    required: true,
                    message: 'Please enter your date of issue identity'
                  }
                ]}
              >
                <DatePicker
                  defaultValue={moment(datalist.identity_card_date, dateFormat)}
                  format={dateFormat}
                  className='l-width'
                />
              </Form.Item>

              <Form.Item
                name='place_of_issue'
                label='Place of issue Identity'
                rules={[
                  {
                    required: true,
                    message: 'Please enter your place of issue identity'
                  }
                ]}
              >
                <Input
                  defaultValue={datalist.identity_card_place}
                  className='l-width'
                  placeholder='Input your place of issue...'
                />
              </Form.Item>

              <Form.Item
                name='passport_number'
                label='Passposs Number'
                rules={[
                  {
                    required: true,
                    message: 'Please enter your passposs number'
                  }
                ]}
              >
                <Input
                  defaultValue={datalist.passport_number}
                  className='l-width'
                  placeholder='Input your passposs...'
                />
              </Form.Item>

              <Form.Item
                name='passport_expiration'
                label='Passposs Expiration'
                rules={[
                  {
                    required: true,
                    message: 'Please enter your passposs expiration'
                  }
                ]}
              >
                <DatePicker
                  defaultValue={moment(datalist.passport_expiration, fomatDate)}
                  format={fomatDate}
                  className='l-width'
                />
              </Form.Item>

              <Form.Item
                name='nationality'
                label='Nationality'
                rules={[
                  {
                    required: true,
                    message: 'Please enter your nationality'
                  }
                ]}
              >
                <Input
                  defaultValue={datalist.nationality}
                  className='l-width'
                  placeholder='Input your nationality...'
                />
              </Form.Item>

              <Form.Item
                name='permanent'
                label='Permanent Address'
                rules={[
                  {
                    required: true,
                    message: 'Please enter your permanent address'
                  }
                ]}
              >
                <Input
                  defaultValue={datalist.permanent_address}
                  className='r-width'
                  placeholder='Input your permanent...'
                />
              </Form.Item>

              <Form.Item
                name='temporary'
                label='Temporary Address'
                rules={[
                  {
                    required: true,
                    message: 'Please enter your temporary address'
                  }
                ]}
              >
                <Input
                  defaultValue={datalist.temporary_address}
                  className={style.r_width}
                  placeholder='Input your temporary...'
                />
              </Form.Item>
            </div>

            <div className={style.mr_right}>
              <Form.Item
                name='nick_name'
                label='Nick Name'
                wrapperCol={{ span: 24, push: 4 }}
                labelCol={{ span: 8 }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter your nick name'
                  }
                ]}
              >
                <Input defaultValue={datalist.nick_name} placeholder='Input your name' />
              </Form.Item>

              <Form.Item
                name='other_email'
                label='Other Email'
                wrapperCol={{ span: 24, push: 4 }}
                labelCol={{ span: 8 }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter your other email'
                  }
                ]}
              >
                <Input defaultValue={datalist.other_email} placeholder='Input your email' />
              </Form.Item>

              <Form.Item
                name='skype'
                label='Skype'
                wrapperCol={{ span: 24, push: 4 }}
                labelCol={{ span: 8 }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter your skype!'
                  }
                ]}
              >
                <Input defaultValue={datalist.skype} placeholder='Input your skype' />
              </Form.Item>

              <Form.Item
                name='facebook'
                label='Facebook'
                wrapperCol={{ span: 24, push: 4 }}
                labelCol={{ span: 8 }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter your facebook!'
                  }
                ]}
              >
                <Input defaultValue={datalist.facebook} placeholder='Input your link facebook' />
              </Form.Item>

              <Form.Item
                name='bank_name'
                label='Bank Name'
                wrapperCol={{ span: 24, push: 4 }}
                labelCol={{ span: 8 }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter your bank name!'
                  }
                ]}
              >
                <Input defaultValue={datalist.bank_name} placeholder='Input your bank name' />
              </Form.Item>

              <Form.Item
                name='bank_account'
                label='Bank Account'
                wrapperCol={{ span: 24, push: 4 }}
                labelCol={{ span: 8 }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter your bank account!'
                  }
                ]}
              >
                <Input defaultValue={datalist.bank_account} placeholder='Input your bank account' />
              </Form.Item>

              <Form.Item
                name='marital_status'
                label='Marital Status'
                wrapperCol={{ span: 24, push: 4 }}
                labelCol={{ span: 8 }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter your option!'
                  }
                ]}
              >
                <Select defaultValue={statusMarriage[datalist.marital_status]} className={style.l_width}>
                  {statusMarriage.map((item, index) => (
                    <Option key={index}>{item}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name='academic_level'
                label='Academic Level'
                wrapperCol={{ span: 18, push: 3 }}
                labelCol={{ span: 9, pull: 1 }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter your academic level!'
                  }
                ]}
              >
                <Input
                  defaultValue={datalist.academic_level}
                  className={style.rr_width}
                  placeholder='Input your academic level'
                />
              </Form.Item>
            </div>
          </div>

          <Divider className={style.divider} />

          <div className={style.d_flex}>
            <div>
              <Form.Item
                name='tax_identification'
                label='Tax Identification'
                wrapperCol={{ span: 14, push: 6 }}
                labelCol={{ span: 10, push: 2 }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter your tax identification!'
                  }
                ]}
              >
                <Input defaultValue={datalist.tax_identification} placeholder='Input your tax identification' />
              </Form.Item>

              <Form.Item
                name='tax_department'
                label='Tax Department In Change'
                wrapperCol={{ span: 14, push: 4 }}
                labelCol={{ span: 12 }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter your department!'
                  }
                ]}
              >
                <Input
                  defaultValue={datalist.tax_place}
                  className={style.w_width}
                  placeholder='Input your tax department in change'
                />
              </Form.Item>

              <Form.Item
                name='insuarance'
                label='Insuarance Number'
                wrapperCol={{ span: 14, push: 6 }}
                labelCol={{ span: 10, push: 2 }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter your insuarance number!'
                  }
                ]}
              >
                <Input defaultValue={datalist.insurance_number} placeholder='Input your insuarance number' />
              </Form.Item>

              <Form.Item
                name='healthcare_provider'
                label='Healthcare Provider'
                wrapperCol={{ span: 14, push: 6 }}
                labelCol={{ span: 10, push: 2 }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter your healthcare provider!'
                  }
                ]}
              >
                <Input defaultValue={datalist.healthcare_provider} placeholder='Input your healthcare provider' />
              </Form.Item>
            </div>

            <div className={style.mrr_right}>
              <Form.Item
                name='contact_name'
                label='Emergency Contact Name'
                wrapperCol={{ span: 12, pull: 12 }}
                labelCol={{ span: 12, pull: 15 }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter your contact name!'
                  }
                ]}
              >
                <Input defaultValue={datalist.emergency_contact_name} placeholder='Input your emergency contact name' />
              </Form.Item>

              <Form.Item
                name='contact_relationship'
                label='Emergency Contact Relationship'
                wrapperCol={{ span: 14, pull: 13 }}
                labelCol={{ span: 13, pull: 16 }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter your relationship!'
                  }
                ]}
              >
                <Input
                  defaultValue={datalist.emergency_contact_relationship}
                  className={style.w_width}
                  placeholder='Input your emergency contact relationship'
                />
              </Form.Item>

              <Form.Item
                name='contact_number'
                label='Emergency Contact Number'
                wrapperCol={{ span: 12, pull: 12 }}
                labelCol={{ span: 12, pull: 15 }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter your contact number!'
                  }
                ]}
              >
                <Input
                  defaultValue={datalist.emergency_contact_number}
                  placeholder='Input your emergency contact number'
                />
              </Form.Item>

              <Form.Item
                name='start_date'
                label='Start Date'
                wrapperCol={{ span: 12, pull: 10 }}
                labelCol={{ span: 10, pull: 13 }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter your start date!'
                  }
                ]}
              >
                <DatePicker defaultValue={moment(datalist.start_date_official, dateFormat)} format={dateFormat} />
              </Form.Item>
            </div>
          </div>
        </Form>
      )}
    </div>
  )
}

export default profileContentUpdate
