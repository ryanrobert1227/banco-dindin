import { useState } from "react";
import InputMask from "react-input-mask";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import api from "../../api/api.ts";

import { FormCadastroCSS } from "./FormCadastro.ts";

export default function FormCadastro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();

  const [apiMessage, setApiMessage] = useState("");

  const watchPassword = watch("password");

  async function onSubmit(data: any) {
    try {
      const response = await api.post("/contas", {
        name: data.nome,
        cpf: data.cpf.replaceAll(".", "").replaceAll("-", ""),
        bornDate: "2004-07-05",
        phoneNumber: data.telefone,
        email: data.email,
        password: data.password,
      });

      setApiMessage(response.data.message);
      navigate("/");
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

      // set error
      setApiMessage(error.response.data.message);

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

  function handleCheckConfirmPassword(value: string) {
    if (watchPassword === value) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <FormCadastroCSS>
      <div className="form">
        <div className="nome">
          <label htmlFor="nome">Nome</label>
          <input
            className={(errors?.nome || apiMessage) && "input-error"}
            id="nome"
            type="nome"
            {...register("nome", {
              required: true,
            })}
          />
          {errors?.nome?.type === "required" && (
            <span>O campo nome é obrigatorio!</span>
          )}
        </div>
        <div className="email">
          <label htmlFor="email">E-mail</label>
          <input
            className={(errors?.email || apiMessage) && "input-error"}
            id="email"
            type="email"
            {...register("email", {
              required: true,
              minLength: 6,
            })}
          />
          {(errors?.email?.type === "required" && (
            <span>O campo email é obrigatorio!</span>
          )) ||
            (errors?.email?.type === "minLength" && (
              <span>O campo email deve conter pelo menos 3 caracteres!</span>
            ))}
        </div>
        <div className="telefone">
          <label htmlFor="telefone">Telefone</label>
          <InputMask
            className={(errors?.telefone || apiMessage) && "input-error"}
            id="telefone"
            mask="(99) 9 9999 9999"
            type="text"
            {...register("telefone", {
              required: true,
              minLength: 11,
            })}
          />
          {(errors?.telefone?.type === "required" && (
            <span>O campo nome é obrigatorio!</span>
          )) ||
            (errors?.telefone?.type === "minLength" && (
              <span>O campo telefone deve conter 11 digitos</span>
            ))}
        </div>
        <div className="cpf">
          <label htmlFor="cpf">CPF</label>
          <InputMask
            className={(errors?.cpf || apiMessage) && "input-error"}
            id="cpf"
            mask="999.999.999-99"
            type="text"
            {...register("cpf", {
              required: true,
              minLength: 11,
            })}
          />
          {(errors?.cpf?.type === "required" && (
            <span>O campo cpf é obrigatorio!</span>
          )) ||
            (errors?.cpf?.type === "minLength" && (
              <span>O campo cpf deve conter 11 digitos</span>
            ))}
        </div>
        <div className="password">
          <label htmlFor="password">Password</label>
          <input
            className={(errors?.password || apiMessage) && "input-error"}
            id="password"
            type="password"
            {...register("password", {
              required: true,
              minLength: 8,
            })}
          />
          {(errors?.password?.type === "required" && (
            <span>O campo password é obrigatorio!</span>
          )) ||
            (errors?.password?.type === "minLength" && (
              <span>O campo password deve conter pelo menos 8 caracteres!</span>
            ))}
        </div>
        <div className="confirm-password">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            className={(errors?.password || apiMessage) && "input-error"}
            id="confirm-password"
            type="password"
            {...register("confirmPassword", {
              required: true,
              minLength: 8,
              validate: (value) => handleCheckConfirmPassword(value),
            })}
          />
          {errors?.confirmPassword?.type === "validate" && (
            <span>
              O campo <strong>'Confirmar Senha'</strong> e{" "}
              <strong>'Senha'</strong> devem ser iguais!
            </span>
          )}
        </div>
        <button onClick={() => handleSubmit(onSubmit)()}>Entrar</button>
      </div>
      <Link to="/">
        <span>já tem cadastro? clique aqui!</span>
      </Link>
    </FormCadastroCSS>
  );
}
