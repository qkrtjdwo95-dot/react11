import mqtt from 'mqtt';
import React, { useEffect, useState } from 'react';


const Chat = () => {

    // push서버의 주소
    const BROKER_URL = 'ws://ihongss.com:31884';

    const CONNECT_OPTIONS = {
        username: 'aaa', // 서버접속 아이디
        password: 'bbb', // 서버접속 암호
        clientId: `cid_18_${Math.random()}` // 클라이언트아이디
    }

    const RECV_TOPIC = "pknu/class303/#";
    const SEND_TOPIC = "pknu/class303/uid_18";

    // 상태변수
    const [status, setStatus] = useState("연결 중..."); // 서버연결상태를 표시
    const [client, setClient] = useState(null);        // 서버연결객체 
    const [messages, setMessages] = useState([]);      // 받은메시지를 보관할 배열(여러개)
    const [input, setInput] = useState('');            // 보낼메시지 보관


    const handleSend = (e) => {
        // 폼의 기본기능 중지
        e.preventDefault();

        // publish( 토픽, 보낼메시지)
        client.publish(SEND_TOPIC, input);
    }

    // 이펙트
    useEffect(() => {
        const mqttClient = mqtt.connect(BROKER_URL, CONNECT_OPTIONS);
        // 접속에 성공했다면
        mqttClient.on('connect', () => {
            setStatus('연결 성공');
            mqttClient.subscribe(RECV_TOPIC);
        });

        mqttClient.on('error', (err) => {
            setStatus('연결 실패', err);
        });

        mqttClient.on('message', (topic, payload) => {
            console.log(topic, payload.toString());
            const msg = { "topic": topic, "text": payload.toString() };
            // messages가 배열인데 [  { 최신메시지가 앞에 }, {  }, {  } ]
            setMessages((prev) => [msg, ...prev]);
        });

        // 이펙트에서 접속한 객체를 다른 함수에서 사용하기 위해서 상태변수에 넣음
        setClient(mqttClient);

        // 화면종료될때 서버 연결 닫기
        return () => {
            mqttClient.end();
        }
    }, []);

    return (
        <div>
            <p>상태 : {status}</p>

            <form onSubmit={handleSend}>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                <button type="submit">메시지보내기</button>
            </form>
            <hr />
            <div>
                {
                    messages.length === 0 ? (
                        <p>메시지가 없습니다.</p>
                    ) : (
                        messages.map((item, idx) => (
                            <div key={idx}>
                                <p>{item.topic} : {item.text}</p>
                            </div>    
                        ))
                    )
                }
            </div>
        </div>
    );
};

export default Chat;