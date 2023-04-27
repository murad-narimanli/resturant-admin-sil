import React from 'react';
import {Button, Card, Popconfirm, Tooltip} from "antd";
import {Link} from "react-router-dom";
import {DeleteFilled, EditFilled} from "@ant-design/icons";
import {useTranslation} from "react-i18next";

function MenuItem({spin , g , deleteItem , slider}) {
    const {t} = useTranslation();

    return (
        
        <Card
            className={"animated w-100 zoomIn"}
            hoverable
            cover={
                !spin && (
                    <img  alt="example" src={g.image}/>
                )
            }
            actions={
                !slider && [
                    <Link
                        to={{
                            pathname: `/menu/edit/${g.id}`,
                        }}
                    >
                        <Tooltip
                            placement="bottom"
                            className="ml-5"
                            title={t("edit")}
                        >
                            <Button
                                className="border-none"
                                type="text"
                                shape="circle"
                            >
                                <EditFilled/>
                            </Button>
                        </Tooltip>
                        ,
                    </Link>,
                    <Popconfirm
                        placement="topRight"
                        title={t("areYouSure")}
                        onConfirm={() => deleteItem(g.id)}
                        okText={t("yes")}
                        cancelText={t("no")}
                    >
                        <Tooltip
                            placement="bottom"
                            className="ml-5"
                            title={t("delete")}
                        >
                            <Button
                                className="border-none"
                                type="text"
                                shape="circle"
                            >
                                <DeleteFilled/>
                            </Button>
                        </Tooltip>
                    </Popconfirm>,
                ]
            }
        >
            <strong className={'line-clamp line-1'}>{g.name}</strong>
            <div className="flex mt-10 w-100 flex-between">
                <div className={'line-clamp line-1'}>{g.category}</div>
                <strong className={'line-clamp line-1'}>{g.price} azn</strong>
            </div>
        </Card>
    );
}


export default MenuItem;
