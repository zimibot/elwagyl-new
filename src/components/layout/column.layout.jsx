import ScrollToBottom from 'react-scroll-to-bottom';


export const ColumnRight = ({ children }) => {
    return <div className="col-span-2 border-r border-primary relative item  backdrop-blur-sm z-20 " style={{
        direction: "rtl"
    }}>
        <div className="absolute h-full w-full">
            <ScrollToBottom className="h-full pb-10">
                <MainContainer>
                    {children}
                </MainContainer>
            </ScrollToBottom>
        </div>
    </div>
}
export const ColumnCenter = ({ children }) => {
    return <div className="col-span-5 border-primary flex flex-1 flex-col">
        {children}
    </div>
}

const MainContainer = ({ children }) => {


    return <div className="flex flex-1 flex-col h-full border-l border-r border-primary" style={{
        direction: "ltr"
    }}>
        {children}
    </div>

}

export const ColumnLeft = ({ children }) => {


    return <div className="col-span-2 relative item z-50 backdrop-blur-sm" >
        <div className="absolute h-full w-full">
            <ScrollToBottom className="h-full pb-10">
                <MainContainer>
                    {children}
                </MainContainer>
            </ScrollToBottom>
        </div>
        {/* {!sticky && <button onClick={scrollToBottom}>Click me to scroll to bottom</button>} */}
        {/* <div className="w-full px-4 py-2 text-center absolute bottom-0 bg-primary">Arrow</div> */}
    </div>
}