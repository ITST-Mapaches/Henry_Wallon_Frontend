import { Tooltip, Kbd } from "flowbite-react"

const CustomButton = ({type = 'button', className = '', tooltip = 'Agregar un tooltip', placement = 'bottom', style = 'dark',  mesagge, accessKey, callback}) => {
    return (
        <Tooltip content={tooltip} placement={placement} style={style}>
            <button type={type} className={`flex items-center gap-1 rounded-lg hover:scale-105 active:scale-95 text-white p-2 text-[14px] font-bold ${className}`} accessKey={accessKey} onClick={callback}>
                <span className="flex items-center justify-center">{mesagge}</span> <Kbd className="p-1 text-[8px] font-bold">ALT + { accessKey.toUpperCase() }</Kbd>
            </button>
        </Tooltip>
    )
}

export default CustomButton
