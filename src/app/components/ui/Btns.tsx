
const Btns = ({style, children}: {style: string,children: React.ReactNode}) => {
  return (
    <button className={`${style} rounded-lg py-2 px-6 cursor-pointer transition-colors`}>
        {children}
    </button>
  )
}

export default Btns