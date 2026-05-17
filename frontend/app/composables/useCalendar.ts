export interface DayCell {
    date: Date
    dayNumber: number
    isCurrentMonth: boolean
}

export function useCalendar() {
    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate()
    }

    const getFirstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay()
    }

    const generateMonthDays = (year: number, month: number): DayCell[][] => {
        const firstDayIndex = (getFirstDayOfMonth(year, month) + 6) % 7
        const daysInMonth = getDaysInMonth(year, month)
        const prevMonthDays = new Date(year, month, 0).getDate()
        const totalCells = 42
        const days: DayCell[] = []

        for (let i = 0; i < totalCells; i++) {
            const cellDay = i - firstDayIndex + 1
            let date: Date
            let isCurrentMonth: boolean

            if (cellDay <= 0) {
                const prevMonthDate = new Date(year, month, cellDay)
                date = new Date(prevMonthDate)
                isCurrentMonth = false
            } else if (cellDay > daysInMonth) {
                const nextMonthDate = new Date(year, month + 1, cellDay - daysInMonth)
                date = new Date(nextMonthDate)
                isCurrentMonth = false
            } else {
                date = new Date(year, month, cellDay)
                isCurrentMonth = true
            }

            days.push({
                date,
                dayNumber: date.getDate(),
                isCurrentMonth,
            })
        }

        const weeks: DayCell[][] = []
        for (let i = 0; i < 6; i++) {
            weeks.push(days.slice(i * 7, i * 7 + 7))
        }
        return weeks
    }

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]

    return {
        generateMonthDays,
        monthNames,
    }
}