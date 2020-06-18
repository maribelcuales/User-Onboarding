import React, {useState, useEffect} from "react";
import * as yup from "yup";
import axios from "axios";

import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

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
    <div>
      <Form onSubmit={formSubmit}>  
      {/* <form onSubmit={formSubmit}> */}
        <label htmlFor="name">
          Name
          <input
            id="name"
            type="text"
            name="name"
            value={formState.name}
            onChange={inputChange}
          />
          {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
        </label>
        <label htmlFor="email">
          Email
          <input
            id="email"
            type="text"
            name="email"
            value={formState.email}
            onChange={inputChange}
          />
          {errors.email.length > 0 ? (<p className="error">{errors.email}</p>) : null}
        </label>
        <label htmlFor="password">
          Password
          <input
            id="password"
            type="password"
            name="password"
            value={formState.password}
            onChange={inputChange}
          />
          {errors.password.length > 6 ? (<p className="error">{errors.password}</p>) : null}
        </label>
        <label htmlFor="terms" className="terms">
          <input
            type="checkbox"
            name="terms"
            checked={formState.terms}
            onChange={inputChange}
          />
          Terms of Service
        </label>
        <button disabled={buttonDisabled}>
          Submit
        </button>
      {/* </form> */}
      </Form>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </div>  
  )
};

export default FormComponent;