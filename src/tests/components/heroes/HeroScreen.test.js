import { mount, shallow } from "enzyme";
import { MemoryRouter, Route, Routes } from "react-router";

import { HeroScreen } from "../../../components/heroes/HeroScreen";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Pruebas en <HeroScreen />", () => {
  test("debe de mostrar <Navigate /> cuando heroeId sea undefined", () => {
    const wrapper = shallow(<HeroScreen />);

    expect(wrapper.find("Navigate").exists()).toBe(true);
  });
  test("debe de mostrar un hero si el parametro existe y se encuentra", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        <Routes>
          <Route path="/hero/:heroeId" element={<HeroScreen />} />
        </Routes>
      </MemoryRouter>
    );

    expect(wrapper.find('.row').exists()).toBe(true);
  });

  test('debe retornar a la pagina correspondiente cuando se presione el boton return', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/dc-batman"]}>
        <Routes>
          <Route path="/hero/:heroeId" element={<HeroScreen />} />
        </Routes>
      </MemoryRouter>
    );

    wrapper.find('button').prop('onClick')();

    expect(mockedUsedNavigate).toHaveBeenCalledWith("/dc");
    expect(mockedUsedNavigate).not.toHaveBeenCalledWith("/marvel");
    
  });
  
  
});
