const handleDateTimeChange = (e) => {
  const formattedDate = e.$d
    .toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    .replace(',', '')
    .replace('/', '-')
  console.log(formattedDate)

  return formattedDate
}
