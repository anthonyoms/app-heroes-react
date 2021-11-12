import { mount} from "enzyme";
import { MemoryRouter, Route, Routes } from "react-router";
import { HeroScreen } from "../../../components/heroes/HeroScreen";
import { MarvelScreen } from "../../../components/marvel/MarvelScreen";



describe("Pruebas en <HeroScreen />", () => {
  test("debe de mostrar el componente de redireccion al /", () => {
    const wrapper = mount(
      <MemoryRouter>
        <Routes>
        <Route path="/hero" element={<HeroScreen />} />
        <Route path="/" element={<MarvelScreen />} />
        </Routes>
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
