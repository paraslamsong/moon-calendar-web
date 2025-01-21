"use client";
import React from "react";
import { _weekDays } from "./days";
import moment from "moment";
import { Moon } from "lunarphase-js";
import Image from "next/image";

import moonJson from "@/assets/moon_phases.json";

interface IProps {
  currentDate: Date;
  startDate: Date;
  endDate: Date;
  onSelectDate: (date: Date) => void;
}

const CalendarSkeleton = (props: IProps) => {
  const { startDate, endDate } = props;
  const startDay = startDate.getDay();
  const daysLength = moment(endDate).diff(startDate, "day");

  return (
    <div className="z-10 backdrop-blur-lg rounded-xl bg-black  p-6">
      <div className="grid grid-cols-7 gap-0">
        {_weekDays.map((day) => {
          return <CalendarHeader key={day}>{day}</CalendarHeader>;
        })}
        {Array.from({ length: startDay }, (_, index) => {
          return (
            <div
              key={`blank-${index}`}
              className="flex flex-col border-[0.5px] border-white/40 p-3 gap-0"
            />
          );
        })}
        {Array.from({ length: daysLength }, (_, index) => {
          const date = moment(startDate).add(index, "day");
          const lunarAge = (Moon.lunarAge(date.toDate()) + 1) % 30;
          const moon =
            moonJson[Math.floor(lunarAge) as unknown as keyof typeof moonJson];

          const isToday = date.isSame(moment(props.currentDate), "date");

          return (
            <div
              key={index}
              className="flex flex-col border-[0.5px] border-white/40 p-3 gap-0"
            >
              <div
                className="aspect-[1] max-h-[100px]
               align-center cursor-pointer content-center items-center
               active:scale-[0.8] transition-all p-2"
                onClick={() => {
                  props.onSelectDate(date.toDate());
                }}
              >
                {moon?.file_name && (
                  <Image
                    src={`/assets/moon_phases/${moon.file_name}`}
                    width={70}
                    height={70}
                    alt={moon.phase_name}
                    className="justify-self-center"
                  />
                )}
              </div>
              <div className="flex flex-row justify-between items-center">
                <span>
                  {moon?.show && (
                    <span className="text-center text-white text-[0.66rem]">
                      {moon?.phase_name}
                    </span>
                  )}
                </span>
                <span
                  className={`text-center text-white text-md font-bold ${
                    isToday
                      ? "bg-[rgba(255,0,0,1)] aspect-square rounded-full text-sm p-1"
                      : ""
                  }`}
                >
                  {index + 1}
                </span>
              </div>
            </div>
          );
        })}
        {Array.from({ length: startDay }, (_, index) => {
          return (
            <div
              key={`blank-${index}`}
              className="flex flex-col border-[0.5px] border-white/40 p-3 gap-0"
            />
          );
        })}
      </div>
    </div>
  );
};

export default CalendarSkeleton;

interface HProps {
  children: string;
}

const CalendarHeader = (props: HProps) => {
  return (
    <div className="p-4 text-center text-white font-bold bg-primary  max-h-[120px] border-[0.5px] border-white/40">
      {props.children}
    </div>
  );
};
