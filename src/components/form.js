import { useState, useCallback } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import callApi from "./../callApi/callApi";
import {
  TextField,
  FormLayout,
  Button,
  InlineError,
  Card,
  Layout,
  DisplayText,
} from "@shopify/polaris";
const Form = (props) => {
  const [valueName, setName] = useState("");
  const [valueAdd, setAdd] = useState("");
  const [valueEmail, setEmail] = useState("");
  const [valuePhone, setPhone] = useState("");

  const [nameValid, setNameValid] = useState(false);
  const [addValid, setAddValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);

  const [errorNameEmpty, setErrorNameEmpty] = useState(false);
  const [errorPhoneEmpty, setErrorPhoneEmpty] = useState(false);
  const [errorAddEmpty, setErrorAddEmpty] = useState(false);
  const [errorEmailEmpty, setErrorEmailEmpty] = useState(false);

  const [errorNameType, setErrorNameType] = useState(false);
  const [errorPhoneType, setErrorPhoneType] = useState(false);
  const [errorAddType, setErrorAddType] = useState(false);
  const [errorEmailType, setErrorEmailType] = useState(false);

  const [reacapcha, setRecapcha] = useState(false);

  //change input fullname
  const onChangeName = useCallback((value) => {
    setName(value);
    if (value === "" || value == null) {
      setErrorNameEmpty(true);
      setErrorNameType(false);
      setNameValid(false);
    } else if (value.length < 5) {
      setErrorNameType(true);
      setErrorNameEmpty(false);
      setNameValid(false);
    } else {
      console.log(value);
      setNameValid(true);
      setErrorNameEmpty(false);
      setErrorNameType(false);
    }
  }, []);

  //change input Address
  const onChangeAdd = useCallback((value) => {
    setAdd(value);
    if (value === "" || value == null) {
      setErrorAddEmpty(true);
      setErrorAddType(false);
      setAddValid(false);
    } else if (value.length < 5) {
      setErrorAddType(true);
      setErrorAddEmpty(false);
      setAddValid(false);
    } else {
      setErrorAddEmpty(false);
      setErrorAddType(false);
      setAddValid(true);
    }
  }, []);

  //change input phone
  const onChangePhone = useCallback((value) => {
    setPhone(value);
    const regex = /(84|0[2|3|5|7|8|9])+([0-9]{8})\b/g;
    setPhone(value);
    if (value === "" || value === null) {
      setErrorPhoneEmpty(true);
      setErrorPhoneType(false);
      setPhoneValid(false);
    } else if (!regex.test(value)) {
      setErrorPhoneEmpty(false);
      setErrorPhoneType(true);
      setPhoneValid(false);
      console.log("FailType");
    } else {
      setErrorPhoneEmpty(false);
      setErrorPhoneType(false);
      setPhoneValid(true);
    }
  }, []);

  //change input email
  const onChangeEmail = useCallback((value) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setEmail(value);
    if (value === "") {
      setErrorEmailEmpty(true);
      setEmailValid(false);
      setErrorEmailType(false);
      console.log("null");
    } else if (!re.test(value)) {
      setErrorEmailEmpty(false);
      setErrorEmailType(true);
      setEmailValid(false);
      console.log("FailType");
    } else {
      setErrorEmailEmpty(false);
      setErrorEmailType(false);
      setEmailValid(true);
      console.log("oke");
    }
  }, []);
  //Process POST data
  const onSaveNewUser = async () => {
    await callApi(
      "listUsers",
      "POST",
      {
        fullname: valueName,
        phone: valuePhone,
        email: valueEmail,
        address: valueAdd,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).catch((error) => {
      console.log("axios error:", error);
    });
    setRecapcha(false);
    alert("Create Account Successfully!");
    props.handleClick(1);
  };

  //show reCAPCHA
  const handleSubmit = (e) => {
    setRecapcha(true);
    e.preventDefault();
  };
  //Save Data
  const onRecapcha = () => {
    onSaveNewUser();
  };

  return (
    <div className="form">
      <DisplayText size="small">Please enter full information!</DisplayText>
      <br />
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <FormLayout style={{ width: "100%" }}>
              <TextField
                label="Full Name(*)"
                onChange={(e) => onChangeName(e)}
                value={valueName}
                placeholder="Enter your full name"
              />
              {errorNameEmpty && (
                <InlineError message="Input fullname not Empty!" />
              )}
              {errorNameType && (
                <InlineError message="Input fullname isvalid!" />
              )}
              <TextField
                label="Phone(*)"
                onChange={(e) => onChangePhone(e)}
                value={valuePhone}
                placeholder="Enter your phone"
              />
              {errorPhoneEmpty && (
                <InlineError message="Input phone not Empty!" />
              )}
              {errorPhoneType && <InlineError message="Input isvalid!" />}
              <TextField
                label="Email(*)"
                onChange={(e) => onChangeEmail(e)}
                value={valueEmail}
                placeholder="Enter your email"
              />
              {errorEmailEmpty && (
                <InlineError message="Input email not Empty!" />
              )}
              {errorEmailType && <InlineError message="Input mail isvalid!" />}
              <TextField
                label="Address(*)"
                onChange={(e) => onChangeAdd(e)}
                value={valueAdd}
                placeholder="Enter your Address"
              />
              <></>
              {errorAddEmpty && (
                <InlineError message="Input address not Empty!" />
              )}
              {errorAddType && <InlineError message="Input address isvalid!" />}
              {addValid && emailValid && phoneValid && nameValid && (
                <Button onClick={handleSubmit} primary>
                  Submit
                </Button>
              )}
              {reacapcha && (
                <ReCAPTCHA
                  sitekey="6LelZAsTAAAAAAv1ADYDnq8AzbmPmbMvjh-xhfgB"
                  onChange={onRecapcha}
                />
              )}
            </FormLayout>
          </Card>
        </Layout.Section>
      </Layout>
    </div>
  );
};
export default Form;
