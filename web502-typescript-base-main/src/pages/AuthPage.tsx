import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Props = {
  isLogin?: boolean;
};

type FormValues = {
  username?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

function AuthPage({ isLogin }: Props) {
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const password = watch("password");

  const onSubmit = async (values: FormValues) => {
    try {
      if (isLogin) {
        const { data } = await axios.post(
          "http://localhost:3000/login",
          values
        );
        localStorage.setItem("accessToken", data.accessToken);
        toast.success("Đăng nhập thành công");
        nav("/list");
      } else {
        await axios.post("http://localhost:3000/register", values);
        toast.success("Đăng ký thành công");
        nav("/login");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {isLogin ? "Login" : "Register"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="block font-medium mb-1">Username</label>
            <input
              {...register("username", {
                required: "Username không được để trống",
                minLength: {
                  value: 5,
                  message: "Username phải lớn hơn 4 ký tự",
                },
              })}
              className="w-full border rounded-lg px-3 py-2"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">
                {errors.username.message}
              </p>
            )}
          </div>
        )}

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            {...register("email", {
              required: "Email không được để trống",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Email không hợp lệ",
              },
            })}
            type="email"
            className="w-full border rounded-lg px-3 py-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Password</label>
          <input
            {...register("password", {
              required: "Password không được để trống",
              minLength: {
                value: 7,
                message: "Password phải lớn hơn 6 ký tự",
              },
            })}
            type="password"
            className="w-full border rounded-lg px-3 py-2"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        {!isLogin && (
          <div>
            <label className="block font-medium mb-1">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword", {
                required: "Vui lòng nhập lại password",
                validate: (value) =>
                  value === password || "Confirm password không khớp",
              })}
              type="password"
              className="w-full border rounded-lg px-3 py-2"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AuthPage;