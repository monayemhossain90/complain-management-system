import {
  Card,
  Input,
  Typography,
  Button,
  Spinner,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/auth/authApi.js";
import { useDispatch, useSelector } from "react-redux";
import Error from "../validation/Error.jsx";
import { SetLoginError } from "../../redux/features/auth/authSlice.js";

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.LoginError);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    dispatch(SetLoginError(""));
    login(data);
  };

  return (
    <>
      <div className="min-h-screen grid place-items-center form-container">
        <Card
          color="transparent"
          className="p-7 bg-white w-[90%] sm:w-[450px]"
          shadow={true}
        >
          <Typography variant="h4" color="blue-gray">
            Admin Login
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your phonenumber & password to login
          </Typography>
          {error && (
            <>
              <Error message={error} />
            </>
          )}
          <br />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="py-4 grid grid-cols-1 w-[100%] gap-6"
          >
            <div>
              <Input
                size="lg"
                type="string"
                label="Phone number"
                {...register("phonenumber", {
                  required: "phonenumber is required",
                  pattern: {
                    value: /^01[3-9]\d{8}$/,
                    message: "Enter a valid Bangladeshi phone number",
                  },
                  maxLength: {
                    value: 14,
                    message: "Phone number cannot exceed 14 digits",
                  },

                  minLength: {
                    value: 11,
                    message: "Phone number must be at least 11 digits",
                  },
                })}
                error={Boolean(errors?.email?.message)}
              />
              {errors?.email?.message && (
                <span className="error-text">{errors?.email?.message}</span>
              )}
            </div>

            <div>
              <Input
                size="lg"
                type="password"
                label="Password"
                {...register("password", {
                  required: { value: true, message: "Password is required!" },
                  minLength: { value: 6, message: "Minimum 6 character" },
                  maxLength: { value: 32, message: "Maximum 32 character" },
                })}
                error={Boolean(errors?.password?.message)}
              />
              {errors?.password?.message && (
                <span className="error-text">{errors?.password?.message}</span>
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
    </>
  );
};

export default Login;
