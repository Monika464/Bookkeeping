import React from "react";
import { SetStateAction, useState } from "react";
//import { resetPassForEmail } from "../../App";
import "./login.css";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export interface IForgotPassProps {}

const ForgotPass: React.FunctionComponent<IForgotPassProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [isSend, setIsSend] = useState(false);
  //const [isError, setIsError] = useState('');

  const handleSendPass = () => {
    if (email) {
      resetPassForEmail(email);
    }
  };
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    handleSendPass();
    console.log("email wysłano");
    setIsSend(true);
    // navigate('/login')
  };

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setIsSend(false);
    setEmail(event.target.value);
  };

  const sendCustomPasswordResetEmail = (email: string) => {
    // Tutaj możesz umieścić własną logikę wysyłania e-maila resetującego, np. za pomocą usługi SMTP
    console.log(`Wysłano e-mail resetujący na adres: ${email}`);
    // W rzeczywistej aplikacji powinieneś użyć odpowiedniej usługi lub API do wysyłania e-maili
  };

  const resetPassForEmail = (email: string) => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        return sendCustomPasswordResetEmail(email);
      })
      .then(() => {
        console.log("wyslano hasło na email");
      })
      .catch((error) => {
        console.error("Błąd podczas resetowania hasła:", error.message);
        // Tutaj możesz obsłużyć błędy związane z wysyłaniem e-maila resetującego
      });
  };
  return (
    <div>
      <div id="main" className="login-form">
        <div className="title">Podaj email na jaki wysłać hasło</div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <br></br>
          <button className="btn">wyslij</button>
        </form>

        {isSend && (
          <div>
            <p>wysłano link do zmiany hasła na podany email</p>
            <Link to={"../login"} style={{ fontSize: "small" }}>
              Przejdź do logowania
            </Link>
          </div>
        )}
        {/* {isError &&<p>{isError.toString()}</p>} */}
      </div>
    </div>
  );
};

export default ForgotPass;
