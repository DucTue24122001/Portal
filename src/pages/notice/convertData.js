export const convertDataNotice = (data) => {
  const value = data.map((item) => {
    const valueData = {
      key: item.id,
      id: item.id,
      attachment: item.attachment,
      author: item.author,
      status: item.status,
      published_date: item.published_date,
      subject: item.subject,
      created_by: item.created_by,
      created_at: item.created_at,
      attachment_link: item.attachment
    }

    item.attachment === null
      ? ((valueData.attachment = ''), (valueData.attachment_link = ''))
      : (valueData.attachment_link = valueData.attachment.split('/')[valueData.attachment.split('/').length - 1])
    return valueData
  })

  return value
}
