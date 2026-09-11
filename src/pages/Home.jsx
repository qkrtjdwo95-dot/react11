import { Col, Image, Row } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Home = () => {

    const [rows, setRows] = useState([]);

    // 상태변수
    const handleList = async () => {
        const url = `/api/item/selectlist.json?page=1&text=&cnt=12`;
        const { data } = await axios.get(url);
        console.log(data);
        setRows(data.result);
    }

    useEffect(() => {
        handleList();
    }, []);

    return (
        <div>

            <Row>
                {rows.map((item) => (
                    <Col span={6} key={item._id}>
                        <p>{item.name}</p>
                        <p>{item.price}원</p>
                        <Image width={200} alt="basic" src={item.img} />
                    </Col>
                ))}
            </Row>

        </div>
    );
};

export default Home;