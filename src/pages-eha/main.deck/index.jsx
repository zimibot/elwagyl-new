import { CardAnimation, CardBox } from "../../components/layout/card"
import { ColumnCenter, ColumnLeft, ColumnRight } from "../../components/layout/column.layout"
import { LayoutDashboard } from "../../components/layout/dashboard.layout"
import { HeatmapComponent } from '../../components.eha/heatmap.plot'
import { TitleContent } from "../../components/layout/title"
import { SubtitleInfo } from "../../components/layout/subtitle.info"
import { ColumnChartComponent } from "../../components.eha/chart.bar"
import { OBSERVATION_SEVERITY_DESC } from "../../model/information"
import { GetAndUpdateContext } from "../../model/context.function"
import { SquareFull } from "../../components/decoration/square"
import { ChartLineTooltip } from "../../components/chart/line.tooltip"
import { MapHighcharts } from "../../components/maps/higchart.map"
import { DetailDeck } from "./detail"
import { useState } from "react"

const MainDeck = () => {
    const { value, maximize } = GetAndUpdateContext()

    const [showDetail, setshowDetail] = useState()

    return (<>
        <LayoutDashboard>
            <ColumnLeft>
                <CardBox className={"flex-1"}>
                    <TitleContent>
                        <div className="text-[24px] uppercase">FINDING RISK STATUS</div>
                    </TitleContent>
                    <div className="flex justify-between items-center">
                        <SubtitleInfo className="btn-information" title={'LEGEND'} />
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-4 rounded-full bg-blue"></div>
                                LOW
                            </div>
                            <div className="flex items-center gap-2 text-[#FFBA08]">
                                <div className="h-4 w-4 rounded-full bg-[#FFBA08]"></div>
                                MEDIUM
                            </div>
                            <div className="flex items-center gap-2 text-[#FF7A00]">
                                <div className="h-4 w-4 rounded-full bg-[#FF7A00]"></div>
                                HIGH
                            </div>
                            <div className="flex items-center gap-2 text-[#ED6A5E]">
                                <div className="h-4 w-4 rounded-full bg-[#ED6A5E]"></div>
                                CRITICAL
                            </div>

                        </div>
                    </div>
                    <HeatmapComponent></HeatmapComponent>
                    <TitleContent>
                        <div className="text-[24px] uppercase">FINDING MONTHLY REPORT</div>
                    </TitleContent>
                    <SubtitleInfo className="btn-information" title={'ALL TOOLS'} >
                        {OBSERVATION_SEVERITY_DESC}
                    </SubtitleInfo>
                    <div className="flex flex-1 relative">
                        <div className="absolute h-full w-full left-0">
                            <ColumnChartComponent></ColumnChartComponent>
                        </div>
                    </div>
                </CardBox>
            </ColumnLeft>
            <ColumnCenter>
                <div className="bg-black bg-opacity-50 backdrop-blur z-30">
                    <CardAnimation>
                        {!maximize?.GLOBESHOW && <>
                            <div className="grid grid-cols-8 border-b border-primary">
                                <div className="col-span-3">
                                    <TitleContent date={value.DATEVALUE.uniq} className={"border-b border-b-primary"} noBorder={true} subTitle={"A-3"}>
                                        <div className="text-[24px] uppercase">REMEDIATION STATISTIC</div>
                                        <SquareFull onlyTop={true}></SquareFull>
                                    </TitleContent>
                                    <div className="relative">
                                        <SquareFull />
                                        <div className="flex items-center justify-center py-4">
                                            <ChartLineTooltip height={200} mode={'vh'} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-2 border-l-primary border-l border-r-primary border-r flex items-center justify-center">

                                </div>
                                <div className="col-span-3 flex flex-col">
                                    <TitleContent date={value.DATEVALUE.uniq} className={"border-b border-b-primary"} noBorder={true} subTitle={"E-1"}>
                                        <div className="text-[24px] uppercase">MONITORED ASSET</div>
                                        <SquareFull onlyTop={true}></SquareFull>
                                    </TitleContent>
                                    <div className="relative flex-1 ">
                                        <SquareFull />
                                        <div className="grid grid-cols-5 h-full w-full">
                                            <div className=" col-span-2 flex items-center justify-center flex-col text-[16px] border-r border-primary">
                                                <span>TODAY SCANNED</span>
                                                <div className="text-[128px]">
                                                    07
                                                </div>
                                            </div>
                                            <div className="col-span-3">
                                                <div className="grid grid-cols-2 h-full">
                                                    <div className="col-span-2 flex flex-col items-center justify-center border-b border-primary gap-2">
                                                        <span>ALL ASSETS</span>
                                                        <div className="text-[48px]">
                                                            24
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-center justify-center border-primary gap-2 border-r">
                                                        <span>ALL SOLVED</span>
                                                        <div className="text-[48px] text-[white]">
                                                            223
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-center justify-center border-primary gap-2">
                                                        <span>ALL UNSOLVED</span>
                                                        <div className="text-[48px] text-[#ED6A5E]">
                                                            40
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>}
                    </CardAnimation>
                </div>
                <div>
                    <TitleContent className={"z-20 p-4 bg-black bg-opacity-50 relative"}>
                        <div className="text-[24px] uppercase">AERIAL VIEW</div>
                    </TitleContent>
                    <MapHighcharts></MapHighcharts>
                </div>
            </ColumnCenter>
            <ColumnRight>
                <CardBox className={" flex-1"}>
                    <TitleContent>
                        <div className="text-[24px] uppercase">PROTECTED SITE</div>
                    </TitleContent>
                    <div className="space-y-4">
                        {
                            [1, 2].map(d => {
                                return <div key={d} className="grid grid-cols-5 border border-primary text-[16px]">
                                    <div className="col-span-3 flex flex-col border-r border-primary">
                                        <div className="px-4 py-5 border-b border-primary">//PROTECTED SITE A</div>
                                        <div className="grid grid-cols-2">
                                            <div className="flex py-5 gap-3 border-r border-primary items-center justify-center text-white">
                                                <span>01</span>
                                                <span>SOLVED</span>
                                            </div>
                                            <div className="flex py-5 gap-3 items-center justify-center text-red-400">
                                                <span>32</span>
                                                <span>UNSOLVED</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-2 grid grid-rows-2 ">
                                        <div className="grid grid-cols-3 gap-2 p-2">
                                            <div className="flex-col flex items-center justify-center gap-2 text-red-400">
                                                <span>
                                                    CRITICAL
                                                </span>
                                                <span>
                                                    245
                                                </span>
                                            </div>
                                            <div className="flex-col flex items-center justify-center gap-2 text-orange-400">
                                                <span>
                                                    HIGH
                                                </span>
                                                <span>
                                                    245
                                                </span>
                                            </div>
                                            <div className="flex-col flex items-center justify-center gap-2 text-yellow-500">
                                                <span>
                                                    MEDIUM
                                                </span>
                                                <span>
                                                    245
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center flex-col justify-between pt-2">
                                            <button onClick={() => setshowDetail(d => ({
                                                ...d,
                                                show: true
                                            }))}>
                                                <svg width="167" height="26" viewBox="0 0 167 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="1" width="166" height="26" fill="#152A36" />
                                                    <path d="M166.5 5L166.5 0.5L162.5 0.5" stroke="#00D8FF" />
                                                    <path d="M166.5 21L166.5 25.5L162 25.5" stroke="#00D8FF" />
                                                    <path d="M51.368 18H50.632C50.5253 18 50.456 17.936 50.424 17.808L47.448 7.904C47.4053 7.776 47.4533 7.712 47.592 7.712H48.088C48.1947 7.712 48.264 7.776 48.296 7.904L50.968 17.008H51.032L53.704 7.904C53.736 7.776 53.8053 7.712 53.912 7.712H54.408C54.536 7.712 54.584 7.776 54.552 7.904L51.576 17.808C51.544 17.936 51.4747 18 51.368 18ZM57.24 7.904V17.808C57.24 17.936 57.1813 18 57.064 18H56.6C56.4933 18 56.44 17.936 56.44 17.808V7.904C56.44 7.776 56.4933 7.712 56.6 7.712H57.064C57.1813 7.712 57.24 7.776 57.24 7.904ZM65.1515 18H60.2075C60.1008 18 60.0475 17.936 60.0475 17.808V7.904C60.0475 7.776 60.1008 7.712 60.2075 7.712H65.1515C65.2795 7.712 65.3435 7.77067 65.3435 7.888V8.256C65.3435 8.37333 65.2795 8.432 65.1515 8.432H61.0075C60.9008 8.432 60.8475 8.48 60.8475 8.576V12.256C60.8475 12.352 60.9008 12.4 61.0075 12.4H64.7035C64.8208 12.4 64.8795 12.4587 64.8795 12.576V12.944C64.8795 13.0613 64.8208 13.12 64.7035 13.12H61.0075C60.9008 13.12 60.8475 13.168 60.8475 13.264V17.136C60.8475 17.232 60.9008 17.28 61.0075 17.28H65.1515C65.2795 17.28 65.3435 17.3387 65.3435 17.456V17.824C65.3435 17.9413 65.2795 18 65.1515 18ZM70.1186 18H69.3186C69.2013 18 69.1266 17.936 69.0946 17.808L66.9026 7.904C66.8706 7.776 66.924 7.712 67.0626 7.712H67.5906C67.708 7.712 67.7773 7.776 67.7986 7.904L69.7026 17.088H69.7826L72.2146 7.888C72.236 7.77067 72.3053 7.712 72.4226 7.712H73.0306C73.1586 7.712 73.2333 7.77067 73.2546 7.888L75.7026 17.088H75.7826L77.6706 7.904C77.692 7.776 77.7666 7.712 77.8946 7.712H78.4386C78.5666 7.712 78.6146 7.776 78.5826 7.904L76.3906 17.808C76.3693 17.936 76.3 18 76.1826 18H75.3666C75.2493 18 75.1746 17.936 75.1426 17.808L72.7746 8.784H72.7106L70.3266 17.808C70.2946 17.936 70.2253 18 70.1186 18ZM85.6794 17.28H88.7514C89.242 17.28 89.6154 17.1467 89.8714 16.88C90.138 16.6027 90.2714 16.208 90.2714 15.696V10.016C90.2714 9.504 90.138 9.11467 89.8714 8.848C89.6154 8.57067 89.242 8.432 88.7514 8.432H85.6794C85.5727 8.432 85.5194 8.48 85.5194 8.576V17.136C85.5194 17.232 85.5727 17.28 85.6794 17.28ZM84.7194 17.808V7.904C84.7194 7.776 84.7727 7.712 84.8794 7.712H88.8314C89.5247 7.712 90.0687 7.91467 90.4634 8.32C90.8687 8.72533 91.0714 9.28 91.0714 9.984V15.728C91.0714 16.432 90.8687 16.9867 90.4634 17.392C90.0687 17.7973 89.5247 18 88.8314 18H84.8794C84.7727 18 84.7194 17.936 84.7194 17.808ZM98.7296 18H93.7856C93.679 18 93.6256 17.936 93.6256 17.808V7.904C93.6256 7.776 93.679 7.712 93.7856 7.712H98.7296C98.8576 7.712 98.9216 7.77067 98.9216 7.888V8.256C98.9216 8.37333 98.8576 8.432 98.7296 8.432H94.5856C94.479 8.432 94.4256 8.48 94.4256 8.576V12.256C94.4256 12.352 94.479 12.4 94.5856 12.4H98.2816C98.399 12.4 98.4576 12.4587 98.4576 12.576V12.944C98.4576 13.0613 98.399 13.12 98.2816 13.12H94.5856C94.479 13.12 94.4256 13.168 94.4256 13.264V17.136C94.4256 17.232 94.479 17.28 94.5856 17.28H98.7296C98.8576 17.28 98.9216 17.3387 98.9216 17.456V17.824C98.9216 17.9413 98.8576 18 98.7296 18ZM103.569 18H103.105C102.987 18 102.929 17.936 102.929 17.808V8.576C102.929 8.48 102.875 8.432 102.769 8.432H100.449C100.321 8.432 100.257 8.37333 100.257 8.256V7.888C100.257 7.77067 100.321 7.712 100.449 7.712H106.209C106.337 7.712 106.401 7.77067 106.401 7.888V8.256C106.401 8.37333 106.337 8.432 106.209 8.432H103.889C103.782 8.432 103.729 8.48 103.729 8.576V17.808C103.729 17.936 103.675 18 103.569 18ZM107.776 18H107.28C107.162 18 107.125 17.936 107.168 17.808L110.352 7.904C110.384 7.776 110.458 7.712 110.576 7.712H111.328C111.434 7.712 111.509 7.776 111.552 7.904L114.736 17.808C114.768 17.936 114.73 18 114.624 18H114.112C114.005 18 113.936 17.936 113.904 17.808L113.04 15.248H108.848L107.984 17.808C107.941 17.936 107.872 18 107.776 18ZM110.911 8.592L109.072 14.528H112.832L110.976 8.592H110.911ZM117.459 7.904V17.808C117.459 17.936 117.4 18 117.283 18H116.819C116.712 18 116.659 17.936 116.659 17.808V7.904C116.659 7.776 116.712 7.712 116.819 7.712H117.283C117.4 7.712 117.459 7.776 117.459 7.904ZM125.514 18H120.426C120.32 18 120.266 17.936 120.266 17.808V7.904C120.266 7.776 120.32 7.712 120.426 7.712H120.89C121.008 7.712 121.066 7.776 121.066 7.904V17.104C121.066 17.2 121.12 17.248 121.226 17.248H125.514C125.642 17.248 125.706 17.3067 125.706 17.424V17.824C125.706 17.9413 125.642 18 125.514 18Z" fill="#00D8FF" />
                                                    <path d="M5.5 0.5H1V5" stroke="#00D8FF" />
                                                    <path d="M5.5 25.5H1V21" stroke="#00D8FF" />
                                                </svg>
                                            </button>
                                            <svg width="179" height="14" viewBox="0 0 179 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5.72441 0.87854L0 13.208H7.48576L12.7698 0.87854H5.72441Z" fill="#1C3947" />
                                                <path d="M19.8143 0.87854L14.0898 13.208H21.5756L26.8597 0.87854H19.8143Z" fill="#1C3947" />
                                                <path d="M33.9065 0.87854L28.1821 13.208H35.6679L40.952 0.87854H33.9065Z" fill="#1C3947" />
                                                <path d="M47.9964 0.87854L42.272 13.208H49.7577L55.0418 0.87854H47.9964Z" fill="#1C3947" />
                                                <path d="M62.0882 0.87854L56.3638 13.208H63.8495L69.1336 0.87854H62.0882Z" fill="#1C3947" />
                                                <path d="M75.7244 0.878418L70 13.2079H77.4858L82.7698 0.878418H75.7244Z" fill="#1C3947" />
                                                <path d="M89.8143 0.878418L84.0898 13.2079H91.5756L96.8597 0.878418H89.8143Z" fill="#1C3947" />
                                                <path d="M103.907 0.878418L98.1821 13.2079H105.668L110.952 0.878418H103.907Z" fill="#1C3947" />
                                                <path d="M117.996 0.878418L112.272 13.2079H119.758L125.042 0.878418H117.996Z" fill="#1C3947" />
                                                <path d="M132.088 0.878418L126.364 13.2079H133.85L139.134 0.878418H132.088Z" fill="#1C3947" />
                                                <path d="M146.179 0.878418L140.454 13.2079H147.94L153.224 0.878418H146.179Z" fill="#1C3947" />
                                                <path d="M160.27 0.878418L154.546 13.2079H162.032L167.316 0.878418H160.27Z" fill="#1C3947" />
                                                <path d="M174.361 0.878418L168.636 13.2079H176.122L178.324 7.92384V0.878418H174.361Z" fill="#1C3947" />
                                            </svg>

                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    <TitleContent>
                        <div className="text-[24px] uppercase">OVERDUE FINDING </div>
                    </TitleContent>
                    <div className="flex-1 relative ">
                        <div className="space-y-4 overflow-auto absolute h-full w-full pr-2 pb-3">
                            {
                                [1, 2, 3, 4, 5, 6].map(d => {
                                    return <div key={d} className="grid  border border-primary text-[16px]">
                                        <div className="flex flex-col border-r border-primary">
                                            <div className="px-4 py-5 border-b border-primary">
                                            //PROTECTED SITE A
                                                <br></br>
                                                <br></br>
                                                SSL Certificate cannot be trusted
                                            </div>
                                            <div className="grid grid-cols-4 text-red-400">
                                                <div className="flex py-5 gap-3 border-r border-primary items-center justify-center">
                                                    <span>CRITICAL</span>
                                                </div>
                                                <div className="flex py-5 gap-3 border-r border-primary items-center justify-center">
                                                    <span>425 days</span>
                                                </div>
                                                <div className="flex py-5 gap-3 border-r border-primary items-center justify-center">
                                                    <span>192.145.152.24</span>
                                                </div>
                                                <div className="flex py-5 gap-3 border-r border-primary items-center justify-center">
                                                    <span>ADMIN</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </CardBox>
            </ColumnRight>
        </LayoutDashboard>
        {showDetail &&
            <DetailDeck data={showDetail}></DetailDeck>
        }
    </>
    )
}

export default MainDeck