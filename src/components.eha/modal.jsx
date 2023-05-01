import { Modal, Result, Tooltip } from "antd"
import styled from "styled-components"
import { SquareMedium } from "../components/decoration/square"
import { GetAndUpdateContext } from "../model/context.function"
import { ButtonComponents } from "./button"
import { TitleContent } from "../components/layout/title"
import { CloseOutlined } from "@ant-design/icons"

const ModalItems = styled(Modal)`
    ${props => props.styleModal && props.styleModal}
    display: flex;
    flex-direction: column;
    .ant-modal-content {
        background: #1C3947;
        border-radius: 0;
        padding: 30px;
        position: relative;
        display: flex;
        flex-direction: column;
        flex: 1;
        ${props => `height: ${props.heightContent ? props.heightContent : "auto"}`}
    }

    .ant-btn {
        background: #152A36;
        border-radius: 0;
        width: 150px;
        height: 50px;
        border: 0;
        font-size: 16px;
        text-transform: uppercase;
    }
    
    .ant-btn-primary:not(:disabled):hover {
        background: #00D8FF;
        color: black;
    }
    
    .ant-btn-default:not(:disabled):hover {
        color: red;
        border: 0;
    }
    
    .ant-btn-default {
        color: orangered;
    }

    
`

export const ModalsComponent = ({ heightContent, title, children, modalName, width = 800, style = ``, footer = true }) => {
    const { status, setStatus } = GetAndUpdateContext()

    const hideModal = () => {
        setStatus(d => ({
            ...d,
            [modalName]: !d[modalName]
        }))
    };

    return (<ModalItems footer={footer} heightContent={heightContent} styleModal={style} width={width} okText="SAVE" centered onCancel={hideModal} onOk={hideModal} title={false} closable={false} open={status[modalName]}>
        <div className="text-[16px] text-blue space-y-5 flex flex-1 flex-col">
            {title ? <div className="mx-[-10px] mt-[-20px]">
                <TitleContent subTitle={false}>
                    <div className="flex w-full justify-between items-center">
                        <div className="text-[24px] uppercase text-blue">{title}</div>
                        <Tooltip title="CLOSE">
                            <button className="text-[20px] text-red-500" onClick={hideModal}>
                                <CloseOutlined></CloseOutlined>
                            </button>
                        </Tooltip>
                    </div>
                </TitleContent>
            </div> : ""}
            {children}
        </div>
        <SquareMedium></SquareMedium>
    </ModalItems>)
}

export const ModalSuccess = ({ title = "Successfully Add New Asset!", onlyShowOk, type, clickCancel = () => { }, clickOk = () => { } }) => {


    Modal.success({
        icon: null,
        maskClosable: true,
        content: <div className="flex flex-col gap-4">
            <Result
                status={type ? type : "success"}
                title={title}
            />
            <div className="flex justify-end p-4 gap-4">
                {!onlyShowOk && <ButtonComponents click={() => {
                    if (clickCancel) {
                        clickCancel()
                    }
                    Modal.destroyAll();
                }} className="py-4">
                    CANCEL
                </ButtonComponents>}

                <ButtonComponents className="py-4" click={() => {
                    Modal.destroyAll();
                    if (clickOk) {
                        clickOk()
                    }
                }}>
                    OK
                </ButtonComponents>
            </div>
        </div>,
        // footer: () => {
        //     return `<div>Pantek</div>`
        // },
        footer: false,
        className: "custom-modal",
    })
}