import React from 'react'
import FormTimeSheet from './timesheet/indexFormRedux'
import { Provider } from 'react-redux'
import { store } from './timeSheetRedux'

const TimesheetPage = () => {
  return (
    <>
      <Provider store={store}>
        <FormTimeSheet />
      </Provider>
    </>
  )
}

export default TimesheetPage
