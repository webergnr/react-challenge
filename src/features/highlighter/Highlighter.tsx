import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getHighlightedText } from "../../utils/text-highlighter"
import styles from "./Highlighter.module.css"
import {
  breakifyAsync,
  changeFirstName,
  changeLastName,
  selectBreakfiedTexts,
  selectFirstName,
  selectLastName,
  selectStatus,
} from "./highlighterSlice"

export const Highlighter = () => {
  const dispatch = useAppDispatch()
  const breakifiedTexts = useAppSelector(selectBreakfiedTexts)
  const firstName = useAppSelector(selectFirstName)
  const lastName = useAppSelector(selectLastName)
  const status = useAppSelector(selectStatus)

  const handleBreakify = () => {
    dispatch(breakifyAsync())
  }

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFirstName(e.target.value))
  }

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeLastName(e.target.value))
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.display}>
          <h1 className={styles.textDisplay}>
            {getHighlightedText(firstName, breakifiedTexts)}
          </h1>
          <h1 className={styles.textDisplay}>
            {getHighlightedText(lastName, breakifiedTexts)}
          </h1>
        </div>
        <div className={styles.formContainer}>
          <div className={styles.inputContainer}>
            <div className={styles.field}>
              <label>First Name</label>
              <input type="text" value={firstName} onChange={handleFirstNameChange} />
            </div>
            <div className={styles.field}>
              <label>Last Name</label>
              <input type="text" value={lastName} onChange={handleLastNameChange} />
            </div>
          </div>
          <button onClick={handleBreakify} className={styles.breakifyButton}>
            {status !== "loading" ? (
              <span>Breakify</span>
            ) : (
              <span>Loading...</span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
