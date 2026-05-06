import barba from "@barba/core";
import gsap from "gsap";

barba.init({
	transitions: [
		{
			name: "fade",
			leave({ current }) {
				return gsap.to(current.container, { opacity: 0, duration: 0.4 });
			},
			enter({ next }) {
				return gsap.from(next.container, { opacity: 0, duration: 0.4 });
			},
		},
	],
});
