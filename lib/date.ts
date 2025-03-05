export const formatDate = (date: Date) => {
		const day = date.toISOString().slice(0, 16).split("T")[0].split("-").splice(1).join("/");
		const time = date.toISOString().slice(0, 16).split("T")[1];
		return `${day} ${time}`;

}

export const getLocalDateTime = () => {
		const date = new Date();
		const offset = date.getTimezoneOffset(); // Get offset in minutes
		const localTime = new Date(date.getTime() - offset * 60000);
		return localTime.toISOString().slice(0, 16);
	};
