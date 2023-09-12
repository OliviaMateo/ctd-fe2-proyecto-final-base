import { rest } from "msw";
import { setupServer } from "msw/node";
import { screen, waitFor } from "@testing-library/react";
import Cita from "./Cita";
import { API_URL } from "../../app/constants";
import { render } from "../../test-utils"
import userEvent from "@testing-library/user-event";

const dataArray = [
  {
    quote: "Thank you. Come again.",
    character: "Apu Nahasapeemapetilon",
    image: "imagen",
    characterDirection: "right",
  },
];

export const handlers = [
  rest.get(API_URL, (req, res, ctx) => {
    return res(ctx.json(dataArray), ctx.status(200), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("Cita", () => {
  
  it("No deberia mostrar ninguna cita", async () => {
    render(<Cita />);
    expect(
      screen.getByText(/No se encontro ninguna cita/i)
    ).toBeInTheDocument();
  });

  it("Deberia mostrar el mensaje de carga", async () => {
    render(<Cita />);
    const btnBuscar = await screen.findByLabelText(/Obtener Cita/i);
    userEvent.click(btnBuscar);
    await waitFor(() => {
      expect(screen.getByText(/cargando/i)).toBeInTheDocument();
    });
  });

  it("Deberia mostrar la cita del personaje correspondiente", async () => {
    render(<Cita />);
    const input = screen.getByRole("textbox", { name: "Author Cita" });
    const btnBuscar = await screen.findByLabelText(/Obtener Cita/i);
    await userEvent.click(input);
    await userEvent.keyboard("apu");
    await userEvent.click(btnBuscar);
    await waitFor(() => {
      expect(
        screen.getByText(
          /Thank you. Come again./i
        )
      ).toBeInTheDocument();
    });
  });

  it("Deberia mostrar el error", async () => {
    render(<Cita />);
    const input = screen.getByRole("textbox", { name: "Author Cita" });
    const btnBuscar = await screen.findByLabelText(/Obtener Cita/i);
    await userEvent.click(input);
    await userEvent.clear(input);
    await userEvent.keyboard("apu");
    userEvent.click(btnBuscar);
    await waitFor(() => {
      expect(
        screen.getByText(/No se encontro ninguna cita/i)
      ).toBeInTheDocument();
    });
  });
});

