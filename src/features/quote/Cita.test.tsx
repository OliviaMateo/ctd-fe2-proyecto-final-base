import { rest } from "msw";
import { setupServer } from "msw/node";
import { screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { render } from "../../test-utils";
import userEvent from "@testing-library/user-event";
import Cita from "./Cita";
import { API_URL } from "../../app/constants";
import { store } from "../../app/store";

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
    it("No debería mostrar ninguna cita", async () => {
    render(
        <Provider store={store}>
            <Cita />
        </Provider>
    );
    expect(screen.getByText(/No se encontro ninguna cita/i)).toBeInTheDocument();
    });

    it("Debería mostrar el mensaje de carga", async () => {
    render(
        <Provider store={store}>
            <Cita />
        </Provider>
    );
    const btnBuscar = await screen.findByLabelText(/Obtener Cita/i);
    userEvent.click(btnBuscar);
    await waitFor(() => {expect(screen.getByText(/cargando/i)).toBeInTheDocument();});
    });

    it("Debería mostrar la cita del personaje correspondiente", async () => {
    render(
        <Provider store={store}>
            <Cita />
        </Provider>
    );
    const input = screen.getByRole("textbox", { name: "Author Cita" });
    const btnBuscar = await screen.findByLabelText(/Obtener Cita/i);
    await userEvent.click(input);
    await userEvent.keyboard("apu");
    await userEvent.click(btnBuscar);
    await waitFor(() => {
        expect(screen.getByText(/Thank you. Come again./i)).toBeInTheDocument();
    });
    });
});