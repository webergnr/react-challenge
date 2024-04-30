import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import { fetchHighlighter, type HighlighterApiBaseType } from "./highlighterAPI"

export interface HighlighterSliceState {
  firstName: string
  lastName: string
  breakfiedTexts: string[]
  status: "idle" | "loading" | "failed"
}

// Simple initial state
const initialState: HighlighterSliceState = {
  firstName: "Breaking",
  lastName: "Bad",
  breakfiedTexts: ["Br", "Ba"],
  status: "idle",
}

export const highlighterSlice = createAppSlice({
  name: "highlighter",
  initialState,
  reducers: create => ({
    changeFirstName: create.reducer((state, action: PayloadAction<string>) => {
      state.breakfiedTexts = []
      state.firstName = action.payload
    }),
    changeLastName: create.reducer((state, action: PayloadAction<string>) => {
      state.breakfiedTexts = []
      state.lastName = action.payload
    }),

    // The function below is called a thunk and allows us to perform async logic. It
    // can be dispatched like a regular action: `dispatch(breakifyAsync())`. This
    // will call the thunk with the `dispatch` function as the first argument. Async
    // code can then be executed and other actions can be dispatched. Thunks are
    // typically used to make async requests.
    breakifyAsync: create.asyncThunk<HighlighterApiBaseType, void>(
      async () => {
        const response = await fetchHighlighter()
        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          // unsorted values ( original )
          // state.breakfiedTexts = action.payload.elements.map(el => el.symbol)

          // Using sorted values
          state.breakfiedTexts = action.payload.elements
            .map(el => el.symbol)
            .sort((a, b) => a.length > b.length ? -1 : 1)
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
  }),
  selectors: {
    selectBreakfiedTexts: highlighter => highlighter.breakfiedTexts,
    selectFirstName: highlighter => highlighter.firstName,
    selectLastName: highlighter => highlighter.lastName,
    selectStatus: highlighter => highlighter.status,
  },
})

// Action creators are generated for each case reducer function.
export const { breakifyAsync, changeFirstName, changeLastName } =
  highlighterSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
  selectFirstName,
  selectLastName,
  selectStatus,
  selectBreakfiedTexts,
} = highlighterSlice.selectors
