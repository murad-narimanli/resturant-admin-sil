import React, { useEffect, useState, useRef } from "react";
import {
    Row,
    Col,
    Card,
    Table,
    Button,
    Switch,
    Spin,
    Form,
    Tooltip,
    Input,
    Popconfirm,
} from "antd";
import {
    UnorderedListOutlined,
    EditFilled,
    DeleteFilled,
} from "@ant-design/icons";
import { convertColumns } from "../../../utils/columnconverter";
import {notify } from '../../../redux/actions'
import { connect } from "react-redux";
import admin from "../../../const/api";
import { useTranslation } from "react-i18next";
import { whiteSpace } from "../../../utils/rules";

const Common = (props) => {
    let {url , name, label} = props
    const [form] = Form.useForm();
    const { t } = useTranslation();
    const [positions, setPositions] = useState([]);
    const [spin, setSpin] = useState(false);
    const [editing, setEditing] = useState(null);
    const cols = [
        { key: "index", value: "#", con: true },
        { key: "name", value: t("name"), con: true },
        { key: "id", value: "", con: false },
    ];
    const nameInput = useRef();
    // props
    const { notify } = props;

    const columns = [
        {
            title: t("name"),
            key: "2",
            dataIndex: "name",
        },
        {
            title: "",
            key: "3",
            dataIndex: "id",
            width: 30,
            render: (i) => {
                return (
                    <div className="flex flex-end">
                        <Popconfirm
                            placement="topRight"
                            title={t("areYouSure")}
                            onConfirm={() => deletePosition(i)}
                            okText={t("yes")}
                            cancelText={t("no")}
                        >
                            <Tooltip className="ml-5" title={t("delete")}>
                                <Button className="border-none" type="text" shape="circle">
                                    <DeleteFilled />
                                </Button>
                            </Tooltip>
                        </Popconfirm>
                        <Tooltip className="ml-5" title={t("edit")} placement="topRight">
                            <Button
                                className="border-none"
                                type="text"
                                shape="circle"
                                onClick={() => setEditingObject(i)}
                            >
                                <EditFilled />
                            </Button>
                        </Tooltip>
                    </div>
                );
            },
        },
    ];

    const setEditingObject = async (i) => {
        setEditing(i);
        await admin.get(`/${url}/${i}`).then((res) => {
            let data = res.data
            form.setFieldsValue(data);
        });
    };

    const cancelEditing = () => {
        setEditing(null);
        form.resetFields();
    };

    const deletePosition = async (i) => {
        await admin
            .delete(`/${url}/${i}`)
            .then(() => {
                // description
                notify("silindi", true);
                getPositions();
            })
            .catch((err) => {
                //error
                notify(err.response, false);
            });
    };

    const savePosition = async (values) => {
        let obj = {...values}
        if (!editing) {
            await admin
                .post(`/${url}`,obj )
                .then((res) => {
                    notify("", true);
                    getPositions();
                    cancelEditing();
                })
                .catch((err) => {
                    notify(err.response, false);
                });
        } else {
            obj["id"] = editing;
            await admin
                .put(`/${url}/${editing}`, obj)
                .then((res) => {
                    notify("", true);
                    getPositions();
                    cancelEditing();
                })
                .catch((err) => {
                    notify(err.response, false);
                });
        }
    };

    const getPositions = async () => {
        setSpin(true);
        await admin.get(`${url}`).then((res) => {
            setSpin(false);
            setPositions(
                res.data.map((p, index) => {
                    return {
                        key: index + 1,
                        ...p,
                        index: index + 1,
                    };
                })
            );
        });
    };

    useEffect(() => {
        getPositions();
    }, [t , url]);


    return (
        <Row gutter={[10, 10]}>
            <Col xs={24}>
                <div className="border animated fadeInDown p-2 mt-0 bg-white">
                    <UnorderedListOutlined className="f-20 mr5-15" />
                    <span className="f-20 bold">{name}</span>
                </div>
            </Col>
            <Col lg={12} xs={24}>
                <Table
                    loading={spin}
                    size="small"
                    className="bg-white animated fadeInLeft"
                    columns={columns}
                    dataSource={convertColumns(positions, cols)}
                    pagination={{
                        pageSize: 10,
                        current_page: 1,
                        total: positions.length,
                    }}
                />
            </Col>
            <Col lg={12} xs={24}>
                <Card title={t("addTo")} className={"animated fadeInRight"}>
                    <Form layout="vertical" onFinish={savePosition} form={form}>
                        <p className="mb-5">{label}</p>
                        <div className="form-lang">
                            <Form.Item
                                className="mb-5"
                                validateTrigger="onChange"
                                name={`name`}
                                rules={[whiteSpace(t("inputError"))]}
                            >
                                <Input ref={nameInput} />
                            </Form.Item>
                        </div>

                        <div className="flex  flex-between mt-15">
                            <Button onClick={cancelEditing}>{t("cancel")}</Button>
                            <Button htmlType="submit">{t("save")}</Button>
                        </div>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
};


export default connect(null, { notify })(Common);
