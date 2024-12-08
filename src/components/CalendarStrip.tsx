import React, { useEffect, useRef, useState } from "react";
import {
  addDays,
  startOfWeek,
  format,
  isToday,
  isBefore,
  subDays,
} from "date-fns";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarStripProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const CalendarStrip = ({ selectedDate, onDateSelect }: CalendarStripProps) => {
  const [viewStartDate, setViewStartDate] = useState(subDays(new Date(), 6));
  const dates = Array.from({ length: 14 }, (_, i) => addDays(viewStartDate, i));
  const todayRef = useRef<HTMLButtonElement | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (todayRef.current) {
      todayRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    }
  }, []);

  const handlePrevDay = () => {
    const newDate = subDays(selectedDate, 1);
    onDateSelect(newDate);

    if (newDate < viewStartDate) {
      setViewStartDate(startOfWeek(newDate));
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      }
    }
  };

  const handleNextDay = () => {
    const newDate = addDays(selectedDate, 1);
    onDateSelect(newDate);

    const viewEndDate = addDays(viewStartDate, 13);
    if (newDate > viewEndDate) {
      setViewStartDate(startOfWeek(newDate));
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handlePrevDay}
        className="hidden md:block absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-background transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto hide-scrollbar gap-[17.5px] py-4"
      >
        {dates.map((date) => {
          const textColor = isToday(date)
            ? "text-white"
            : isBefore(date, new Date())
            ? "text-black"
            : "text-gray-300";
          return (
            <button
              key={date.toISOString()}
              onClick={() => onDateSelect(date)}
              ref={isToday(date) ? todayRef : null}
              className={cn(
                "flex flex-col items-center min-w-[2.857rem] p-2 rounded-2xl",
                isToday(date) && "bg-black text-white shadow",
                date.toDateString() === selectedDate.toDateString() &&
                  !isToday(date) &&
                  "bg-gray-500",
                textColor
              )}
            >
              <span
                className={cn(
                  "text-sm font-medium",
                  isToday(date) ? "text-white" : "text-gray-300",
                  date.toDateString() === selectedDate.toDateString() &&
                    !isToday(date) &&
                    "text-white"
                )}
              >
                {format(date, "E")[0]}
              </span>
              <span
                className={cn(
                  "text-base font-bold",
                  date.toDateString() === selectedDate.toDateString() &&
                    !isToday(date) &&
                    "text-white"
                )}
              >
                {format(date, "d")}
              </span>
            </button>
          );
        })}
      </div>
      <button
        onClick={handleNextDay}
        className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-background transition-colors"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default CalendarStrip;
