import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const Board1 = () => {

    const navigate = useNavigate();

    const [rows, setRows] = useState([]);
    const [total, setTotal] = useState(0);

    const [page, setPage] = useState(1);
    const [text, setText] = useState("");
    const [cnt, setCnt] = useState(10);

    // 게시글 목록 조회
    const boardList = async () => {
        try {
            const url =
                `/api/board/select.json?page=${page}&text=${text}&cnt=${cnt}`;

            const { data } = await axios.get(url);

            console.log(data);

            if (data.status === 200) {
                setRows(data.rows);
                setTotal(data.total);
            }
        }
        catch (err) {
            console.error(err);
        }
    };

    // page, text, cnt가 변경되면 다시 조회
    useEffect(() => {
        boardList();
    }, [page, text, cnt]);


    // 검색
    const handleSearch = () => {
        setPage(1);
    };


    const handleTitleClick = (id) => {
        navigate(`/board1/detail?id=${id}`);
    };

    // 테이블 컬럼
    const columns = [
        {
            title: '번호',
            key: 'no',
            width: 80,
            align: 'center',
            render: (_, record, index) => {
                return total - ((page - 1) * cnt + index);
            }
        },
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
            width: 150,
            align: 'center',
        },
        {
            title: '제목',
            dataIndex: 'title',
            key: 'title',
            render: (title, record) => (
                <span
                    onClick={() => handleTitleClick(record._id)}
                    style={{
                        cursor: 'pointer',
                        color: '#1677ff',
                    }}
                >
                    {title}
                </span>
            ),
        },
        {
            title: '작성자',
            dataIndex: 'writer',
            key: 'writer',
        },
        {
            title: '조회수',
            dataIndex: 'hit',
            key: 'hit',
        },
        {
            title: '날짜',
            dataIndex: 'regdate2',
            key: 'regdate2',
        },
    ];


    return (
        <div style={{ padding: '20px' }}>

            <h2>게시판</h2>

            {/* 검색 */}
            <Space style={{ marginBottom: 20 }}>

                <Input
                    placeholder="제목을 검색하세요"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onPressEnter={handleSearch}
                    style={{ width: 300 }}
                />

                <Button
                    type="primary"
                    onClick={handleSearch}
                >
                    검색
                </Button>

            </Space>


            {/* 게시판 */}
            <Table
                columns={columns}
                dataSource={rows}
                rowKey="_id"

                pagination={{
                    current: page,
                    pageSize: cnt,
                    total: total,

                    showSizeChanger: true,

                    pageSizeOptions: ['5', '10', '20', '50'],

                    showTotal: (total) =>
                        `전체 ${total}개`,

                    onChange: (newPage, newPageSize) => {
                        setPage(newPage);
                        setCnt(newPageSize);
                    }
                }}
            />

        </div>
    );
};

export default Board1;