import React from 'react';
import {Spin ,List , Button} from "antd";
import {Link} from "react-router-dom";

function Total({ordersLength, total ,spin,orderProductsLength}) {
    return (
        <div className={'h-100 bg-white text-center p-2'}>
            <Spin spinning={spin}>
                <h2 className={'mb-10 bold'}>Ümumi gəlir</h2>
                <h1 className={'green f-25 line-1 line-clamp'}> {total} azn</h1>
                <List className={'mt-15'} itemLayout="horizontal">
                    <List.Item>
                        <div className="w-100 f-14 flex flex-between">
                            <span>Sifariş sayı</span>
                            <span>{ordersLength}</span>
                        </div>
                    </List.Item>
                    <List.Item>
                        <div className="w-100 f-14 flex flex-between">
                            <span>Sifariş edilən məhsul sayı</span>
                            <span>{orderProductsLength}</span>
                        </div>
                    </List.Item>
                    <List.Item>
                        <div className="w-100 f-14 flex all-center">
                            <Link
                                to={{pathname: `/orders`,}}
                            >
                                <Button className={'mt-15 animated zoomIn'} type={"primary"}>Sifarişlər</Button>
                            </Link>
                        </div>
                    </List.Item>
                </List>
            </Spin>
        </div>
    );
}


export default Total;
