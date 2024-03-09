export const getTime = (): string => {
  const time = new Date()
  let hour = time.getHours()
  if (hour < 12 && hour >= 6) return 'Good Morning!'
  else if (hour >= 12 && hour <= 17) return 'Good Afternoon!'
  else return 'Good Night!'
}
