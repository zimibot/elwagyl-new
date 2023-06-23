export const switchColor = (data) => {
    switch (data) {
        case "low":
            data = <span className="text-blue">{data}</span>
            break;
        case "medium":
            data = <span className="text-yellow-500">{data}</span>
            break;
        case "high":
            data = <span className="text-red-400">{data}</span>
            break;
        case "critical":
            data = <span className="text-red-600">{data}</span>
            break;
        default:
           
            break;
    }

    return data
}