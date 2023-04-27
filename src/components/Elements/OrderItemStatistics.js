import React, {useEffect, useState} from 'react';
import {Bar} from "@ant-design/charts";
import { Spin } from 'antd';

function OrderItemStatistics({orders, spin}) {

    let config = {
        data: orders,
        style:{
            height:'230px'
        },
        xField: 'count',
        yField: 'type',
        seriesField: 'type',
        legend: { position: 'top-left' },
        colorField: 'type', // or seriesField in some cases
        color: ({ type }) => {
            if(type === 'Hazırlanır'){
                return '#5fb656';
            }
            if(type === 'Təhvil verildi'){
                return '#0312f3';
            }
            if(type === 'Geri verildi'){
                return '#f30327';
            }
            if(type === 'Ləğv edilmiş'){
                return '#650817';
            }
            return '#14600c';
        },
    };


    return (
        <div className="bg-white p-2">
            <Spin spinning={spin}>
                <h2 className={'mb-15'}>Sifariş edilmiş məhsullar</h2>
                <Bar {...config} />
            </Spin>
        </div>
    );
}


export default OrderItemStatistics;
