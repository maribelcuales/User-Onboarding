import React, {useState, useEffect} from "react";
import * as yup from "yup";

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

function Form() {
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

  return (
    // Name
    // Email
    // Password
    // Terms of Service (checkbox)
    // A Submit button to send our form data to the server
    <form>
      <label htmlFor="name">
        Name
        <input
          id="name"
          type="text"
          name="name"
          value={formState.name}
          onChange={inputChange}
        />
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
    </form>
    
  )
};

export default Form;