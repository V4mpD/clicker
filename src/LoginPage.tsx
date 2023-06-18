import { FC, useState, ChangeEvent, SyntheticEvent} from "react";
import Layout from "./Layout";
import { useAppDispatch } from "./store";
import { userLogin } from "./store/slices/authSlice";

const LoginPage: FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.currentTarget.value);
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.currentTarget.value);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault(); 
    dispatch(userLogin({email,password}));
  };

  return (
    <Layout>
      <>
        <h3 style={{ paddingTop: 200 }}>Login</h3>
        <div className="login-wrapper">
          <form className="user-form">
            <div className="user-form__group">
              <label className="user-form__label" htmlFor="email">
                Email
              </label>
              <input
                className="user-form__input"
                type="email"
                id="email"
                value={email}
                onChange={handleEmail}
                required
              />
            </div>
            <div className="user-form__group">
              <label className="user-form__label" htmlFor="password">
                Password
              </label>
              <input
                className="user-form__input"
                type="password"
                id="password"
                value={password}
                onChange={handlePassword}
                required
              />
            </div>
            <button
              className="user-form__action"
              type="submit"
              onClick={onSubmit}
            >
              Continue
            </button>
          </form>
        </div>
      </>
    </Layout>
  );
};

export default LoginPage;
