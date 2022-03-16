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
      published_to: item.published_to,
      created_at: item.created_at,
      attachment_link: item.attachment
    }
    return valueData
  })

  return value
}
