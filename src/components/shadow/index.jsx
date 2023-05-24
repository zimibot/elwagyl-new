export const ShadowError = () => {
    return <div className="fixed w-full h-full left-0 top-0 bg-black bg-opacity-20 flex items-center flex-col justify-center backdrop-blur-sm">
        <div className="absolute p-4 uppercase bg-red-500 text-white font-bold">
        Your connection is unstable or currently offline. Please check your internet connection and VPN settings to ensure whether they are stable or not.
        </div>
    </div>
}