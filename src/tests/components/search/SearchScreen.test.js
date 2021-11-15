import { mount } from "enzyme";
import { MemoryRouter, Route, Routes } from "react-router";
import { SearchScreen } from "../../../components/search/SearchScreen";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));


describe("Pruebas en <SearchScreen />", () => {
  test("debe de mostrarse correctamente con los valores por defecto", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search"]}>
        <Routes>
          <Route path="/search" element={<SearchScreen />} />
        </Routes>
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".text-success").text().trim()).toBe("Search a hero");
  });

  test("debe de mostrar a Batman y el input con el valor del queryString", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <Routes>
          <Route path="/search" element={<SearchScreen />} />
        </Routes>
      </MemoryRouter>
    );

    expect(wrapper.find("input").prop("value")).toBe("batman");
    expect(wrapper).toMatchSnapshot();
  });

  test("debe de mostrar un error si no se encuentra el Hero", () => {
    const hero = "batman!123";
    const wrapper = mount(
      <MemoryRouter initialEntries={[`/search?q=${hero}`]}>
        <Routes>
          <Route path="/search" element={<SearchScreen />} />
        </Routes>
      </MemoryRouter>
    );

    expect(wrapper.find(".text-danger").text().trim()).toBe(
      `There is no a hero with: ${hero}`
    );
  });

  test('debe llamar el navigate con el parametro correspondiente', () => {
    const hero = "batman!123";
    const wrapper = mount(
      <MemoryRouter initialEntries={[`/search?q=${hero}`]}>
        <Routes>
          <Route path="/search" element={<SearchScreen />} />
        </Routes>
      </MemoryRouter>
    );

    wrapper.find('input').simulate('change', {
        target: {
            name: 'searchText',
            value:'batman'
        }
    });

    wrapper.find('form').prop('onSubmit')({
        preventDefault(){}
    });

    expect(mockedUsedNavigate).toHaveBeenCalledWith(`?q=batman`);
  });
  
});
