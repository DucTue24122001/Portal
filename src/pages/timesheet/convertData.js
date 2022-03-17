import moment from 'moment'

export const convertData = (data) => {
  const dataComp = data.filter((item) => {
    if (item.compensation !== null) {
      return item
    }
  })
  const value = data.map((item) => {
    const valueData = {
      key: item.id,
      id: item.id,
      checkout: item.checkout_original,
      checkin: item.checkin_original,
      late: item.late,
      early: item.early,
      inOfficle: item.in_office,
      Ot: item.ot_time,
      Worktime: item.work_time,
      date: item.work_date,
      Note: item.note,
      lack: item.lack,
      comp: item.compensation,
      pleave: item.paid_leave,
      uleave: item.unpaid_leave,
      is_holiday: item.is_holiday,
      member_id: item.member_id,
      requests: item.requests,
      colorWorkTime: ''
    }
    if (item.note === null) {
      valueData.Note = ''
    } else {
      const NoteTable = ['Forget:Approved', 'Leave:Approved', 'Check-in/out:Approved']
      if (NoteTable.includes(item.note)) {
        valueData.Worktime = '08:00'
      }
      if (item.lack !== null) {
        !dataComp.map((itemcomp) => {
          if (itemcomp.work_date.includes(item.note.slice(9))) {
            if (moment(item.lack, 'H:mm') <= moment(itemcomp.compensation, 'H:mm')) {
              valueData.colorWorkTime = 'default'
            }
          }
        })
      }
      if (item.is_holiday === 0) {
        if (item.checkin_original === null) {
          valueData.checkin = '--:--'
        }
        if (item.checkout_original === null) {
          valueData.checkout = '--:--'
        }
        if (item.in_office === null) {
          valueData.inOfficle = '--:--'
        }
        if (item.work_time === null) {
          valueData.Worktime = '00:00'
        }
      }
    }
    item.checkin_original === null ? (valueData.checkin = '00:00') : (valueData.checkin = item.checkin_original)
    item.checkout_original === null ? (valueData.checkout = '00:00') : (valueData.checkout = item.checkout_original)

    return valueData
  })

  return value
}
