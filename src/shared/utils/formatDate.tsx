const formatDate = (date: Date) =>
    date.toLocaleDateString([], { weekday: "short", year: "numeric", month: "short", day: "numeric" });

export  { formatDate };