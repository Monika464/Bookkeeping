import React, { ChangeEvent, FormEvent, useState } from "react";
import "./login.css";
//import {   signInWithEmailAndPassword} from 'firebase/auth';
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { useLanguage } from "../../context/LanguageContext.tsx";
import translations from "./login-translations.ts";

export interface ILoginProps {}

const Login: React.FunctionComponent<ILoginProps> = () => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage as "en" | "pl"];

  //const [authing, setIsAuthing] = useState(false)

  const { error, isPending, login } = useLogin();

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //setError('');

    // Usunięcie spacji z emaila i hasła
    const cleanedEmail = email.trim();
    const cleanedPassword = password.trim();

    login(cleanedEmail, cleanedPassword);
  };
  // const resetFormFields = () => {
  //   return (
  //     setFormFields(defaultFormFields)
  //   );
  // }

  return (
    <div id="main" className="login-form">
      <div className="title">{t.login}</div>
      <div id="fields">
        <br />
      </div>
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
          {t.loginin}{" "}
        </button>
      </form>
      {/* <ForgotPass/> */}
      <Link to={"/forgotpass"} style={{ fontSize: "small" }}>
        {t.forgotpass}
      </Link>
      <br></br> <br></br>
      {error && <p>{error.toString().split("Firebase: ")[1]}</p>}
      {/* {error && typeof error === 'object' && <p>{error.toString().split('Firebase: ')[1]}</p>} */}
    </div>
  );
};

export default Login;
