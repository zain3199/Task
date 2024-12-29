import React, { useState } from "react";

const Calculator = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState(null);

  const handleCompute = async () => {
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    if (isNaN(number1) || isNaN(number2)) {
      setResult("Please enter valid numbers");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/compute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          num1: number1,
          num2: number2,
          operation,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.result);
      } else {
        setResult(data.error);
      }
    } catch (error) {
      setResult("Error occurred while computing");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-1 bg-gradient-to-r from-black to-blue-500 rounded-lg shadow-xl">
      <div className="p-6 bg-white rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Calculator
        </h1>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            placeholder="First Number"
            className="w-full p-2 rounded-md text-white bg-gradient-to-r from-black to-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            placeholder="Second Number"
            className="w-full p-2 rounded-md text-white bg-gradient-to-r from-black to-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="w-full p-2 rounded-md text-white bg-gradient-to-r from-black to-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="add" className="text-black">
              Add
            </option>
            <option value="subtract" className="text-black">
              Subtract
            </option>
            <option value="multiply" className="text-black">
              Multiply
            </option>
          </select>
        </div>

        <div className="text-center mb-4">
          <button
            onClick={handleCompute}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Compute
          </button>
        </div>

        {result !== null && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Result: {result}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;
