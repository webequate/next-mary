import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "@/components/ContactForm";

const fillForm = async (
  user: ReturnType<typeof userEvent.setup>,
  overrides: Record<string, string> = {}
) => {
  const fields = {
    Name: "Jane Doe",
    Email: "jane@example.com",
    Subject: "Hello",
    Message: "Test message body.",
    ...overrides,
  };
  for (const [label, value] of Object.entries(fields)) {
    const el = screen.getByRole(label === "Message" ? "textbox" : "textbox", {
      name: label,
    });
    await user.clear(el);
    await user.type(el, value);
  }
};

describe("ContactForm", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders all visible form fields", () => {
    render(<ContactForm />);
    expect(screen.getByRole("textbox", { name: "Name" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Email" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Subject" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Message" })).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    render(<ContactForm />);
    expect(
      screen.getByRole("button", { name: "Send Message" })
    ).toBeInTheDocument();
  });

  it("shows success message after a successful submission", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ message: "Message sent successfully." }),
      })
    );
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillForm(user);
    await user.click(screen.getByRole("button", { name: "Send Message" }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Message sent successfully."
      );
    });
  });

  it("shows error message when the API returns an error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ message: "Message failed to send." }),
      })
    );
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillForm(user);
    await user.click(screen.getByRole("button", { name: "Send Message" }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Message failed to send."
      );
    });
  });

  it("shows error message when fetch throws", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Network error"))
    );
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillForm(user);
    await user.click(screen.getByRole("button", { name: "Send Message" }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Message failed to send."
      );
    });
  });

  it("disables the submit button while submitting", async () => {
    let resolve: (value: unknown) => void;
    vi.stubGlobal(
      "fetch",
      vi.fn(
        () =>
          new Promise((r) => {
            resolve = r;
          })
      )
    );
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillForm(user);
    await user.click(screen.getByRole("button", { name: "Send Message" }));

    expect(screen.getByRole("button", { name: "Send Message" })).toBeDisabled();

    resolve!({
      ok: true,
      json: async () => ({ message: "ok" }),
    });
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Send Message" })
      ).not.toBeDisabled();
    });
  });

  it("resets form fields after a successful submission", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ message: "ok" }),
      })
    );
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillForm(user);
    await user.click(screen.getByRole("button", { name: "Send Message" }));

    await waitFor(() => {
      expect(screen.getByRole("textbox", { name: "Name" })).toHaveValue("");
    });
    expect(screen.getByRole("textbox", { name: "Message" })).toHaveValue("");
  });

  it("does not submit when honeypot field is filled", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillForm(user);

    const honeypot = document.querySelector('input[name="website"]');
    await user.type(honeypot as HTMLElement, "http://spam.example.com");
    await user.click(screen.getByRole("button", { name: "Send Message" }));

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("sends form data to /api/send-email", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ message: "ok" }),
    });
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillForm(user);
    await user.click(screen.getByRole("button", { name: "Send Message" }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
    const [url, opts] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/send-email");
    const body = JSON.parse(opts.body);
    expect(body.name).toBe("Jane Doe");
    expect(body.email).toBe("jane@example.com");
  });
});
