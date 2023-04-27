import React, { useEffect, useState } from "react";
import {
    Spin,
    Col,
    Input,
    Modal,
    InputNumber,
    Form,
    Row,
    Select,
    Button,
    Switch,
} from "antd";
import { connect } from "react-redux";
import { notify } from "../../../redux/actions";
import { useTranslation } from "react-i18next";
import { whiteSpace, noWhitespace } from "../../../utils/rules";
import { PicCenterOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ImgCrop from "antd-img-crop";
import { Upload } from "antd";
import history from "../../../const/history";
import admin from "../../../const/api"
const { Option } = Select;

function EditOrders(props) {
    const [spin, setSpin] = useState(false);
    const [categories, setCategories] = useState([]);
    const [status , setStatus] = useState(undefined)
    const [date , setDate] = useState(undefined)
    const [total , setTotal] = useState(undefined)
    const [persons, setPersons] = useState([]);
    const [tables, setTables] = useState([]);
    let editing = props.match.params.id;
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const { notify } = props;
    const getPost = async () => {
        await admin.get(`orders/${editing}`).then((res) => {
            let data = res.data
            setDate(data.date)
            setStatus(data.status)
            setTotal(data.total)
            setSpin(false);
            form.setFieldsValue(data);
        });
    };

    const getPersons = async () => {
        await admin.get(`persons`).then((res) => {
            setPersons(res.data)
        });
    };

    const getTables = async () => {
        await admin.get(`tables`).then((res) => {
            setTables(res.data)
        });
    };


    useEffect(() => {
        form.resetFields();
        if (props.match.params.id) {
            setSpin(true);
            getPost();
        }
    }, [editing]);

    useEffect(() => {
        getTables()
        getPersons()
    } , [])

    const saveItem = async (values) => {
        let today = new Date();
        let obj = {
            ...values,
            person:persons.find(p => p.id === parseInt(values.person_id)).name,
            table:tables.find(l => l.id === parseInt(values.table_id)).name,
            status: status !== undefined ? status : 0,
        }
        if (!editing) {
            obj['date'] = today
            obj['total'] = 0
            await admin
                .post(`/orders`, obj)
                .then((res) => {
                    notify("", true);
                    form.resetFields();
                    console.log(res)
                    history.push(`/orders/products/${res?.data?.id}`)
                })
                .catch((err) => {
                    notify(err.response, false);
                });
        } else {
            obj['date'] = date
            obj['total'] = total
            await admin
                .put(`/orders/${editing}`, obj)
                .then((res) => {
                    notify("", true);
                    form.resetFields();
                    history.push(`/orders/products/${editing}`)
                })
                .catch((err) => {
                    notify(err.response, false);
                });
        }
    };

    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col xs={24}>
                    <div className="border flex-between page-heading flex p-2 mt-0 bg-white">
                        <div className="page-name">
                            <PicCenterOutlined className="f-20 mr5-15" />
                            <span className="f-20 bold">Order</span>
                        </div>
                        <Link
                            to={{
                                pathname: `/orders`,
                            }}
                        >
                            <Button type={"primary"}>{t("cancel")}</Button>
                        </Link>
                    </div>
                </Col>
                <Col xs={24}>
                    {spin ? (
                        <div className="flex animated fadeIn p-2 bg-white all-center">
                            <Spin size={"large"} />
                        </div>
                    ) : (
                        <div className="p-2 animated edit fadeInUp bg-white">
                            <Form form={form} onFinish={saveItem} layout="vertical">
                                <Row gutter={[8, 8]}>
                                    <Col md={12} sm={12} xs={24}>
                                        <p className={"mb-10"}>Table</p>
                                        <Form.Item
                                            className="mb-5"
                                            validateTrigger="onChange"
                                            name={`table_id`}
                                            rules={[noWhitespace(t("inputError"))]}
                                        >
                                            <Select
                                                showSearch
                                                notFoundContent={null}
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                                filterSort={(optionA, optionB) =>
                                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                                }
                                            >
                                                {tables.map((c , i)=>(
                                                    <Option key={i}  value={c.id}>
                                                        {c.name}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col md={12} sm={12} xs={24}>
                                        <p className={"mb-10"}>Waiter</p>
                                        <Form.Item
                                            className="mb-5"
                                            validateTrigger="onChange"
                                            name={`person_id`}
                                            rules={[noWhitespace(t("inputError"))]}
                                        >
                                            <Select
                                                showSearch
                                                notFoundContent={null}
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                                filterSort={(optionA, optionB) =>
                                                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                                }
                                            >
                                                {persons.map((c , i)=>(
                                                    <Option key={i}  value={c.id}>
                                                        {c.name}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24}>
                                        <div className={"flex"}>
                                            <Button className={"mr-15"} htmlType="submit">
                                                {t("save")}
                                            </Button>
                                            {editing &&
                                                <Link
                                                    to={{
                                                        pathname: `/orders/products/${editing}`,
                                                    }}
                                                >
                                                    <Button className={"mr-15"}  type={"primary"}>Order details</Button>
                                                </Link>
                                            }
                                            <Link
                                                to={{
                                                    pathname: `/orders`,
                                                }}
                                            >
                                                <Button type={"primary"}>{t("cancel")}</Button>
                                            </Link>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    );
}

export default connect(null, { notify })(EditOrders);

