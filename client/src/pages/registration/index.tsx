import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import useWindowWidth from "../../hooks/useWindowWidth";
import backgroundImg from "../../assets/undraw_mobile_content_xvgr.svg";
import styles from "./registration.module.scss";
import * as Icon from "../../components/Icons/index";
import Button from "../../components/Button";
import buttonStyles from "../../components/Button/button.module.scss";
import { colourBorder } from "../../utils/colourBorder";
import { narrowScreen, wideScreen } from "../../utils/constants/screenWidth";
import { baseUrl } from "../../utils/constants/apiUrl";
import Toast from "../../components/Toast";

interface userData {
  company: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const schema = yup
  .object({
    company: yup.string().required("Please enter your company's name"),
    email: yup
      .string()
      .matches(
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please enter a valid email address"
      )
      .required("Please enter your company's email address"),
    password: yup
      .string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#/=()?!@$%^&*-]).{8,}$/
      )
      .min(8)
      .required(),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Password confirmation is required"),
  })
  .required();

export default function Registration(): JSX.Element {
  const { Company, Email, Password } = Icon;
  const { width } = useWindowWidth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [password, setPassword] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<{ [key: string]: boolean }>({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
    specialCharacter: false,
  });
  const [isOnFocus, setIsOnFocus] = useState<{ [key: string]: boolean }>({
    company: false,
    email: false,
    password: false,
    repeatPassword: false,
  });
  const [feedback, setFeedback] = useState({
    title: "",
    message: "",
    type: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "EnviroGraphix · Sign up";
  }, []);

  function onFormSubmit(data: userData) {
    registerUser(data);
  }

  async function registerUser(data: userData) {
    try {
      const response = await fetch(`${baseUrl}company`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (!response.ok) {
        setFeedback({
          title: `Error ${response.status} - ${response.statusText}`,
          message: json.error,
          type: "error",
        });
        return;
      }

      //redirect to log in page if request succeeds
      setFeedback({
        title: "Account created successfully",
        message: "You'll be redirected to the login page",
        type: "success",
      });
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      console.error(err);
    }
  }

  function checkPasswordRequirements(inputValue: string) {
    const lengthMet = inputValue.length >= 8;
    const uppercaseMet = /[A-Z]/.test(inputValue);
    const lowercaseMet = /[a-z]/.test(inputValue);
    const digitMet = /[0-9]/.test(inputValue);
    const specialCharacterMet = /[#/=()?!@$%^&*-]/.test(inputValue);

    setIsCorrect({
      length: lengthMet,
      uppercase: uppercaseMet,
      lowercase: lowercaseMet,
      digit: digitMet,
      specialCharacter: specialCharacterMet,
    });
  }

  return (
    <main className={styles.main}>
      {feedback.message && (
        <Toast
          title={feedback.title}
          message={feedback.message}
          type={feedback.type}
          onClose={() => setFeedback({ title: "", message: "", type: "" })}
          mode={feedback && "active"}
        />
      )}

      <div className={styles.container}>
        {width >= wideScreen && (
          <div className={styles.backgroundImage}>
            <img
              src={backgroundImg}
              alt="A man and a woman signing up from a mobile phone"
              className={styles.img}
            />
          </div>
        )}
        <div className={styles.formContainer}>
          <h1 className={styles.heading}>Company Signup</h1>
          <p className={styles.subHeading}>
            Do you already have an account? <a href="/login">Login here</a>
          </p>
          <form onSubmit={handleSubmit(onFormSubmit)} className={styles.form}>
            <div
              className={`${styles.inputGroupBox} ${
                isOnFocus["company"] ? styles.isOnFocus : styles.isNotOnFocus
              }`}
            >
              <label htmlFor="company">Company</label>
              <div className={styles.inputGroup}>
                {width >= narrowScreen && (
                  <div className={styles.icon}>
                    <Company />
                  </div>
                )}

                <input
                  {...register("company")}
                  className={styles.input}
                  placeholder="Enter your company name"
                  onFocus={() => colourBorder("company", setIsOnFocus)}
                />
              </div>
            </div>
            <p className={styles.errorMessage}>{errors.company?.message}</p>
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
                    checkPasswordRequirements(e.currentTarget.value);
                  }}
                  onFocus={() => colourBorder("password", setIsOnFocus)}
                />
              </div>
            </div>
            <p className={styles.requirements}>Password requirements:</p>
            <ul>
              <li
                className={`${
                  isCorrect.length
                    ? styles.requirementsFilled
                    : styles.requirementsNotFilled
                }`}
              >
                <span className={styles.requirementsText}>
                  At least 8 characters long
                </span>
              </li>
              <li
                className={`${
                  isCorrect.uppercase
                    ? styles.requirementsFilled
                    : styles.requirementsNotFilled
                }`}
              >
                <span className={styles.requirementsText}>
                  At least one uppercase letter
                </span>
              </li>
              <li
                className={`${
                  isCorrect.lowercase
                    ? styles.requirementsFilled
                    : styles.requirementsNotFilled
                }`}
              >
                <span className={styles.requirementsText}>
                  At least one lowercase letter
                </span>
              </li>
              <li
                className={`${
                  isCorrect.digit
                    ? styles.requirementsFilled
                    : styles.requirementsNotFilled
                }`}
              >
                <span className={styles.requirementsText}>
                  At least one number
                </span>
              </li>
              <li
                className={`${
                  isCorrect.specialCharacter
                    ? styles.requirementsFilled
                    : styles.requirementsNotFilled
                }`}
              >
                <span className={styles.requirementsText}>
                  At least one special character
                </span>
              </li>
            </ul>
            <div
              className={`${styles.inputGroupBox} ${
                isOnFocus["repeatPassword"]
                  ? styles.isOnFocus
                  : styles.isNotOnFocus
              }`}
            >
              <label htmlFor="repeatPassword">Repeat password</label>
              <div className={styles.inputGroup}>
                {width >= narrowScreen && (
                  <div className={styles.icon}>
                    <Password />
                  </div>
                )}
                <input
                  {...register("repeatPassword")}
                  type="password"
                  className={styles.input}
                  placeholder="Repeat your password"
                  onFocus={() => colourBorder("repeatPassword", setIsOnFocus)}
                />
              </div>
            </div>
            <p className={styles.errorMessage}>
              {errors.repeatPassword?.message}
            </p>
            <div className={styles.buttonContainer}>
              <Button
                type="submit"
                customStyles={buttonStyles.primaryButton}
                text="Sign up"
              />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
