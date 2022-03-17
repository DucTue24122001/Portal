import React, { useEffect } from 'react'
import { Menu, Row, Col, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { SettingOutlined, PoweroffOutlined } from '@ant-design/icons'
import style from './header.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { infoUserActions } from '../../../redux/inforUser'
import { authActions } from '../../../redux/auth'

const { Title } = Typography
const Header = () => {
  const dispatch = useDispatch()
  const { infoUser } = useSelector((state) => state.infoUser)

  const handleLogout = async() => {
    await dispatch(authActions.logout())
    window.location.reload()
  }

  useEffect(() => {
    dispatch(infoUserActions.getInfoUser())
  }, [])

  return (
    <>
      <Row>
        <Col span={24}>
          <div className={style.header}>
            <Row className={style.header_row}>
              <Col span={12} className={style.header_title}>
                <Title>
                  <Link to='/'>Relipa Portal</Link>
                </Title>
              </Col>
              <Col span={6} className={style.header_info}>
                Welcome <b>{infoUser?.full_name}</b>
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
              <Col span={24}>
                <Menu style={{ border: 'none' }} mode='horizontal'>
                  <Menu.Item key='home'>
                    <Link to='/'>Home</Link>
                  </Menu.Item>
                  <Menu.Item key='profile'>
                    <Link to='/profile'>Profile</Link>
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
