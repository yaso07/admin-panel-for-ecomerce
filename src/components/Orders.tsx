import { useNavigation } from "react-router";
import styled from "styled-components";
import Loading from "./Loading";


const Container = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  align-items: center;
  height: 200px;
  box-sizing: border-box;
`;

const OrderContainer = styled.section`
  box-sizing: border-box;
  border-radius: 10px;
  margin: 20px;
  padding: 10px;
`;
const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
  color: gray;
  font-weight: normal;
`;
const TableData = styled.td`
  padding: 10px;
`;
const Orders = () => {

  const orders = [
    {
      name: "Pot",
      quantity: 2,
      cost: "$1099",
      status: "Pending",
    },
    {
      name: "Teapot",
      quantity: 1,
      cost: "$259",
      status: "Shipped",
    },
    {
      name: "Home Decor",
      quantity: 3,
      cost: "$1232",
      status: "Processing",
    },
  ];

  const navigation=useNavigation();

  return (
    <main className="w-full">
      {navigation.state == "loading" && <Loading></Loading>}
      <Container>
        <div>
          <div>
            <p className="text-3xl px-6">Orders</p>
          </div>
        </div>
      </Container>
      <OrderContainer className="border border-gray-300">
        <table className="w-full border border-seperate border-spacing-4">
          <thead>
            <tr>
              <TableHeader className="">Name</TableHeader>
              <TableHeader>Stock</TableHeader>
              <TableHeader>Price</TableHeader>
              <TableHeader>status</TableHeader>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <>
                  <tr className="border border-gray-200">
                    <TableData>{order.name}</TableData>
                    <TableData>{order.quantity}</TableData>
                    <TableData>{order.cost}</TableData>
                    <TableData>{order.status}</TableData>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </OrderContainer>
    </main>
  );
}

export default Orders