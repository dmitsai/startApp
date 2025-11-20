"use client";

import { useState } from "react";
import { Label } from "@/shared/ui/label";
import { Slider } from "@/shared/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/ui/tooltip";
import { cn } from "@/shared/lib/utils";

export interface GradeSliderProps {
	technology?: string;
	value: number; // 0-10
	onChange: (value: number) => void;
	showLabel?: boolean;
	showTooltip?: boolean;
	className?: string;
}

const gradeLabels = [
	{ value: 0, label: "Хочу выучить", color: "text-gray-600" },
	{ value: 1, label: "Базовый старт", color: "text-blue-600" },
	{ value: 2, label: "Базовый", color: "text-blue-600" },
	{ value: 3, label: "Базовый+", color: "text-blue-600" },
	{ value: 4, label: "Средний старт", color: "text-green-600" },
	{ value: 5, label: "Средний", color: "text-green-600" },
	{ value: 6, label: "Средний+", color: "text-green-600" },
	{ value: 7, label: "Продвинутый старт", color: "text-purple-pain" },
	{ value: 8, label: "Продвинутый", color: "text-purple-pain" },
	{ value: 9, label: "Продвинутый+", color: "text-purple-pain" },
	{ value: 10, label: "Эксперт", color: "text-yellow-600" },
];

/**
 * Слайдер для выбора грейда технологии (0-10)
 */
export function GradeSlider({
	technology,
	value,
	onChange,
	showLabel = true,
	showTooltip = true,
	className,
}: GradeSliderProps) {
	const [tempValue, setTempValue] = useState(value);
	const currentGrade = gradeLabels[tempValue];

	const handleValueChange = (newValue: number[]) => {
		setTempValue(newValue[0]!);
	};

	const handleValueCommit = (newValue: number[]) => {
		onChange(newValue[0]!);
	};

	return (
		<div className={cn("space-y-3", className)}>
			{showLabel && technology && (
				<div className="flex items-center justify-between">
					<Label className="text-14 font-500">{technology}</Label>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span
					className={cn(
						"text-14 font-600 transition-colors",
						currentGrade?.color,
									)}
								>
									{tempValue} / 10
								</span>
							</TooltipTrigger>
							{showTooltip && (
								<TooltipContent>
									<p>{currentGrade?.label}</p>
								</TooltipContent>
							)}
						</Tooltip>
					</TooltipProvider>
				</div>
			)}

			<div className="space-y-2">
				<Slider
					min={0}
					max={10}
					step={1}
					value={[tempValue]}
					onValueChange={handleValueChange}
					onValueCommit={handleValueCommit}
					className="cursor-pointer"
				/>

				<div className="flex justify-between text-10 text-text-tertiary">
					<span>Хочу выучить</span>
					<span>Базовый</span>
					<span>Средний</span>
					<span>Продвинутый</span>
					<span>Эксперт</span>
				</div>
			</div>

			{showLabel && (
				<p className={cn("text-12 font-500", currentGrade?.color)}>
					{currentGrade?.label}
				</p>
			)}
		</div>
	);
}

