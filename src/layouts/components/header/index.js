import React from 'react'
import './header.module.css'
import { Menu, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import {
  SettingOutlined,
  PoweroffOutlined
} from '@ant-design/icons'
const Header = ({ router }) => {
  console.log(router)
  const handleClick = () => {
    console.log(1)
  }
  return (
    <>
      <Row>
        <Col span={24}>
          <div className='header'>
            <Row className='header-row'>
              <Col span={12} className='header-title'>
                <Link to='/home'>Relipa Protal</Link>
              </Col>
              <Col span={6} className='header-info'>
              Welcome <b>Vũ Văn Vịnh</b>
              </Col>
              <Col span={6} className='header-nav-right'>
                <Menu onClick={handleClick} mode='horizontal'>
                  <Menu.Item key='changepass' icon={<SettingOutlined />}>
                  Change Password
                  </Menu.Item>
                  <Menu.Item key='logout' icon={<PoweroffOutlined />}>
                  Log out
                  </Menu.Item>
                </Menu>
              </Col>
            </Row>
            <Row>
              <Col>
                <Menu onClick={handleClick} mode='horizontal'>
                  <Menu.Item key='home'>
                    <Link to='/home'>Home</Link>
                  </Menu.Item>
                  <Menu.Item key='timesheet' >
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
      {router}
    </>
  )
}

export default Header
