import { createContext, useState } from "react";

export const SidebarContext = createContext();

const SidebarProvider = ({ children }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenRSidebar, isCloseRsidebar] = useState(false);

    return (
        <SidebarContext.Provider value={{ isOpen, setIsOpen, isOpenRSidebar, isCloseRsidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};

export default SidebarProvider;
