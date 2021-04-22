import { Card, Tabs,DisplayText } from "@shopify/polaris";
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
    <div className="userManager"><DisplayText size="extraLarge">My Project</DisplayText></div>
      <Card>
        <br></br>
        <div className="menu">
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
          <Card.Section>
            {selected === 0 && <Form handleClick={handleClick} />}
            {selected === 1 && <ListUser />}
          </Card.Section>
        </Tabs>
        </div>
      </Card>
    </div>
  );
}
export default App;
