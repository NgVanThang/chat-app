import { useState } from 'react';

function Home() {
  const items = [
    {
      id: 1,
      name: 'Item 1',
    },
    {
      id: 2,
      name: 'Item 2',
    },
    {
      id: 3,
      name: 'Item 3',
    },
  ];
  const [count, setCount] = useState(0);
  const [radioChecked, setRadioChecked] = useState();
  const [checkboxChecked, setCheckboxChecked] = useState([]);

  const fibonacci = (n) => {
    if (n < 2) return n;

    return fibonacci(n - 2) + fibonacci(n - 1);
  };

  const hanldeIncrease = () => {
    setCount(count + 1);
  };

  const handleChangeRadio = (id) => {
    setRadioChecked(id);
  };

  const handleChangeCheckbox = (id) => {
    setCheckboxChecked((prev) => {
      const isChecked = checkboxChecked.includes(id);
      if (isChecked) {
        return checkboxChecked.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  console.log(checkboxChecked);
  return (
    <>
      <div>
        <h1>Thử nghiệm với radio</h1>
        {items.map((radio) => (
          <div key={radio.id}>
            <input type="radio" checked={radio.id === radioChecked} onChange={() => handleChangeRadio(radio.id)} />
            {radio.name}
          </div>
        ))}
      </div>
      <div>
        <h1>Thử nghiệm function fibonacci</h1>
        {fibonacci(3)}
      </div>
      <div>
        <h1>Thử nghiệm với checkbox</h1>
        {items.map((checkbox) => (
          <div key={checkbox.id}>
            <input
              type="checkbox"
              checked={checkboxChecked.includes(checkbox.id)}
              onChange={() => handleChangeCheckbox(checkbox.id)}
            />
            {checkbox.name}
          </div>
        ))}
      </div>
      <div>
        <h1>Thử nghiệm hook useState</h1>
        <button onClick={hanldeIncrease}>{count}</button>
        <h1>Home Page</h1>
      </div>
    </>
  );
}

export default Home;
