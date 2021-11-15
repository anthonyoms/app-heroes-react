import { mount } from "enzyme";
import { MemoryRouter } from "react-router";
import { AuthContext } from "../../../auth/AuthContext";
import { LoginScreen } from "../../../components/login/LoginScreen";
import { types } from "../../../types/types";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Pruebas en el <LoginScreen />", () => {
  const contextValue = {
    dispatch: jest.fn(),
  };
  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <MemoryRouter>
        <LoginScreen />
      </MemoryRouter>
    </AuthContext.Provider>
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("debe mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe ralizar el dispach y la navegacion", () => {
    wrapper.find("button").prop("onClick")();

    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.login,
      payload: { name: "Anthony" },
    });

    expect(mockedUsedNavigate).toHaveBeenCalledWith('/',{ replace: true });
  });
});
