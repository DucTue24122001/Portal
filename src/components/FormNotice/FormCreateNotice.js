import React from 'react'
import { Form,Row, Col,Input } from 'antd'
const CreateNotice = () => {
  return (
    <>
      <h1>Create Notice</h1>
      <Form
        name='CreateNotice'
        labelCol={{ span: 8 }}
        wrapperCol = {{ span: 16 }}
        initialValues = {{ remember: true }}
        onFinish = {}
        onFinishFailed = {}
      >
        <Form.Item >
            <Row>
              <Col span={12}>Subject: </Col>
              <Col span={12}>
                <Input placeholder='String for search'/>
              </Col>
            </Row>
        </Form.Item>
      </Form>
    </>
  )
}

export default CreateNotice
