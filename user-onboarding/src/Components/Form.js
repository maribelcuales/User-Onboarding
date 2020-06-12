import React, {useState} from "react";

function Form() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    terms: ""
  })

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
    </form>
    
  )
};

export default Form;