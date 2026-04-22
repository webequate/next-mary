import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormInput from "@/components/FormInput";

const defaultProps = {
  inputLabel: "Full Name",
  labelFor: "name",
  inputType: "text",
  inputId: "name",
  inputName: "name",
  placeholderText: "Your Name",
  ariaLabelName: "Name",
  onChange: vi.fn(),
  value: "",
};

describe("FormInput", () => {
  it("renders the label", () => {
    render(<FormInput {...defaultProps} />);
    expect(screen.getByText("Full Name")).toBeInTheDocument();
  });

  it("renders the input with the correct type", () => {
    render(<FormInput {...defaultProps} inputType="email" />);
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveAttribute(
      "type",
      "email"
    );
  });

  it("renders the input with the placeholder", () => {
    render(<FormInput {...defaultProps} />);
    expect(
      screen.getByPlaceholderText("Your Name")
    ).toBeInTheDocument();
  });

  it("associates label with input via htmlFor", () => {
    render(<FormInput {...defaultProps} />);
    const label = screen.getByText("Full Name");
    expect(label).toHaveAttribute("for", "name");
  });

  it("calls onChange when the user types", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<FormInput {...defaultProps} onChange={onChange} />);
    await user.type(screen.getByRole("textbox", { name: "Name" }), "a");
    expect(onChange).toHaveBeenCalled();
  });

  it("displays the provided value", () => {
    render(<FormInput {...defaultProps} value="Alice" />);
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveValue("Alice");
  });

  it("is required", () => {
    render(<FormInput {...defaultProps} />);
    expect(screen.getByRole("textbox", { name: "Name" })).toBeRequired();
  });
});
