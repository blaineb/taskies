"use client";

import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

interface ModeToggleProps {
  className?: string;
}

const ModeToggle: React.FC<ModeToggleProps> = ({ className }) => {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<Switch
			checked={theme === "dark"}
			onCheckedChange={() => setTheme(theme === "light" ? "dark" : "light")}
			className="flex items-center {className}"
		>
			{theme === "light" ? <Sun className="text-yellow-500" /> : <Moon className="text-blue-500" />}
        </Switch>
	);
};

export default ModeToggle;