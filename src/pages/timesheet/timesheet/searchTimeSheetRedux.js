import "antd/dist/antd.css";
import React from "react";
import Layout, { Content } from "antd/lib/layout/layout";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Radio,
  Row,
  Select,
  Typography,
} from "antd";
import Title from "antd/lib/typography/Title";
import styles from "../timesheet.module.css";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { btnLoadingSearch, loadingTableTrue } from "../timeSheetRedux";

const SearchTimeSheetRedux = ({ onSearch }) => {
  const { Text } = Typography;
  const { Option } = Select;
  const dateFormat = "DD/MM/YY";
  const [radioBtn, setRadioBtn] = useState(1);
  const [rolesTimestart, setRolesTimeStart] = useState({});
  const btnLoadingRedux = useSelector((state) => state.btnLoading);
  const [valueTime, setValueTime] = useState({
    startValue: null,
    endValue: null,
    endOpen: false,
  });
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    if (radioBtn === 2) {
      setRolesTimeStart({
        rulesRadioTime: {
          rules: [
            {
              required: true,
              message: "Please input date!",
            },
          ],
        },
        rulesRadioSort: {
          rules: [
            {
              required: false,
            },
          ],
        },
      });
    } else {
      setRolesTimeStart({
        rulesRadioTime: {
          rules: [
            {
              required: false,
              message: "",
            },
          ],
        },
        rulesRadioSort: {
          rules: [
            {
              required: true,
              message: "Please input select!",
            },
          ],
        },
      });
    }
  }, [radioBtn]);

  const onReset = () => {
    form.resetFields();
    dispatch(btnLoadingSearch(false));
    onSearch({ radioBtn: 3 });
  };

  const onFinish = (value) => {
    dispatch(btnLoadingSearch(true));
    dispatch(loadingTableTrue());
    const values = { ...value, radioBtn };
    onSearch(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onChangeRadio = (e) => {
    setRadioBtn(e.target.value);
    dispatch(btnLoadingSearch(false));
  };

  // start validate time
  const disabledStartDate = (startValue) => {
    const { endValue } = valueTime;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  const disabledEndDate = (endValue) => {
    const { startValue } = valueTime;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  const onChange = (field, value) => {
    setValueTime({
      ...valueTime,
      [field]: value,
    });
  };

  const onStartChange = (value) => {
    onChange("startValue", value);
  };

  const onEndChange = (value) => {
    onChange("endValue", value);
  };
  // end validate time start - end

  return (
    <>
      <div className={styles.timesheet}>
        <div className={styles.timesheetTitle}>
          <Title level={4}>
            <Text className={styles.myTimesheet}>My Timesheet</Text>
          </Title>
        </div>
        <div className={styles.optionSearch}>
          <Layout>
            <Content className={styles.radioOption}>
              <Radio.Group defaultValue={1} onChange={onChangeRadio}>
                <Form
                  name="basic"
                  className={styles.formSearch}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                  form={form}
                >
                  <Row gutter={24}>
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 12 }}
                      md={{ span: 10 }}
                      lg={{ span: 6 }}
                    >
                      <Form.Item>
                        <Form.Item noStyle>
                          <Radio value={1}>Choose from list</Radio>
                        </Form.Item>
                      </Form.Item>
                    </Col>
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 12 }}
                      md={{ span: 12 }}
                      lg={{ span: 6 }}
                    >
                      <Form.Item
                        label=""
                        name="Date"
                        className={styles.selectOption}
                        {...rolesTimestart.rulesRadioSort}
                      >
                        <Select placeholder="Select time">
                          <Option value="date">this date</Option>
                          <Option value="month">this month</Option>
                          <Option value="year">this year</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 23 }}
                      md={{ span: 16 }}
                      lg={{ span: 8 }}
                      className={styles.toTheRight}
                    >
                      <Form.Item
                        label="Sort by work date"
                        name="Sort"
                        {...rolesTimestart.rulesRadioSort}
                      >
                        <Select
                          placeholder="Select sort"
                          style={{ width: "160px" }}
                        >
                          <Option value="asc">Ascending</Option>
                          <Option value="desc">Decrease</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 12 }}
                      md={{ span: 10 }}
                      lg={{ span: 6 }}
                    >
                      <Form.Item>
                        <Form.Item noStyle>
                          <Radio value={2}>Choose start, end</Radio>
                        </Form.Item>
                      </Form.Item>
                    </Col>
                    <Col
                      xs={{ span: 24 }}
                      sm={{ span: 10 }}
                      md={{ span: 12 }}
                      lg={{ span: 6 }}
                    >
                      <Form.Item
                        name="dateStart"
                        {...rolesTimestart.rulesRadioTime}
                      >
                        <DatePicker
                          disabledDate={disabledStartDate}
                          format={dateFormat}
                          className={styles.selectOption}
                          value={valueTime.startValue}
                          placeholder="Start"
                          onChange={onStartChange}
                        />
                      </Form.Item>
                    </Col>
                    <Col
                      xs={{ span: 16 }}
                      sm={{ span: 23 }}
                      md={{ span: 18 }}
                      lg={{ span: 8 }}
                      className={styles.toTheRight}
                    >
                      <Form.Item
                        label="To"
                        name="dateEnd"
                        {...rolesTimestart.rulesRadioTime}
                      >
                        <DatePicker
                          format={dateFormat}
                          className={styles.selectOption}
                          disabledDate={disabledEndDate}
                          value={valueTime.endValue}
                          placeholder="End"
                          onChange={onEndChange}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={24} justify="center">
                    <Col
                      xs={{ span: 12 }}
                      sm={{ span: 6 }}
                      md={{ span: 4 }}
                      lg={{ span: 2 }}
                    >
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={btnLoadingRedux}
                        >
                          Search
                        </Button>
                      </Form.Item>
                    </Col>
                    <Col
                      xs={{ span: 12 }}
                      sm={{ span: 6 }}
                      md={{ span: 4 }}
                      lg={{ span: 2 }}
                    >
                      <Form.Item>
                        <Button htmlType="button" onClick={onReset}>
                          Reset
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Radio.Group>
            </Content>
          </Layout>
        </div>
      </div>
    </>
  );
};

export default memo(SearchTimeSheetRedux);
