"use client";

import { Card, CardContent } from "@/shared/ui/card";
import { Progress } from "@/shared/ui/progress";
import { cn } from "@/shared/lib/utils";

export interface MatchScoreProps {
	score: number; // 0-100
	breakdown?: {
		technologies?: number;
		experience?: number;
		availability?: number;
	};
	showDetails?: boolean;
	size?: "sm" | "md" | "lg";
}

export function MatchScore({
	score,
	breakdown,
	showDetails = false,
	size = "md",
}: MatchScoreProps) {
	const getScoreColor = (score: number) => {
		if (score >= 80) return "text-success";
		if (score >= 60) return "text-warning";
		return "text-error";
	};

	const getScoreLabel = (score: number) => {
		if (score >= 90) return "Отличное совпадение";
		if (score >= 75) return "Хорошее совпадение";
		if (score >= 60) return "Среднее совпадение";
		return "Низкое совпадение";
	};

	const sizeClasses = {
		sm: "text-24",
		md: "text-32",
		lg: "text-48",
	};

	return (
		<div className="space-y-3">
			{/* Main Score */}
			<div className="flex items-center gap-3">
				<div
					className={cn(
						"font-700",
						sizeClasses[size],
						getScoreColor(score),
					)}
				>
					{score}%
				</div>
				<div>
					<p className="text-14 font-600 text-text">
						{getScoreLabel(score)}
					</p>
					<p className="text-12 text-text-tertiary">Оценка соответствия</p>
				</div>
			</div>

			{/* Breakdown */}
			{showDetails && breakdown && (
				<Card>
					<CardContent className="p-4 space-y-3">
						<p className="text-12 font-500 text-text-secondary">
							Детальная оценка:
						</p>

						{breakdown.technologies !== undefined && (
							<div className="space-y-1">
								<div className="flex justify-between text-12">
									<span className="text-text-secondary">Технологии</span>
									<span className="font-500 text-text">
										{breakdown.technologies}%
									</span>
								</div>
								<Progress value={breakdown.technologies} className="h-2" />
							</div>
						)}

						{breakdown.experience !== undefined && (
							<div className="space-y-1">
								<div className="flex justify-between text-12">
									<span className="text-text-secondary">Опыт</span>
									<span className="font-500 text-text">
										{breakdown.experience}%
									</span>
								</div>
								<Progress value={breakdown.experience} className="h-2" />
							</div>
						)}

						{breakdown.availability !== undefined && (
							<div className="space-y-1">
								<div className="flex justify-between text-12">
									<span className="text-text-secondary">Доступность</span>
									<span className="font-500 text-text">
										{breakdown.availability}%
									</span>
								</div>
								<Progress value={breakdown.availability} className="h-2" />
							</div>
						)}
					</CardContent>
				</Card>
			)}
		</div>
	);
}

