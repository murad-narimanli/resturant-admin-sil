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
import admin from "../../../const/api"
const { Option } = Select;

function EditMenu(props) {
    const [spin, setSpin] = useState(false);
    let imageUrl = 'https://cdn.discordapp.com/attachments/1090686999427551333/1104320741199069305/7717896.jpeg'
    const [file, setFile] = useState(imageUrl);
    const [categories, setCategories] = useState([]);
    let editing = props.match.params.id;
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const { notify } = props;
    const getPost = async () => {
        await admin.get(`menu/${editing}`).then((res) => {
            let data = res.data
            setFile(res.data.image)
            setSpin(false);
            form.setFieldsValue(data);
        });
    };

    const getCats = async () => {
        await admin.get(`categories`).then((res) => {
            setCategories(res.data)
            console.log(res.data)
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
        getCats();
    } , [])

    const saveItem = async (values) => {
        let obj = {
            ...values,
            category: categories.find(c => c.id === parseInt(values.category_id)).name
        }
        if (!editing) {
            await admin
                .post(`/menu`, obj)
                .then((res) => {
                    notify("", true);
                    form.resetFields();
                    window.history.back();
                    setFile(imageUrl)
                })
                .catch((err) => {
                    notify(err.response, false);
                });
        } else {
            await admin
                .put(`/menu/${editing}`, obj)
                .then((res) => {
                    notify("", true);
                    form.resetFields();
                    window.history.back();
                    setFile(imageUrl)
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
                            <span className="f-20 bold">Menu</span>
                        </div>
                        <Link
                            to={{
                                pathname: `/menu`,
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
                                    <Col xs={4}>
                                        <div className="gallery w-100">
                                            <img className={'mainImg w-100'} src={file} alt=""/>
                                        </div>
                                    </Col>
                                    <Col xs={20}>
                                        <Row gutter={[16,16]}>
                                            <Col md={12} sm={12} xs={24}>
                                                <p className={"mb-10"}>Name</p>
                                                <div className="form-lang">
                                                    <Form.Item
                                                        validateTrigger="onChange"
                                                        name={`name`}
                                                        rules={[noWhitespace(t("inputError"))]}
                                                    >
                                                        <Input className="w-100" />
                                                    </Form.Item>
                                                </div>
                                            </Col>
                                            <Col md={12} sm={12} xs={24}>
                                                <p className={"mb-10"}>Photo (url)</p>
                                                <div className="form-lang">
                                                    <Form.Item
                                                        validateTrigger="onChange"
                                                        name={`image`}
                                                        rules={[noWhitespace(t("inputError"))]}
                                                    >
                                                        <Input onChange={(e)=>{
                                                            console.log(e.target.value) ; setFile(e.target.value)}} className="w-100" />
                                                    </Form.Item>
                                                </div>
                                            </Col>
                                            <Col md={12} sm={12} xs={24}>
                                                <p className={"mb-10"}>Category</p>
                                                <Form.Item
                                                    className="mb-5"
                                                    validateTrigger="onChange"
                                                    name={`category_id`}
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
                                                        {categories.map((c , i)=>(
                                                            <Option key={i}  value={c.id}>
                                                                {c.name}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col md={12} sm={12} xs={24}>
                                                <p className={"mb-10"}>Price (azn)</p>
                                                <div className="form-lang">
                                                    <Form.Item
                                                        validateTrigger="onChange"
                                                        name={`price`}
                                                        rules={[noWhitespace(t("inputError"))]}
                                                    >
                                                        <InputNumber className="w-100" />
                                                    </Form.Item>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>


                                    <Col xs={24}>
                                        <div className={"flex"}>
                                            <Button className={"mr-15"} htmlType="submit">
                                                {t("save")}
                                            </Button>
                                            <Link
                                                to={{
                                                    pathname: `/menu`,
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

export default connect(null, { notify })(EditMenu);

