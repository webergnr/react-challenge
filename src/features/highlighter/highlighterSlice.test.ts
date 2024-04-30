import type { AppStore } from "../../app/store"
import { makeStore } from "../../app/store"
import type { HighlighterSliceState } from "./highlighterSlice"
import {
  changeFirstName,
  highlighterSlice,
  selectFirstName,
} from "./highlighterSlice"

interface LocalTestContext {
  store: AppStore
}

describe<LocalTestContext>("highlighter reducer", it => {
  beforeEach<LocalTestContext>(context => {
    const initialState: HighlighterSliceState = {
      breakfiedTexts: ["Br", "Ba"],
      firstName: "Breaking",
      lastName: "Bad",
      status: "idle",
    }

    const store = makeStore({ highlighter: initialState })

    context.store = store
  })

  it("should handle initial state", () => {
    expect(
      highlighterSlice.reducer(undefined, { type: "unknown" }),
    ).toStrictEqual({
      breakfiedTexts: ["Br", "Ba"],
      firstName: "Breaking",
      lastName: "Bad",
      status: "idle",
    })
  })

  it("should handle name change", ({ store }) => {
    expect(selectFirstName(store.getState())).toBe("Breaking")

    store.dispatch(changeFirstName("Weber"))

    expect(selectFirstName(store.getState())).toBe("Weber")
  })
})
