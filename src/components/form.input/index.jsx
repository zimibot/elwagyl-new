import { Switch } from 'antd'

export const SwitchCustom = ({onChange = () => { }}) => {

    return (<Switch defaultChecked onChange={onChange} />)
}