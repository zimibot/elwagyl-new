import LinesEllipsis from 'react-lines-ellipsis'

export const LimitText = ({ text, config = {
    maxLine: 2,
    ellipsis: '...',
} }) => {
    return <LinesEllipsis
        text={text}
        {...config}
    />
}

export const DefaultLimitText = ({ text, limit = 250, config = {} }) => {
    return <span {...config}>{text.substring(0, limit)}...</span>
}