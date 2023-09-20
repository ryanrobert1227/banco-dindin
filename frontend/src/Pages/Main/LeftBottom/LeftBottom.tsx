import { useState, useEffect } from "react";

import { RegistroType } from "../../../types/propsTypes.ts";

import { LeftBottomProps } from "../../../types/propsTypes.ts";

import RegistroRow from "../../../components/ResgistroRow/RegistroRow.tsx";

import { LeftBottomStyled } from "./LeftBottom";

export default function LeftBottom(props: LeftBottomProps) {
  const { registros, keyWordFilter } = props;

  const [render, setRender] = useState(false);
  const [orderDateDesc, setOrderDateDesc] = useState(false);
  const [orderValueDesc, setOrderValueDesc] = useState(false);

  function handleSortByDate() {
    if (!orderDateDesc) {
      registros.sort((a: RegistroType, b: RegistroType) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });
    } else {
      registros.sort((a: RegistroType, b: RegistroType) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
      });
    }

    setOrderDateDesc(!orderDateDesc);
    setRender(!render);
  }

  function handleSortByValue() {
    if (!orderValueDesc) {
      registros.sort((a, b) => {
        return b.value - a.value;
      });
    } else {
      registros.sort((a, b) => {
        return a.value - b.value;
      });
    }

    setOrderValueDesc(!orderValueDesc);
    setRender(!render);
  }

  useEffect(() => {}, [render]);

  return (
    <LeftBottomStyled>
      <div className="categorias">
        <span onClick={handleSortByDate}>Data</span>
        <span>Dia da Semana</span>
        <span>Descrição</span>
        <span>Categoria</span>
        <span onClick={handleSortByValue}>Valor</span>
        <span>Tipo</span>
      </div>
      <hr />
      <div className="rows">
        {registros
          .filter((element) => {
            if (keyWordFilter.length < 2) {
              return element;
            }

            return keyWordFilter.includes(element.category);
          })
          .map((element: any, index) => {
            return (
              <RegistroRow
                key={index}
                data={element.date}
                semana={element.day}
                descricao={element.discription}
                categoria={element.category}
                valor={element.value}
                tipo={element.type}
              />
            );
          })}
      </div>
    </LeftBottomStyled>
  );
}
