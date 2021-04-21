import { Card, Tabs } from "@shopify/polaris";
import { useState, useCallback } from "react";
import "@shopify/polaris/dist/styles.css";
import Form from "./components/form";
import ListUser from "./components/listUsers";
function App() {
  const [selected, setSelected] = useState(0);
  const handleClick = (value) => {
    setSelected(value);
  };
  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),[]);
  const tabs = [
    {
      id: "create_user",
      content: "Create User",
      panelID: "1",
    },
    {
      id: "listUser",
      content: "List Users",
      panelID: "2",
    },
  ];
  return (
    <div className="main">
      <Card>
        <br></br>
        <div style={{fontSize:"35px",textAlign:"center"}}>
          {selected === 0 && <h6 style={{color:"darkgreen"}}>Create Account</h6>}
          {selected === 1 &&<h6 style={{color:"darkgreen"}}>User List</h6>}
        </div>
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
          <Card.Section>
            {selected === 0 && <Form handleClick={handleClick} />}
            {selected === 1 && <ListUser />}
          </Card.Section>
        </Tabs>
      </Card>
    </div>
  );
}
export default App;
