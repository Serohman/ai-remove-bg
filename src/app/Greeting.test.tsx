import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";
import React from "react";
import logo from "../logo.png";
import Greeting from "./Greeting";
import styles from "./Greeting.module.css";

// Mock the CSS module and image import
jest.mock("./Greeting.module.css", () => ({
  title: "mocked-title-class",
}));
jest.mock("../logo.png", () => "mocked-logo.png");

describe("Greeting", () => {
  it("renders the correct greeting", () => {
    render(<Greeting name="World" />);
    expect(screen.getByText("Hello, World!")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const {container} = render(<Greeting name="Snapshot" />);
    expect(container).toMatchSnapshot();
  });

  it("uses mocked CSS module and image", () => {
    expect(styles.title).toBe("mocked-title-class");
    expect(logo).toBe("mocked-logo.png");
  });

  it("calls a function with jest.spyOn", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    console.log("Test log");
    expect(logSpy).toHaveBeenCalledWith("Test log");
    logSpy.mockRestore();
  });
});
