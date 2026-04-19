export const isAuth = () => {
  return !!localStorage.getItem('user')
}