const { mount } = require("enzyme");
const { MemoryRouter} = require("react-router");
const { AuthContext } = require("../../auth/AuthContext");
const { Navbar } = require("../../components/ui/Navbar");
const { types } = require("../../types/types");

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Pruebas en <Navbar />", () => {

  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: true,
      name: "Pedro",
    },
  };

  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </AuthContext.Provider>
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".text-info").text()).toBe(contextValue.user.name);
  });

  test("debe de llamar el logout y usar el navigate", () => {
    wrapper.find("button").simulate("click");
    expect(contextValue.dispatch).toHaveBeenCalledWith({ type: types.logout });
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/login", {"replace": true});
  });
});
