import moment from 'moment'

export const convertDataNotice = (data) => {
  const value = data.map((item) => {
    const valueData = {
      key: item.id,
      id: item.id,
      attachment: item.attachment,
      author: item.author,
      date: item.date,
      published_to: item.published_to,
      subject: item.subject,
      published_to: item.published_to,
      attachment_link: item.attachment
    }
    if (item.attachment === null) {
      (valueData.attachment = ''), (valueData.attachment_link = '')
    } else {
      const link = valueData.attachment.split('/')
      valueData.attachment_link = link[link.length - 1]
    }
    return valueData
  })

  return value
}
