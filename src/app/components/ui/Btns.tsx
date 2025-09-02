type TBtns = {
  children: React.ReactNode,
  style: string
  action? : () => void
}

const Btns = ({style, children, action}: TBtns) => {
  return (
    <button onClick={action} className={`${style} rounded-lg py-2 px-6 cursor-pointer transition-colors`}>
        {children}
    </button>
  )
}

export default Btns