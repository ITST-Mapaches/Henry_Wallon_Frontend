import React, { useContext } from 'react'
import { Popover } from 'flowbite-react'
import {TitleContext} from '../../context/TitleContextProvider';
import { AuthContext } from '../../context/AuthContextProvider';

const NavbarCentered = () => {
  // accediendo al titulo a través del contexto de titulo
    const {title} = useContext(TitleContext);
    const {setUser} = useContext(AuthContext);
    return (
        <nav className="fixed top-0 z-50 w-screen bg-primary">
            <div className="p-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end flex-1">
                        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                            <span className="sr-only">Open sidebar</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <a className="flex">
                        <img src="/assets/images/favicon.svg" className="h-8 me-3" alt="Logo" />
                        <span className="self-center text-white text-xl font-semibold sm:text-2xl whitespace-nowrap">Henry Wallon</span>
                        </a>
                    </div>
                    <span className="text-white text-xl font-semibold sm:text-2xl whitespace-nowrap flex-1">{title}</span>
                    <Popover className='flex-1' content={
                    <button className="px-3 py-2 flex gap-2 bg-white hover:bg-slate-100 font-semibold" onClick={() => { setUser(null) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                        </svg>
                        Cerrar sesión
                    </button>
                    } placement='left'>
                    <button>
                    <svg className='h-5 w-5' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 15C2.175 15 1.46875 14.7063 0.88125 14.1188C0.29375 13.5313 0 12.825 0 12C0 11.175 0.29375 10.4688 0.88125 9.88125C1.46875 9.29375 2.175 9 3 9C3.825 9 4.53125 9.29375 5.11875 9.88125C5.70625 10.4688 6 11.175 6 12C6 12.825 5.70625 13.5313 5.11875 14.1188C4.53125 14.7063 3.825 15 3 15ZM12 15C11.175 15 10.4688 14.7063 9.88125 14.1188C9.29375 13.5313 9 12.825 9 12C9 11.175 9.29375 10.4688 9.88125 9.88125C10.4688 9.29375 11.175 9 12 9C12.825 9 13.5313 9.29375 14.1188 9.88125C14.7063 10.4688 15 11.175 15 12C15 12.825 14.7063 13.5313 14.1188 14.1188C13.5313 14.7063 12.825 15 12 15ZM21 15C20.175 15 19.4688 14.7063 18.8813 14.1188C18.2938 13.5313 18 12.825 18 12C18 11.175 18.2938 10.4688 18.8813 9.88125C19.4688 9.29375 20.175 9 21 9C21.825 9 22.5313 9.29375 23.1188 9.88125C23.7063 10.4688 24 11.175 24 12C24 12.825 23.7063 13.5313 23.1188 14.1188C22.5313 14.7063 21.825 15 21 15Z" fill="white"/>
                    </svg>
                    </button>
                    </Popover>
                </div>
            </div>
        </nav>
    )
}

export default NavbarCentered
