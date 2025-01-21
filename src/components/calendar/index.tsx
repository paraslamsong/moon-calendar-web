"use client";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import CalendarSkeleton from "./calendar.skeleton";
import {
  Backdrop,
  Box,
  Fade,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { useState } from "react";
import moment from "moment";
import Image from "next/image";
import { Moon } from "lunarphase-js";

import moonJson from "@/assets/moon_phases.json";
import Link from "next/link";

export default function Calendar() {
  const currentDate = new Date();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonthDate, setCurrentMonthDate] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const handleClose = () => setSelectedDate(null);

  return (
    <div className="container">
      <div>Moon Phase Calendar</div>
      <section className="flex items-center content-self-end">
        <IconButton
          color="primary"
          onClick={() => {
            const preDate = moment(currentMonthDate).subtract(1, "month");
            setCurrentMonthDate(preDate.toDate());
          }}
        >
          <ArrowBack />
        </IconButton>
        <span className="font-bold text-xl w-80 text-center">
          {moment(currentMonthDate).format("MMMM, yyyy").toUpperCase()}
        </span>
        <IconButton
          color="primary"
          onClick={() => {
            const nextDate = moment(currentMonthDate).add(1, "month");
            setCurrentMonthDate(nextDate.toDate());
          }}
        >
          <ArrowForward />
        </IconButton>
      </section>
      <Link href={"/3d-moon"}>3D moon</Link>
      <div className="transition-all">
        <CalendarSkeleton
          currentDate={currentDate}
          startDate={currentMonthDate}
          endDate={getLastDayOfMonth(currentMonthDate)}
          onSelectDate={setSelectedDate}
        />
      </div>
      <Modal
        aria-labelledby="moon-phase-detail"
        aria-describedby="moon-phase-detail"
        open={!!selectedDate}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        {(() => {
          if (!selectedDate) return <></>;
          const lunarAge = (Moon.lunarAge(selectedDate) + 1) % 30;
          const moon =
            moonJson[Math.floor(lunarAge) as unknown as keyof typeof moonJson];

          return (
            <Fade in={!!selectedDate}>
              <Box sx={style}>
                <div className="border-2 border-white bg-black p-6 rounded-md">
                  <Typography
                    id="moon-phase-detail"
                    variant="h6"
                    component="h2"
                  >
                    Moon Phase
                  </Typography>
                  {moon?.file_name && (
                    <Image
                      src={`/assets/moon_phases/${moon.file_name}`}
                      width={200}
                      height={200}
                      alt={moon.phase_name}
                      className="justify-self-center"
                    />
                  )}
                  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor
                    ligula.
                  </Typography>
                  <span className="text-center text-white text-[0.66rem]">
                    {moon?.phase_name}
                  </span>
                </div>
              </Box>
            </Fade>
          );
        })()}
      </Modal>
    </div>
  );
}

function getLastDayOfMonth(date: Date) {
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  return lastDay;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  //   border: "2px solid #000",
  boxShadow: 24,
  //   p: 4,
};
