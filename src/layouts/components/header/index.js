import React, { useState } from 'react'
import { Menu, Row, Col, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { SettingOutlined, PoweroffOutlined } from '@ant-design/icons'
import style from './header.module.css'

const { Title } = Typography

const Header = () => {
  const [user] = useState('Vu Van Vinh')

  const handleClick = () => {}

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
                Welcome <b>{user}</b>
              </Col>
              <Col span={6} className={style.header_nav_right}>
                <Menu style={{ border: 'none' }} onClick={handleClick} mode='horizontal'>
                  <Menu.Item
                    style={{ display: 'flex', alignItems: 'center' }}
                    key='changepass'
                    icon={<SettingOutlined />}
                  >
                    Change Password
                  </Menu.Item>
                  <Menu.Item style={{ display: 'flex', alignItems: 'center' }} key='logout' icon={<PoweroffOutlined />}>
                    Log out
                  </Menu.Item>
                </Menu>
              </Col>
            </Row>
            <Row>
              <Col>
                <Menu style={{ border: 'none' }} onClick={handleClick} mode='horizontal'>
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
