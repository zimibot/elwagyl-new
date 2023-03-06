import { useEffect, useState } from "react";
import { ButtonComponents } from "../../components.eha/button"
import { CardAnimation } from "../../components/layout/card";
import { GetAndUpdateContext } from "../../model/context.function";

export const TabsMenu = ({
    Item = [
        {
            key: 1,
            title: "protected site",
            content: ""
        }
    ]
    , activeItem = 1 }) => {

    const [active, setactive] = useState(localStorage.getItem("key") ? parseInt(localStorage.getItem("key")) : activeItem);
    const { setStatus } = GetAndUpdateContext()

    useEffect(() => {
        setStatus(d => ({
            ...d,
            TABSITEM: {
                active,
                Item
            }
        }))
        return () => {

        };
    }, [active]);


    return <div className="flex items-center gap-4" >
        {
            Item.map((d, k) => <div key={k}>
                <ButtonComponents active={active === d.key} click={() => {
                    setactive(d.key)
                    localStorage.setItem("key", d.key)

                }}>
                    {d.title}
                </ButtonComponents>
            </div>)
        }
    </div>
}

export const TabsContent = ({ }) => {
    const { status } = GetAndUpdateContext()
    return (
        <CardAnimation className={"flex-1  flex flex-col"}>
            {status?.TABSITEM?.Item.map((d, k) => d.key === status?.TABSITEM?.active && <div className="flex-1 flex flex-col" key={k}>
                {d.content}
            </div>)}
        </CardAnimation>
    )
}