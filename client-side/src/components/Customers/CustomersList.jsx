import React, { useEffect, useState } from "react";
import customerServices from "../../services/customerServices";

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const resp = await customerServices.handleFetchCustomers();
      console.log("res >> ", resp);
      setCustomers(resp.data);
    } catch (error) {
      console.log("err >> ", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);
  return (
    <div className="padding-x py-12">
      <h1 className="font-semibold text-base mb-6">Customers List</h1>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-xs uppercase bg-red-50">
            <tr>
              <th scope="col" className="px-6 py-4 text-xs">
                Name
              </th>
              <th scope="col" className="px-6 py-4 text-xs">
                Email
              </th>
              <th scope="col" className="px-6 py-4 text-xs">
                Phone No.
              </th>
              <th scope="col" className="px-6 py-4 text-xs">
                Amount
              </th>
              <th scope="col" className="px-6 py-4 text-xs">
                Payment Form URL
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c, index) => {
              return (
                <tr className="bg-white border-b" key={index}>
                  <th scope="row" className="px-6 py-4 text-xs font-normal">
                    {c?.name}
                  </th>
                  <td className="px-6 py-4 text-xs">{c?.email}</td>
                  <td className="px-6 py-4 text-xs">{c?.phone}</td>
                  <td className="px-6 py-4 text-xs">${c?.amount}</td>
                  <td className="px-6 py-4 text-xs">
                    <a href={c?.pageUrl} className="underline">
                      Open Form
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersList;
