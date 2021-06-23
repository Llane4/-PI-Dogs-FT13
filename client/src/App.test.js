
import App from './App';
import React from "react";
import { render, fireEvent} from "@testing-library/react"
import { AddDogs} from "./components/AddDogs"

it("Se renderiza correctamente",()=>{
    const {queryByTestId}=render(AddDogs)

    expect(queryByTestId("formulario")).toBeTruthy()
})

