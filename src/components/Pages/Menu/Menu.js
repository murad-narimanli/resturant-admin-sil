import React, {useState, useEffect} from "react";
import "@ant-design/compatible/assets/index.css";
import {
    Row,
    Col,
    Button,
    Tooltip,
    Select,
    Card,
    Popconfirm,
} from "antd";
import {
    PicCenterOutlined,
    EyeFilled,
    DeleteFilled,
    EditFilled,
} from "@ant-design/icons";
import admin from "../../../const/api"
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import moment from "moment";
import {connect} from "react-redux";
import {notify} from "../../../redux/actions";
import MenuItem from "../../Elements/MenuItem";
const { Option } = Select;

const {Meta} = Card;

const Menu = (props) => {
    const [spin, setSpin] = useState(true);
    const [gallery, setGallery] = useState([]);
    const {notify} = props;
    let [trigger, setTrigger] = useState(0);
    const [cat , setCat] = useState('')
    const [categories, setCategories] = useState([]);
    
    const getCats = async () => {
        await admin.get(`categories`).then((res) => {
            setCategories(res.data)
            console.log(res.data)
        });
    };


    useEffect(() => {
        getCats();
    } , [])

    const {t} = useTranslation();
    const getData = (e) => {
        setSpin(true);
        admin.get(`menu` , {params:{category_id:e}}).then((res) => {
            res.data && setSpin(false);
            setGallery(
                res.data.map((d, index) => {
                    return {
                        ...d,
                        key: index + 1,
                        index,
                    };
                })
            );
        });
    };

    const deleteItem = async (i) => {
        if (i === 0 || i) {
            await admin
                .delete(`menu/${i}`)
                .then((res) => {
                    setTrigger(++trigger);
                    notify("silindi", true);
                })
                .catch((res) => {
                    notify(res.err, false);
                });
        }
    };

    useEffect(() => {
        getData();
    }, [t, trigger]);

    return (
        <div>
            <Row gutter={[10, 10]}>
                <Col xs={24}>
                    <div className="border flex-between page-heading flex p-2 mt-0 bg-white">
                        <div className="page-name">
                            <PicCenterOutlined className="f-20 mr5-15"/>
                            <span className="f-20 bold">Menu</span>
                        </div>
                        <div>
                            <Link
                                to={{
                                    pathname: `/menu/edit`,
                                }}
                            >
                                <Button type={"primary"}>Add</Button>
                            </Link>
                        </div>
                    </div>

                </Col>

                <Col xs={24}>
                    <Card loading={spin}>
                        <Row gutter={[16, 16]}>
                            {gallery.map((g, i) => (
                                <Col key={i} lg={8} md={12} sm={24}>
                                    <MenuItem
                                        g={g}
                                        spin={spin}
                                        deleteItem={deleteItem}
                                        slider={false}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default connect(null, {notify})(Menu);
