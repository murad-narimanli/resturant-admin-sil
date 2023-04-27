import React, {useEffect, useState} from 'react';
import {Column} from "@ant-design/charts";
import { Spin } from 'antd';

function OrderStatistics({orders, spin}) {
    let config = {
        data: orders,
        xField: 'type',
        yField: 'count',
        colorField: 'type', // or seriesField in some cases
        style:{
            height:'230px'
        },
        label: {
            position: 'middle',
            style: {
                fill: '#FFFFFF',
            },
        },
        color: ({ type }) => {
            if(type === 'Yeni sifariş'){
                return '#5fb656';
            }
            if(type === 'Sonlanmayan'){
                return '#0312f3';
            }
            if(type === 'Sonlanan'){
                return '#f30327';
            }
            if(type === 'Ləğv edilmiş'){
                return '#650817';
            }
            return '#14600c';
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: { alias: 'Say' },
            sales: { alias: 'Say' },
        },
        legend:true
    };


    return (
        <div className="bg-white p-2">
            <Spin spinning={spin}>
              <h2 className={'mb-15'}>Sifarişlər</h2>
              <Column  {...config} />
            </Spin>
        </div>
    );
}

export default OrderStatistics;
