import React, { useEffect, useState } from 'react'
import { Menu, Row, Col, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { SettingOutlined, PoweroffOutlined } from '@ant-design/icons'
import style from './header.module.css'
import { logout } from '../../../redux/logout'
import { useDispatch, useSelector } from 'react-redux'
import { getInfoUser } from '../../../redux/inforUser'

const { Title } = Typography
const Header = () => {
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('')
  const { infoUser, successGetInfo } = useSelector((state) => state.infoUser)

  const handleLogout = async() => {
    await dispatch(logout())
    window.location.reload()
  }

  useEffect(() => {
    dispatch(getInfoUser())
  }, [])

  useEffect(() => {
    if (successGetInfo === true) {
      setUserName(infoUser.name)
    }
  }, [successGetInfo])

  return (
    <>
      <Row>
        <Col span={24}>
          <div className={style.header}>
            <Row className={style.header_row}>
              <Col span={12} className={style.header_title}>
                <Title>
                  <Link to='/'>Relipa Protal</Link>
                </Title>
              </Col>
              <Col span={6} className={style.header_info}>
                Welcome <b>{userName}</b>
              </Col>
              <Col span={6} className={style.header_nav_right}>
                <Menu style={{ border: 'none' }} mode='horizontal'>
                  <Menu.Item
                    style={{ display: 'flex', alignItems: 'center' }}
                    key='changepass'
                    icon={<SettingOutlined />}
                  >
                    Change Password
                  </Menu.Item>
                  <Menu.Item
                    onClick={handleLogout}
                    style={{ display: 'flex', alignItems: 'center' }}
                    key='logout'
                    icon={<PoweroffOutlined />}
                  >
                    Log out
                  </Menu.Item>
                </Menu>
              </Col>
            </Row>
            <Row>
              <Col>
                <Menu style={{ border: 'none' }} mode='horizontal'>
                  <Menu.Item key='home'>
                    <Link to='/'>Home</Link>
                  </Menu.Item>
                  <Menu.Item key='timesheet'>
                    <Link to='/timesheet'>Timesheet</Link>
                  </Menu.Item>
                  <Menu.Item key='leave'>
                    <Link to='/leave'>My Leave</Link>
                  </Menu.Item>
                  <Menu.Item key='requests'>
                    <Link to='/requests'>Request</Link>
                  </Menu.Item>
                  <Menu.Item key='Notice'>
                    <Link to='/notice'>Notice</Link>
                  </Menu.Item>
                </Menu>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Header
