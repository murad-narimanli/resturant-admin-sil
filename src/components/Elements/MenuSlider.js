import React, {useEffect, useState} from 'react';
import Slider from "react-slick";
import {PicCenterOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {Button, Col} from "antd";
import admin from "../../const/api";
import MenuItem from "./MenuItem";

function MenuSlider(props) {
    const [spin, setSpin] = useState(true);
    const [gallery, setGallery] = useState([]);

    const getData = (e) => {
        setSpin(true);
        admin.get(`menu`).then((res) => {
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

    useEffect(()=>{
        getData()
    },[])

    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay:true,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
    };

    return (
        <div className="">
            <div className="border flex-between page-heading flex p-2 mt-0 bg-white">
                <div className="page-name">
                    <PicCenterOutlined className="f-20 mr5-15" />
                    <span className="f-20 bold">Menyu</span>
                </div>
                <div>
                    <Link
                        to={{
                            pathname: `/menu`,
                        }}
                    >
                        <Button className={'mr-15 animated zoomIn'} type={"primary"}>Ətraflı</Button>
                    </Link>
                </div>
            </div>
           <div className="w-100">
               <Slider  {...settings}>
                   {gallery.map((g, i) => (
                       <div className={'p-1 mt-10 bg-white'}>
                           <MenuItem
                               key={i}
                               g={g}
                               spin={spin}
                               slider={true}
                           />
                       </div>
                   ))}
               </Slider>
           </div>

        </div>
    );
}

export default MenuSlider;
