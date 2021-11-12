import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";

describe("Pruebas en authReducer", () => {
  test("debe de retornar el estado por defecto", () => {
    const state = authReducer({ logged: false }, {});
    expect(state).toEqual({ logged: false });
  });
  test("debe de authenticar y colocar el name del usuario", () => {
    const action = {
      type: types.login,
      payload: { name: "Anthony" },
    };
    const state = authReducer({}, action);
    expect(state).toEqual({ name: "Anthony", logged: true });
  });
  test("debe de borrar el name del usuario y el logged en false", () => {
    const action = {
      type: types.logout,
      payload: { name: "Anthony", logged: true },
    };
    const state = authReducer({}, action);
    expect(state).toEqual({ logged: false });
  });
});
