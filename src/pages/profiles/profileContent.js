import Title from 'antd/lib/typography/Title'
import React, { useEffect } from 'react'
import Text from 'antd/lib/typography/Text'
import { Col, Row, Avatar, Divider, Button, Form } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import style from '../profiles/profile.module.css'
import { getProfileApi, showLoadingProfile } from '../../redux/profile'
import { useDispatch, useSelector } from 'react-redux'
import Loading from './Loading'
import { Link } from 'react-router-dom'
import profileContentUpdate from './profileContentUpdate'

const profileContentPage = () => {
  const dispatch = useDispatch()
  const { data, loading } = useSelector((state) => state.profile)

  useEffect(() => {
    dispatch(showLoadingProfile(true))
    dispatch(getProfileApi())
  }, [])
  let listData = data
  if (data[0]) {
    listData = data[0].data
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
        <Form>
          <div className={style.Container}>
            <div className={style.d_flex}>
              <div className={style.avatar}>
                <Avatar shape='square' size={150} icon={<UserOutlined />} style={{ marginRight: '1rem' }} />
                <Avatar shape='square' size={100} icon={<UserOutlined />} />
              </div>
              <div className={style.userInfo}>
                <Row>
                  <Col span={15}>
                    <label>Member Code:</label>
                  </Col>
                  <Col span={1}>
                    <span>{listData.member_code}</span>
                  </Col>
                </Row>

                <Row>
                  <Col span={15}>
                    <label>Email: </label>
                  </Col>
                  <Col span={1}>
                    <span>{listData.email}</span>
                  </Col>
                </Row>

                <Row>
                  <Col span={1}>
                    <label>Name: </label>
                  </Col>
                  <Col span={20} push={14}>
                    <span>{listData.full_name}</span>
                  </Col>
                </Row>

                <Row>
                  <Col span={15}>
                    <label>Phone number: </label>
                  </Col>
                  <Col span={1}>
                    <span>{listData.phone}</span>
                  </Col>
                </Row>
              </div>
            </div>
            <div>
              <Link to='/profileUpdate'>
                <Button className={style.e_button}>Edit Profile</Button>
              </Link>
            </div>
          </div>
          <Divider className={style.divider} />

          <div className={style.d_flex}>
            <div className={style.c_flex}>
              <Row>
                <Col span={20}>
                  <label>Gender: </label>
                </Col>
                <Col span={4} pull={8}>
                  <span>{listData.gender}</span>
                </Col>
              </Row>

              <Row>
                <Col span={20}>
                  <label>Birth Date: </label>
                </Col>
                <Col span={1} pull={8}>
                  <span>{listData.birth_date}</span>
                </Col>
              </Row>

              <Row>
                <Col span={20}>
                  <label>Identity Number: </label>
                </Col>
                <Col span={1} pull={8}>
                  <span>{listData.identity_number}</span>
                </Col>
              </Row>

              <Row>
                <Col span={20}>
                  <label>Date of issue Identity: </label>
                </Col>
                <Col span={1} pull={8}>
                  <span>{listData.identity_card_date}</span>
                </Col>
              </Row>

              <Row>
                <Col span={16}>
                  <label>Place of issue identity: </label>
                </Col>
                <Col span={8} pull={4}>
                  <span>{listData.identity_card_place}</span>
                </Col>
              </Row>

              <Row>
                <Col span={20}>
                  <label>Passport Number: </label>
                </Col>
                <Col span={1} pull={8}>
                  <span>{listData.passport_number}</span>
                </Col>
              </Row>

              <Row>
                <Col span={20}>
                  <label>Passport Expiration: </label>
                </Col>
                <Col span={1} pull={8}>
                  <span>{listData.passport_expiration}</span>
                </Col>
              </Row>

              <Row>
                <Col span={16}>
                  <label>Nationnality: </label>
                </Col>
                <Col span={8} pull={4}>
                  <span>{listData.nationality}</span>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <label>Permanent Address: </label>
                </Col>
                <Col span={14} push={2}>
                  <span>{listData.permanent_address}</span>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <label>Temporary Address: </label>
                </Col>
                <Col span={14} push={2}>
                  <span>{listData.temporary_address}</span>
                </Col>
              </Row>
            </div>

            <div className={style.flex_mr}>
              <Row>
                <Col span={10} pull={20}>
                  <label>Nick name: </label>
                </Col>
                <Col span={14} pull={18}>
                  <span>{listData.nick_name}</span>
                </Col>
              </Row>

              <Row>
                <Col span={10} pull={21}>
                  <label>Other email: </label>
                </Col>
                <Col span={14} pull={18}>
                  <span>{listData.other_email}</span>
                </Col>
              </Row>

              <Row>
                <Col span={10} pull={17}>
                  <label>Skype:</label>
                </Col>
                <Col span={4} pull={18}>
                  <span>{listData.skype}</span>
                </Col>
              </Row>

              <Row>
                <Col span={10} pull={19}>
                  <label>Facebook: </label>
                </Col>
                <Col pull={18}>
                  <a>{listData.facebook}</a>
                </Col>
              </Row>

              <Row>
                <Col span={10} pull={20}>
                  <label>Bank name: </label>
                </Col>
                <Col pull={18}>
                  <span>{listData.bank_name}</span>
                </Col>
              </Row>

              <Row>
                <Col span={10} pull={22}>
                  <label>Bank Account: </label>
                </Col>
                <Col pull={18}>
                  <span>{listData.bank_account}</span>
                </Col>
              </Row>

              <Row>
                <Col span={10} pull={22}>
                  <label>Marital Status: </label>
                </Col>
                <Col pull={18}>
                  <span>{listData.marital_status}</span>
                </Col>
              </Row>

              <Row>
                <Col span={16} pull={23}>
                  <label>Academic Level: </label>
                </Col>
                <Col span={8} pull={24}>
                  <span>{listData.academic_level}</span>
                </Col>
              </Row>
            </div>
          </div>
          <Divider className={style.divider} />

          <div className={style.d_flex}>
            <div className={style.f_overrall}>
              <Row>
                <Col span={15}>
                  <label>Tax Identification:</label>
                </Col>
                <Col span={1} pull={2}>
                  <span>{listData.tax_identification}</span>
                </Col>
              </Row>
              <Row>
                <Col span={11}>
                  <label>Tax Department In Charge:</label>
                </Col>
                <Col span={13} push={2}>
                  <span>{listData.tax_place}</span>
                </Col>
              </Row>
              <Row>
                <Col span={15}>
                  <label>Insurance Number:</label>
                </Col>
                <Col span={1} pull={2}>
                  <span>{listData.insurance_number}</span>
                </Col>
              </Row>
              <Row>
                <Col span={18}>
                  <label>Healthcare Provider:</label>
                </Col>
                <Col span={6} pull={5}>
                  <span>{listData.healthcare_provider}</span>
                </Col>
              </Row>
            </div>
            <div className={style.f_overrall_mr}>
              <Row>
                <Col span={18} pull={19}>
                  <label>Emergency Contact Name:</label>
                </Col>
                <Col span={6} pull={18}>
                  <span>{listData.emergency_contact_name}</span>
                </Col>
              </Row>
              <Row>
                <Col span={20} pull={22}>
                  <label>Emergency Contact Relationship:</label>
                </Col>
                <Col span={3} pull={20}>
                  <span>{listData.emergency_contact_relationship}</span>
                </Col>
              </Row>
              <Row>
                <Col span={18} pull={20}>
                  <label>Emergency Contact Number:</label>
                </Col>
                <Col span={6} pull={18}>
                  <span>{listData.emergency_contact_number}</span>
                </Col>
              </Row>
              <Row>
                <Col span={18} pull={10}>
                  <label>Start Date:</label>
                </Col>
                <Col span={6} pull={18}>
                  <span>{listData.start_date_official}</span>
                </Col>
              </Row>
            </div>
          </div>
        </Form>
      )}
    </div>
  )
}

export default profileContentPage
