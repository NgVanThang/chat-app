import { useState, useRef, useEffect } from 'react';

function ChatPage() {
  const [name, setName] = useState(false);
  const input = useRef();
  const hanldeLogin = () => {
    setName(input.current.value);
  };

  useEffect(() => {}, []);

  return (
    <>
      <h1>ChatPage</h1>
      {!name ? (
        <div>
          <input ref={input} name="name" />
          <button onClick={hanldeLogin}>Đăng nhập</button>
        </div>
      ) : (
        <h1>Xin chào {name}</h1>
      )}
    </>
  );
}

export default ChatPage;
