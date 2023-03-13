import { Modal, Result } from "antd"
import styled from "styled-components"
import { SquareMedium } from "../components/decoration/square"
import { GetAndUpdateContext } from "../model/context.function"
import { ButtonComponents } from "./button"

const ModalItems = styled(Modal)`
    ${props => props.styleModal && props.styleModal}
    .ant-modal-content {
        background: #1C3947;
        border-radius: 0;
        padding: 30px;
        position: relative;
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

export const ModalsComponent = ({ children, modalName, width = 800, style = ``, footer = true, customButton = true }) => {
    const { status, setStatus } = GetAndUpdateContext()

    const hideModal = () => {
        setStatus(d => ({
            ...d,
            [modalName]: !d[modalName]
        }))
    };

    return (<ModalItems footer={footer} styleModal={style} width={width} okText="SAVE" centered onCancel={hideModal} onOk={hideModal} title={false} closable={false} open={status[modalName]}>
        <div className="text-[16px] text-blue space-y-5">
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