import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useWindowWidth from "../../hooks/useWindowWidth";
import backgroundImg from "../../assets/undraw_authentication_re_svpt.svg";
import styles from "./login.module.scss";
import * as Icon from "../../components/Icons/index";
import Button from "../../components/Button";
import buttonStyles from "../../components/Button/button.module.scss";
import { colourBorder } from "../../utils/colourBorder";
import { narrowScreen, wideScreen } from "../../utils/constants/screenWidth";

interface userData {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup
      .string()
      .matches(
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please enter a valid email address"
      )
      .required("Please enter your company's email address"),
    password: yup.string().required("Please enter your password"),
  })
  .required();

export default function Registration(): JSX.Element {
  const { Email, Password } = Icon;
  const { width } = useWindowWidth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [password, setPassword] = useState<string>("");
  const [isOnFocus, setIsOnFocus] = useState<{ [key: string]: boolean }>({
    email: false,
    password: false,
  });

  useEffect(() => {
    document.title = "EnviroGraphix · Log in";
  }, []);

  function onFormSubmit(data: userData) {
    console.log(data);
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {width >= wideScreen && (
          <div className={styles.backgroundImage}>
            <img src={backgroundImg} alt="" className={styles.img} />
          </div>
        )}
        <div className={styles.formContainer}>
          <h1 className={styles.heading}>Company Login</h1>
          <p className={styles.subHeading}>
            Don't you have an account? <a href="/login">Sign up free</a>
          </p>
          <form onSubmit={handleSubmit(onFormSubmit)} className={styles.form}>
            <div
              className={`${styles.inputGroupBox} ${
                isOnFocus["email"] ? styles.isOnFocus : styles.isNotOnFocus
              }`}
            >
              <label htmlFor="email">Email</label>
              <div className={styles.inputGroup}>
                {width >= narrowScreen && (
                  <div className={styles.icon}>
                    <Email />
                  </div>
                )}
                <input
                  {...register("email")}
                  className={styles.input}
                  placeholder="Enter your email"
                  onFocus={() => colourBorder("email", setIsOnFocus)}
                />
              </div>
            </div>
            <p className={styles.errorMessage}>{errors.email?.message}</p>
            <div
              className={`${styles.inputGroupBox} ${
                isOnFocus["password"] ? styles.isOnFocus : styles.isNotOnFocus
              }`}
            >
              <label htmlFor="password">Password</label>
              <div className={styles.inputGroup}>
                {width >= narrowScreen && (
                  <div className={styles.icon}>
                    <Password />
                  </div>
                )}
                <input
                  {...register("password")}
                  type="password"
                  className={styles.input}
                  placeholder="Enter your password"
                  onChange={(e) => {
                    setPassword(e.currentTarget.value);
                  }}
                  onFocus={() => colourBorder("password", setIsOnFocus)}
                />
              </div>
            </div>
            <p className={styles.errorMessage}>{errors.password?.message}</p>
            <div className={styles.buttonContainer}>
              <Button
                type="submit"
                customStyles={buttonStyles.primaryButton}
                text="Log in"
              />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}