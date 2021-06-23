import React from "react";
import { render, fireEvent} from "@testing-library/react"
import { AddDogs} from "./AddDogs"

it("Se renderiza correctamente",()=>{
    const {queryByTestId}=render(<AddDogs/>)

    expect(queryByTestId("formulario")).toBeTruthy()
})