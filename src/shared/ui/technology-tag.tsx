"use client";

import { Badge } from "@/shared/ui/badge";
import { cn } from "@/shared/lib/utils";

export interface TechnologyTagProps {
	name: string;
	grade?: number; // 0-10
	variant?: "default" | "compact";
	onClick?: () => void;
	onRemove?: () => void;
	className?: string;
}

/**
 * Компонент для отображения технологии с грейдом
 * Грейд определяет цвет:
 * - 0: серый (хочу выучить)
 * - 1-3: синий (базовый)
 * - 4-6: зеленый (средний)
 * - 7-9: фиолетовый (продвинутый)
 * - 10: золотой (эксперт)
 */
export function TechnologyTag({
	name,
	grade,
	variant = "default",
	onClick,
	onRemove,
	className,
}: TechnologyTagProps) {
	const getGradeColor = (grade: number) => {
		if (grade === 0)
			return "bg-gray-600/15 text-gray-800 border-gray-400 dark:bg-gray-500/25 dark:text-gray-300 dark:border-gray-500 font-600";
		if (grade <= 3)
			return "bg-blue-500/10 text-blue-700 border-blue-300 dark:bg-blue-500/20 dark:text-blue-400";
		if (grade <= 6)
			return "bg-green-500/10 text-green-700 border-green-300 dark:bg-green-500/20 dark:text-green-400";
		if (grade <= 9)
			return "bg-purple-pain/20 text-purple-pain border-purple-pain/50 dark:bg-purple-pain/30 dark:text-medium-purple dark:border-medium-purple font-600";
		return "bg-yellow-500/10 text-yellow-700 border-yellow-400 dark:bg-yellow-500/20 dark:text-yellow-400";
	};

	const getGradeLabel = (grade: number) => {
		if (grade === 0) return "Хочу выучить";
		if (grade <= 3) return "Базовый";
		if (grade <= 6) return "Средний";
		if (grade <= 9) return "Продвинутый";
		return "Эксперт";
	};

	const gradeColor = grade !== undefined ? getGradeColor(grade) : "";

	return (
		<Badge
			variant="outline"
			className={cn(
				"group relative gap-2 transition-all hover:shadow-sm",
				gradeColor,
				onClick && "cursor-pointer hover:scale-105",
				variant === "compact" && "text-12 py-0.5 px-2",
				className,
			)}
			onClick={onClick}
		>
			<span className="font-medium">{name}</span>

			{grade !== undefined && variant === "default" && (
				<span
					className="flex h-5 min-w-5 items-center justify-center rounded-full bg-current/10 px-1.5 text-10 font-600"
					title={getGradeLabel(grade)}
				>
					{grade}
				</span>
			)}

			{onRemove && (
				<button
					type="button"
					onClick={(e) => {
						e.stopPropagation();
						onRemove();
					}}
					className="ml-1 rounded-full opacity-60 transition-opacity hover:opacity-100"
					aria-label={`Удалить ${name}`}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M18 6 6 18" />
						<path d="m6 6 12 12" />
					</svg>
				</button>
			)}
		</Badge>
	);
}

