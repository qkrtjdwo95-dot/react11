import React, { useState } from 'react';

// 현재파일기준으로 한단계위로 assets 폴더 아래에 있는 noimage.jpg 
import noimage from '../assets/noimage.jpg'
import axios from 'axios';

const ItemInsert = () => {

    //1. 상태변수를 5개 만드세요.
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [content, setContent] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [image, setImage] = useState(null);
    const [imageurl, setImageurl] = useState(noimage);

    // 함수
    const handleChange = (e) => {
        // 첨부한 파일 정보를 가져와서 file에 보관하기
        const file = e.target.files[0];
        console.log(file);

        // img src에 표시될 수 있도록 url형태로 변환하기
        setImageurl(URL.createObjectURL(file));
        setImage(file);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = `/api/item/insert.json`;
        const headers = { "Content-Type": "multipart/form-data" };
        const body = new FormData();
        body.append("name", name);
        body.append("price", price);
        body.append("content", content);
        body.append("quantity", quantity);
        body.append("image", image);

        const { data } = await axios.post(url, body, { headers: headers });
        console.log(data);
    }

    return (
        <div>
            <h3>물품등록</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='물품명' />
                </div>
                <div>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='가격' />
                </div>
                <div>
                    <input type="text" value={content} onChange={(e) => setContent(e.target.value)} placeholder='내용' />
                </div>
                <div>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder='수량' />
                </div>
                <div>
                    <img src={imageurl} alt="noimage" style={{ width: '80px' }} />
                    <input type="file" onChange={handleChange} />
                </div>
                <div>
                    <button type="submit">물품등록</button>
                </div>
            </form>
        </div>
    );
};

export default ItemInsert;