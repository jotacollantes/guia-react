import logoVite from '../../public/vite.svg'

export const LogoVite = () => {
  return (
    <img
    src={logoVite}
    alt='Vite Logo'
    style={{
        position:'fixed',
        bottom:'20px',
        right:'20px',
        width:'80px'
    }}
    />
  )
}
