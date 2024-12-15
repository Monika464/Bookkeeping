import React, { ChangeEvent, FormEvent, useState } from "react";
import "./login.css";
import { useSignup } from "../../hooks/useSignup";
import { useLanguage } from "../../context/LanguageContext.tsx";
import translations from "./signup-translations.ts";

export interface IApplicationProps {}
//interface URL {}

const Signup: React.FunctionComponent<IApplicationProps> = () => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage as "en" | "pl"];

  const { error, isPending, signup } = useSignup();

  const defaultFormFields = {
    email: "",
    password: "",
  };

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  // const logout=()=> {
  //   navigate('/login');
  //     return signOut(auth);
  //     }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //setError('');

    // Usunięcie spacji z emaila i hasła
    const cleanedEmail = email.trim();
    const cleanedPassword = password.trim();
    signup(cleanedEmail, cleanedPassword);
  };

  return (
    <div id="main" className="login-form">
      <div className="title">{t.signup}</div>
      <br />

      <div id="fields"></div>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
          required
        />

        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder={t.password}
          required
        />

        {/*<input id='recaptcha' type="submit" />*/}
        <br />
        <button className="btn" disabled={isPending}>
          {t.loginin}
        </button>
      </form>

      {/* <p>Google</p>
            <button onClick={signInWithGoogle} disabled={authing}>signInWithGoogle</button>
        */}

      {/* <button onClick={logout}>logout</button> */}
      {/* {error && <p>{error.toString()}</p>} */}
      {error && <p>{error.toString().split("Firebase: ")[1]}</p>}
    </div>
  );
};

export default Signup;
