"use client";
import { useState } from "react";

function ClinicalTiming({ hours }: { hours: any[] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const [_firstDay, ...remaingDays] = hours;
  const firstDay = JSON.parse(_firstDay);
  return (
    <div className="w-full">
      <div className="w-full bg-white">
        <div className="mx-auto rounded-lg bg-white">
          <div
            className="flex cursor-pointer items-center gap-3 max-[768px]:leading-[22px]"
            onClick={toggleExpand}
          >
            <div className="flex items-center space-x-2 text-[14px] text-[#266EB8] max-[768px]:flex-wrap">
              <span className="flex items-center gap-1 text-[14px] font-[500] text-[#266EB8]">
                <span>
                  <svg
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.6699 8.39074C14.6699 12.1095 11.6826 15.1277 8.00183 15.1277C4.32105 15.1277 1.33374 12.1095 1.33374 8.39074C1.33374 4.67195 4.32105 1.65381 8.00183 1.65381C11.6826 1.65381 14.6699 4.67195 14.6699 8.39074Z"
                      stroke="#266EB8"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.4755 10.5331L8.40836 9.28674C8.04828 9.07116 7.75488 8.55241 7.75488 8.12799V5.36584"
                      stroke="#266EB8"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>
                  Hours -{" "}
                  <span className="inline-block min-[1270px]:w-20">
                    {firstDay?.day}
                  </span>
                </span>
              </span>
              <span className="text-[14px] font-[500] text-[#266EB8]">
                {firstDay?.opening} – {firstDay?.closing}
              </span>
            </div>
            {hours?.length > 1 && (
              <span
                className={`relative transform text-[14px] font-[500] text-[#266EB8] transition-all duration-200 ${!isExpanded ? "" : "rotate-180"}  `}
              >{`▼`}</span>
            )}
          </div>

          {isExpanded && (
            <div className="mt-2 text-[14px] leading-normal  text-[#266EB8] min-[991px]:pl-[20px] min-[1180px]:pl-[70px]">
              {remaingDays.map((_item: any, index: number) => {
                const item = JSON.parse(_item);
                return (
                  <p
                    key={`${index}`}
                    className="text-[14px] font-[500] text-[#266EB8]"
                  >
                    <span className="inline-block w-20">{item?.day} </span>{" "}
                    {item?.opening} – {item?.closing}
                  </p>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClinicalTiming;
