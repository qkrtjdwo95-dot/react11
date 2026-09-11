import React, { useEffect, useState } from 'react';
import { Pagination, Table } from 'antd';
import axios from 'axios';
const ItemList = () => {


    // 0. 상수
    const columns = [
        {
            title: '번호',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: '물품명',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '가격',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '내용',
            dataIndex: 'content',
            key: 'content',
        },
        {
            title: '수량',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: '등록일',
            dataIndex: 'regdate1',
            key: 'regdate1',
        },
        {
            title: '이미지',
            render: (e) => {
                return (
                    <img src={e.img} style={{ width: '50px'}} />
                )
            }
        }
    ];

    // 1. 상태변수;
    const [rows, setRows] = useState([]);

    const [page, setPage] = useState(1);
    const [text, setText] = useState("");
    const [cnt, setCnt] = useState(10);
    const [total, setTotal] = useState(0);

    // 2. 함수
    const handleList = async() => {
        const url = `/api/item/selectlist.json?page=${page}&text=${text}&cnt=${12}` ;
        const{data} = await axios.get(url);
        console.log(data);
        setRows(data.result);
        setTotal(data.total);


    }

    const handleChange = (page, pageSize) => {
        setPage(page);
        setCnt(pageSize);
        }

    //3. 이펙트 
    useEffect(() =>{
        handleList();

    }, [page, text, cnt]);


    return (
        <div>
            <h3>물품목록</h3>
            <Table dataSource={rows} columns={columns} rowKey={"_id"} pagination={false} size={"small"}/>;
            <Pagination current = {page} total={total} onChange={handleChange} />
        </div>
    );
};

export default ItemList;