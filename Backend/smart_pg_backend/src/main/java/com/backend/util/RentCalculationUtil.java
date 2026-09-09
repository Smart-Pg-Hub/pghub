package com.backend.util;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.temporal.ChronoUnit;

public class RentCalculationUtil {
	
	  // Calculate rent from check-in date till last day of month
    public static long calculateProratedRent(long monthlyRent, LocalDate checkInDate) {

        YearMonth yearMonth = YearMonth.from(checkInDate);

        int totalDaysInMonth = yearMonth.lengthOfMonth();

        LocalDate lastDate = yearMonth.atEndOfMonth();

        long remainingDays =
                ChronoUnit.DAYS.between(checkInDate, lastDate) + 1;

        double dailyRent = (double) monthlyRent / totalDaysInMonth;

        return Math.round(dailyRent * remainingDays);
    }

    // Calculate checkout date
    public static LocalDate calculateCheckoutDate(LocalDate checkInDate,
                                                  int durationInMonths) {

        return checkInDate.plusMonths(durationInMonths);
    }

    // Last day of current month
    public static LocalDate getLastDateOfMonth(LocalDate date) {

        return YearMonth.from(date).atEndOfMonth();
    }

    // First day of current month
    public static LocalDate getFirstDateOfMonth(LocalDate date) {

        return YearMonth.from(date).atDay(1);
    }

	

}
