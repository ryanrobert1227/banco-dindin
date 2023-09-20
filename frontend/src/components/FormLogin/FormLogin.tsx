import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/api.ts";

import { FormLoginCSS } from "./FormLogin";

export default function FormLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  async function onSubmit(data: any) {
    try {
      const response = await api.post("/login", {
        login: data.emailcpf,
        password: data.password,
      });

      localStorage.setItem("userLogin", data.emailcpf);
      localStorage.setItem("userPassword", data.password);

      navigate("./main");

      return toast.success(response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error: any) {
      // console
      console.log(error);

      // send toast to user
      return toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
    <FormLoginCSS>
      <div className="form">
        <div className="email">
          <label htmlFor="email">E-mail ou Cpf</label>
          <input
            className={errors?.emailcpf && "input-error"}
            id="email"
            type="email"
            {...register("emailcpf", {
              required: true,
            })}
          />
          {errors?.emailcpf?.type === "required" && (
            <span>O campo password é obrigatorio!</span>
          )}
        </div>
        <div className="password">
          <label htmlFor="password">Password</label>
          <input
            className={errors?.password && "input-error"}
            id="password"
            type="password"
            {...register("password", {
              required: true,
            })}
          />
          {errors?.epassword?.type === "required" && (
            <span>O campo password é obrigatorio!</span>
          )}
        </div>
        <button onClick={() => handleSubmit(onSubmit)()}>Entrar</button>
      </div>
    </FormLoginCSS>
  );
}
