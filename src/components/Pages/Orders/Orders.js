import React, { useState, useEffect } from "react";
import "@ant-design/compatible/assets/index.css";
import {
    Row,
    Col,
    Table,
    Button,
    Tooltip,
    Spin,
    Popconfirm,
     Select,
} from "antd";
import {
    PicCenterOutlined,
    EyeFilled,
    DeleteFilled,
    CheckCircleOutlined,
    EditFilled, CloseCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";
import admin from "../../../const/api";
import { notify } from "../../../redux/actions";
import { useTranslation } from "react-i18next";
import { convertColumns } from "../../../utils/columnconverter";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const {Option} = Select
function Orders(props) {
    const [postlist, setPostList] = useState([]);
    const [status , setStatus] = useState(undefined)
    const [spin, setSpin] = useState(false);
    const { t } = useTranslation();
    let [trigger, setTrigger] = useState(0);
    const cols = [
        { key: "tableIndex", value: "#", con: true },
        { key: "person", value: "Xidmət edən şəxs", con: true },
        { key: "table", value: "Masa", con: true },
        { key: "total", value: "Ümumi məbləğ", con: false },
        { key: "date", value: "Yaradılma tarixi", con: false },
        { key: "status", value: "Status", con: false },
        { key: "buttons", value: "", con: false },
    ];

    const initialColumns = [
        {
            title: "Waiter",
            dataIndex: "person",
            key: "2",
        },
        {
            title: "Table",
            dataIndex: "table",
            key: "3",
        },
        {
            title: "Create date",
            dataIndex: "date",
            key: "4",
        },
        {
            title: "Total price",
            dataIndex: "total",
            key: "5",
            render: (i) => {
                return  (
                    <span className={i <= 0 ? 'red':'blue'}>{i} azn</span>
                )
            }
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "6",
            render: (i) => {
                return i === 0 ? (
                    <span className="green">New</span>
                ) : i === 1 ? (
                    <span className="blue">Pending</span>
                ) :
                i === 2 ? (
                    <span className="green">Finished</span>
                ):
                i === 3 ? (
                     <span className="red">Canceled</span>
                ):null
            },
        },
        {
            title: "",
            dataIndex: "buttons",
            key: "9",
            render: (i) => {
                return (
                    <div className="flex flex-end">
                        {i.status === 0 &&
                            <Tooltip className="ml-5" title={t("edit")} placement="topRight">
                                <Link
                                    to={{
                                        pathname: `/orders/edit/${i.id}`,
                                    }}
                                >
                                    <Button className="border-none" type="text" shape="circle">
                                        <EditFilled />
                                    </Button>
                                </Link>
                            </Tooltip>
                        }
                        {(i.status === 1) &&
                        <Popconfirm
                            placement="topRight"
                            title={'Are you sure for finish? '}
                            onConfirm={() => changeStatus(i, 2)}
                            okText={t("yes")}
                            cancelText={t("no")}
                        >
                            <Tooltip placement={'bottom'} className="ml-5" title={'Sonlandır'}>
                                <Button className="border-none" type="text" shape="circle">
                                    <CheckCircleOutlined/>
                                </Button>
                            </Tooltip>
                        </Popconfirm>
                        }
                        {(i.status !== 1) &&
                            <Popconfirm
                                placement="topRight"
                                title={t("areYouSure")}
                                onConfirm={() => deletePost(i.id)}
                                okText={t("yes")}
                                cancelText={t("no")}
                            >
                                <Tooltip className="ml-5" title={t("delete")}>
                                    <Button className="border-none" type="text" shape="circle">
                                        <DeleteFilled/>
                                    </Button>
                                </Tooltip>
                            </Popconfirm>
                        }
                        {(i.status !== 3 && i.status !== 2) &&
                        <Popconfirm
                            placement="topRight"
                            title={'Are you sure for cancel? '}
                            onConfirm={() => changeStatus(i, 3)}
                            okText={t("yes")}
                            cancelText={t("no")}
                        >
                            <Tooltip placement={'bottom'} className="ml-5" title={t("cancel")}>
                                <Button className="border-none" type="text" shape="circle">
                                    <CloseCircleOutlined/>
                                </Button>
                            </Tooltip>
                        </Popconfirm>
                        }
                        <Tooltip
                            className="ml-5"
                            title={'Order details'}
                            placement="topRight"
                        >
                            <Link
                                to={{
                                    pathname: `/orders/products/${i.id}`,
                                }}
                            >
                                <Button
                                    className="border-none"
                                    type="text"
                                    shape="circle"
                                >
                                    <EyeFilled />
                                </Button>
                            </Link>
                        </Tooltip>
                    </div>
                );
            },
        },
    ];

    const { notify } = props;


    const changeStatus = (i , status) => {
        let obj ={
            ...i.obj,
            status,
        }
        admin.put(`orders/${i.id}`,  obj).then(()=>{
            setTrigger(++trigger);
        })
    }

    const deletePost = async (i) => {
        if (i === 0 || i) {
            await admin
                .delete(`orders/${i}`)
                .then((res) => {
                    setTrigger(++trigger);
                    notify("silindi", true);
                })
                .catch((res) => {
                    notify(res.err, false);
                });
        }
    };

    const getPostList = () => {
        setSpin(true);
        admin.get(`orders`, { params: { status } }).then((res) => {
            res.data && setSpin(false);
            let news = [];
            let waiting = [];
            let finished = [];
            let canceled = [];
            res.data.reverse().map((d, index) => {
                let obj = {
                    ...d,
                    key: index + 1,
                    index,
                    tableIndex: index + 1,
                    title: d.name,
                    buttons:{
                        obj:d,
                        id:d.id,
                        status:d.status
                    },
                    date: d.date ? moment(d?.date).format("DD-MM-YYYY hh:mm A") : ''
                }
                return (
                    d.status === 0 ? news.push(obj) :
                        d.status === 1 ? waiting.push(obj) :
                            d.status === 2 ? finished.push(obj) :
                                d.status === 3 ? canceled.push(obj) : undefined
               )
            })
            setPostList([...news , ...waiting , ...finished , ...canceled]);
        });
    };

    useEffect(() => {
        getPostList();
    }, [t, trigger , status]);

    return (
        <div>
            <Row gutter={[10, 10]}>
                <Col xs={24}>
                    <div className="border flex-between page-heading flex p-2 mt-0 bg-white">
                        <div className="page-name">
                            <PicCenterOutlined className="f-20 mr5-15" />
                            <span className="f-20 bold">Orders</span>
                        </div>
                        <div>
                            <Link
                                to={{
                                    pathname: `/orders/edit`,
                                }}
                            >
                                <Button type={"primary"}>Add</Button>
                            </Link>
                        </div>
                    </div>

                    {/*<div className="bg-white mt-10 p-1 ">*/}
                        {/*<Select*/}
                        {/*    showSearch*/}
                        {/*    onChange={(e)=>{setStatus(e)}}*/}
                        {/*    placeholder={'Status'}*/}
                        {/*    className={'w-100'}*/}
                        {/*    notFoundContent={null}*/}
                        {/*    optionFilterProp="children"*/}
                        {/*    filterOption={(input, option) =>*/}
                        {/*        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0*/}
                        {/*    }*/}
                        {/*    filterSort={(optionA, optionB) =>*/}
                        {/*        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())*/}
                        {/*    }*/}
                        {/*>*/}
                        {/*    <Option value={undefined}>*/}
                        {/*        Hamısı*/}
                        {/*    </Option>*/}
                        {/*    <Option value={0}>*/}
                        {/*        Yeni (Məhsulsuz)*/}
                        {/*    </Option>*/}
                        {/*    <Option value={1}>*/}
                        {/*        Sonlanmayan*/}
                        {/*    </Option>*/}
                        {/*    <Option value={2}>*/}
                        {/*        Sonlanan*/}
                        {/*    </Option>*/}
                        {/*    <Option value={3}>*/}
                        {/*        Ləğv edilmiş*/}
                        {/*    </Option>*/}
                        {/*</Select>*/}
                    {/*</div>*/}

                </Col>

                <>
                    {spin ? (
                        <Col xs={24}>
                            <div className="flex animated fadeInUp bg-white all-center p-2">
                                <Spin size={"large"} />
                            </div>
                        </Col>
                    ) : (
                        <Col xs={24}>
                            <Table
                                size="small"
                                className="bg-white animated fadeIn"
                                columns={initialColumns}
                                dataSource={convertColumns(postlist, cols)}
                                pagination={{
                                    pageSize: 25,
                                    current_page: 1,
                                }}
                            />
                        </Col>
                    )}
                </>
            </Row>
        </div>
    );
}

export default connect(null, { notify })(Orders);
