const formatMessageTime = (messageTime) => {
    const formattedTime = new Date(messageTime);
    const currentTime = new Date();
    const timeDifference = currentTime - formattedTime;
    const millisecondsInADay = 24 * 60 * 60 * 1000;

    if (formattedTime.toDateString() === currentTime.toDateString()) {
        let amOrPm = "AM";
        let formattedHour = formattedTime.getHours();
        if (formattedHour > 12) {
            formattedHour -= 12;
            amOrPm = "PM";
        }
        const formattedMinute = formattedTime.getMinutes().toString().padStart(2, "0");
        return `Today at ${formattedHour}:${formattedMinute} ${amOrPm}`;
    }
    else if (timeDifference < millisecondsInADay && formattedTime.toDateString() === new Date(currentTime - millisecondsInADay).toDateString()) {
        return `Yesterday at ${formattedTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
    }
    else {
        const formattedDate = formattedTime.toLocaleDateString();
        return formattedDate;
    }
};

export default formatMessageTime;
