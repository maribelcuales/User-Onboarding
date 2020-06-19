import React, {useState, useEffect} from "react";
import * as yup from "yup";
import axios from "axios";

import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './styles.css';

const formSchema = yup.object().shape({
  name: yup.string().required("name is a required field"),
  email: yup
    .string()
    .email()
    .required("must include an email"),
  password: yup
    .string()
    .min(6)
    .required("password must be at least 6 characters"),
  terms: yup
    .boolean()
    .oneOf([true], "please agree to the Terms of Service")
});

function FormComponent(props) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    terms: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: ""
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [post, setPost] = useState([]);

  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  const validateChange = e => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setErrors({
          ...errors,
          [e.target.name]: ""
        });
      })
      .catch(err => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0]
        });
      });
  };

  const inputChange = e => {
    e.persist();
    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? 
        e.target.checked : e.target.value
    };
    validateChange(e);
    setFormState(newFormData);
  };

  const formSubmit = e => {
    e.preventDefault();
    props.addUser(formState);
    axios
      .post("https://reqres.in/api/users", formState)
      .then(res => {
        setPost(res.data);
        console.log("success", post);

        setFormState({
          name: "",
          email: "",
          password: "",
          terms: ""
        });
      })
      .catch(err => {
        console.log(err.res);
      });
  };

  return (
    <div className="div-container">
      <Form onSubmit={formSubmit}>  
      {/* <form onSubmit={formSubmit}> */}
        <FormGroup row>
          <Label className="form-label" htmlFor="name" sm={2}>  
            Name
          </Label>
          <Col sm={10}>
            <Input
              id="name"
              type="text"
              name="name"
              className="input-name"
              value={formState.name}
              onChange={inputChange}
            />
            {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label htmlFor="email" sm={2}>
            Email
          </Label>
          <Col sm={10}>
            <Input
              id="email"
              type="text"
              name="email"
              className="input-name"
              value={formState.email}
              onChange={inputChange}
            />
            {errors.email.length > 0 ? (<p className="error">{errors.email}</p>) : null}
          </Col>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">
            Password
          </Label>
            <Input
              id="password"
              type="password"
              name="password"
              className="input-name"
              value={formState.password}
              onChange={inputChange}
            />
            {errors.password.length > 6 ? (<p className="error">{errors.password}</p>) : null}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="terms" className="terms">
            <Input
              type="checkbox"
              name="terms"
              checked={formState.terms}
              onChange={inputChange}
            />
            Terms of Service
          </Label>
        </FormGroup>

        <Button color="primary" disabled={buttonDisabled}>
          Submit
        </Button>
      {/* </form> */}
      </Form>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </div>  
  )
};

export default FormComponent;