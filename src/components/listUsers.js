import { Card, DataTable, Link, Pagination, Layout,DisplayText } from "@shopify/polaris";
import "@shopify/polaris/dist/styles.css";
import { useEffect, useState } from "react";
const ListUser = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
    var total = currentPage * 5 + currentItems.length;
    if (total >= data.length) {
      setBtnNext(false);
      setBtnPrev(true);
    } else if (5 < total < data.length) {
      setBtnPrev(true);
      setBtnNext(true);
    } else if (total === 5) {
      setBtnPrev(false);
      setBtnNext(true);
    }
  };
  
  const onPrevPage = () => {
    setCurrentPage(currentPage - 1);
    if (currentPage === 2) {
      setBtnNext(true);
      setBtnPrev(false);
    } else {
      setBtnNext(true);
    }
  };

  const [btnNext, setBtnNext] = useState(true);
  const [btnPrev, setBtnPrev] = useState(false);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  
  const getData = () =>
    fetch(
      "https://606efb3f0c054f0017658138.mockapi.io/api/listUsers"
    ).then((res) => res.json());
  useEffect(() => {
    getData().then((data) => setData(data));
  }, []);
  const rows = [];
  currentItems.forEach((item) => {
    rows.push([
      item.id,
      item.fullname,
      item.email,
      item.phone,
      <Link removeUnderline key={item.address}>
        <a
          href={`https://www.google.com/maps/place/${item.address
            .split(/[$&+,:;=?@#|'<>.^*()%!-]/)
            .join("+")}`}
          target="_blank"
          rel="noreferrer"
        >
          {item.address}
        </a>
      </Link>,
    ]);
  });
  return (
    <div className="table">
    <Layout>
      <Layout.Section>
      <DisplayText className="create_user" size="medium">User List</DisplayText>
      <br></br>
      <div>
        <Pagination
          label={`${currentPage}/${Math.ceil(data.length / itemsPerPage)}`}
          hasPrevious={btnPrev}
          onPrevious={() => {
            onPrevPage();
          }}
          hasNext={btnNext}
          onNext={() => {
            onNextPage();
          }}
        />
        </div>
        <br />
        <div className="list">
        <Card>
          <DataTable
            columnContentTypes={["text", "text", "text", "text", "text"]}
            headings={["STT", "Full Name", "Email", "Phone", "Address"]}
            rows={rows}
          />
        </Card>
        </div>
        <br />
        <br />
      </Layout.Section>
    </Layout>
    </div>
  );
};
export default ListUser;

