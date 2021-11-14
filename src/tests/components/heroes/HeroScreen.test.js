import { shallow } from "enzyme";

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
});
