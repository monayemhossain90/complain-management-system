import {
  Card,
  Input,
  Typography,
  Button,
  Spinner,
} from "@material-tailwind/react";
import { useState } from "react";
import { useLoginMutation } from "../../redux/features/auth/authApi.js";
import { useDispatch, useSelector } from "react-redux";
import Error from "../validation/Error.jsx";
import { SetLoginError } from "../../redux/features/auth/authSlice.js";

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.LoginError);

  // local states for inputs
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState({});

  const validateForm = () => {
    let errors = {};

    // Phone validation
    if (!phonenumber) {
      errors.phonenumber = "Phone number is required";
    } else if (!/^01[3-9]\d{8}$/.test(phonenumber)) {
      errors.phonenumber = "Enter a valid Bangladeshi phone number";
    } else if (phonenumber.length < 11) {
      errors.phonenumber = "Phone number must be at least 11 digits";
    } else if (phonenumber.length > 14) {
      errors.phonenumber = "Phone number cannot exceed 14 digits";
    }

    // Password validation
    if (!password) {
      errors.password = "Password is required!";
    } else if (password.length < 6) {
      errors.password = "Minimum 6 characters required";
    } else if (password.length > 32) {
      errors.password = "Maximum 32 characters allowed";
    }

    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setFormError({});
    dispatch(SetLoginError(""));

    if (!validateForm()) return;

    login({ phonenumber, password });
  };

  return (
    <div className="min-h-screen grid place-items-center form-container">
      <Card
        color="transparent"
        className="p-7 bg-white w-[90%] sm:w-[450px]"
        shadow={true}
      >
        <Typography variant="h4" color="blue-gray">
          Employee Login
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your phonenumber & password to login
        </Typography>

        {error && <Error message={error} />}
        <br />

        <form
          onSubmit={onSubmit}
          className="py-4 grid grid-cols-1 w-[100%] gap-6"
        >
          {/* Phone number */}
          <div>
            <Input
              size="lg"
              type="text"
              label="Phone number"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value.trim())}
              error={Boolean(formError.phonenumber)}
            />
            {formError.phonenumber && (
              <span className="error-text text-red-500 text-sm">
                {formError.phonenumber}
              </span>
            )}
          </div>

          {/* Password */}
          <div>
            <Input
              size="lg"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(formError.password)}
            />
            {formError.password && (
              <span className="error-text text-red-500 text-sm">
                {formError.password}
              </span>
            )}
          </div>

          <div className="w-full">
            <Button
              disabled={isLoading}
              className={`${
                isLoading && "capitalize"
              } w-full flex gap-3 items-center justify-center disabled:cursor-not-allowed`}
              type="submit"
            >
              {isLoading ? (
                <>
                  <Spinner className="h-4 w-4" /> Processing...
                </>
              ) : (
                <>Login</>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
