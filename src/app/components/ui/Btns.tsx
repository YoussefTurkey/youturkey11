import Link from "next/link"

type TBtns = {
  children: React.ReactNode,
  style: string
  action? : () => void
  href: string
}

const Btns = ({style, children, action, href}: TBtns) => {
  return (
    <Link href={href} onClick={action} className={`${style} w-full sm:w-fit rounded-lg py-2 px-6 cursor-pointer transition-colors`}>
        {children}
    </Link>
  )
}

export default Btns