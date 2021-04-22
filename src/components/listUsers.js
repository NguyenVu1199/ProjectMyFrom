import { Card, DataTable, Link, Pagination, Layout } from "@shopify/polaris";
import "@shopify/polaris/dist/styles.css";
import { useEffect, useState } from "react";
const ListUser = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  
  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
    var total = currentPage * 7 + currentItems.length;
    if (total >= data.length) {
      setBtnNext(false);
      setBtnPrev(true);
    } else if (7 < total < data.length) {
      setBtnPrev(true);
      setBtnNext(true);
    } else if (total === 7) {
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
          style={{ fontWeight: "bolder" }}
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
    <Layout>
      <Layout.Section>
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
  );
};
export default ListUser;
