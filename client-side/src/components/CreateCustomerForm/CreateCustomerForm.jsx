import React, { useState } from "react";
import customerServices from "../../services/customerServices";

const CreateCustomerForm = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
    amount: "",
  });

  const handleChange = (e) => {
    setData((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await customerServices.handleCreateCustomer(data);
      console.log("res >> ", res);
    } catch (error) {
      console.log("err >> ", error);
    }
  };
  return (
    <div className="padding-x flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-1/2 lg:w-1/3 border rounded-lg p-10 flex flex-col gap-5"
      >
        <h1 className="font-semibold text-xl text-center">Create Customer</h1>

        <div className="">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            className="border rounded-lg p-3 text-sm outline-none w-full"
          />
        </div>
        <div className="">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            type="text"
            name="email"
            value={data.email}
            onChange={handleChange}
            className="border rounded-lg p-3 text-sm outline-none w-full"
          />
        </div>
        <div className="">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            className="border rounded-lg p-3 text-sm outline-none w-full"
          />
        </div>
        <div className="">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={data.description}
            onChange={handleChange}
            className="border rounded-lg p-3 text-sm outline-none w-full"
          />
        </div>
        <div className="">
          <label htmlFor="amount" className="text-sm font-medium">
            Amount
          </label>
          <input
            type="text"
            name="amount"
            value={data.amount}
            onChange={handleChange}
            className="border rounded-lg p-3 text-sm outline-none w-full"
          />
        </div>
        <div className="">
          <button
            type="submit"
            className="bg-red-500 text-white py-3 rounded-lg text-sm font-medium w-full"
          >
            Create Customer
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCustomerForm;
