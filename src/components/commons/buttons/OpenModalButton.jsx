import { Tooltip, Kbd } from "flowbite-react"

const OpenModalButton = ({callback, icon, message}) => {
    return (
        <div className="mb-12 flex justify-center">
            <Tooltip content={ <Kbd className="p-1 text-[8px] font-bold">ALT + A</Kbd> } placement="right">
                <button className='flex items-center gap-2 w-fit mx-auto p-2 bg-primary hover:bg-slate-600 text-white rounded-lg group active:scale-95 hover:scale-105 active:rounded-r-lg' onClick={ callback } accessKey="a" >
                    {icon} <span className="font-bold">{message}</span>
                </button>
            </Tooltip>
        </div>
    )
}

export default OpenModalButton
