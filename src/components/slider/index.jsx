import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { ERRORCOMPONENT } from "../../model/information";

export const SliderSlick = ({data = new Array(10).fill()}) => {
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style }}
                onClick={onClick}
            >
                <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 9.5L0.250001 0.406734L0.25 18.5933L16 9.5Z" fill="#00D8FF" />
                </svg>
            </div>
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style }}
                onClick={onClick}
            >
                <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M-4.5897e-07 9.5L15.75 0.406734L15.75 18.5933L-4.5897e-07 9.5Z" fill="#00D8FF" />
                </svg>
            </div>
        );
    }
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        
        // nextArrow: <SampleNextArrow />,
        // prevArrow: <SamplePrevArrow />
        // nextArrow: <div>
        //     <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        //         <path d="M16 9.5L0.250001 0.406734L0.25 18.5933L16 9.5Z" fill="#00D8FF" />
        //     </svg>

        // </div>,
        // prevArrow: <div>
        //     <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        //         <path d="M-4.5897e-07 9.5L15.75 0.406734L15.75 18.5933L-4.5897e-07 9.5Z" fill="#00D8FF" />
        //     </svg>

        // </div>
    };
    return (
        <div className=" flex-1 text-blue">
            {data.length === 0 || !data ?
                <div className="uppercase text-center p-2 border text-[white]">
                    {ERRORCOMPONENT.dataNotAvailable}
                </div>
                : <Slider arrows={false} {...settings}>
                    {data.map((d, k) => {
                        return <div key={k} className="uppercase p-1 h-full">
                            <div className="h-full  !flex justify-between p-2 flex-col border border-primary">

                                <div className="flex justify-between items-center" style={{
                                    lineHeight: 1.2
                                }}>
                                    <div>{d.name}</div>
                                    <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.16017 1.08558C8.07385 0.935213 7.94938 0.810286 7.79934 0.723412C7.6493 0.636537 7.47899 0.59079 7.30561 0.59079C7.13223 0.59079 6.96192 0.636537 6.81188 0.723412C6.66183 0.810286 6.53737 0.935213 6.45105 1.08558L0.471745 11.2592C0.073241 11.9376 0.551097 12.8 1.3263 12.8H13.284C14.0592 12.8 14.538 11.9367 14.1386 11.2592L8.16017 1.08558ZM7.30386 4.08003C7.77038 4.08003 8.13575 4.48289 8.08866 4.94767L7.78346 8.00577C7.77321 8.12591 7.71824 8.23782 7.62943 8.31937C7.54062 8.40092 7.42444 8.44618 7.30386 8.44618C7.18329 8.44618 7.06711 8.40092 6.9783 8.31937C6.88949 8.23782 6.83452 8.12591 6.82427 8.00577L6.51906 4.94767C6.5081 4.838 6.52024 4.72725 6.55468 4.62255C6.58913 4.51786 6.64512 4.42154 6.71905 4.3398C6.79299 4.25807 6.88322 4.19272 6.98395 4.14798C7.08467 4.10324 7.19365 4.08009 7.30386 4.08003ZM7.30561 9.31203C7.53688 9.31203 7.75867 9.4039 7.92221 9.56743C8.08574 9.73096 8.17761 9.95276 8.17761 10.184C8.17761 10.4153 8.08574 10.6371 7.92221 10.8006C7.75867 10.9642 7.53688 11.056 7.30561 11.056C7.07434 11.056 6.85254 10.9642 6.68901 10.8006C6.52548 10.6371 6.43361 10.4153 6.43361 10.184C6.43361 9.95276 6.52548 9.73096 6.68901 9.56743C6.85254 9.4039 7.07434 9.31203 7.30561 9.31203Z" fill="#ED6A5E" />
                                    </svg>
                                </div>
                                <div className="text-right text-[24px]">{d.total}</div>
                                <div>
                                    <div className="py-1 px-2 text-center w-full bg-primary">
                                        NEED ATTENTION
                                    </div>
                                </div>
                            </div>

                        </div>
                    })}


                </Slider>}

        </div>
    );
}