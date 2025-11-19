"use client";

import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { MatchScore } from "@/shared/ui/match-score";
import { TechnologyTag } from "@/shared/ui/technology-tag";

export interface ApplicationCardProps {
	application: {
		user: {
			name: string;
			avatar?: string;
			role: string;
			technologies?: Array<{ name: string; grade: number }>;
		};
		project: {
			title: string;
		};
		status: "pending" | "accepted" | "rejected";
		matchScore: number;
		message: string;
		createdAt: Date;
	};
	viewMode: "owner" | "applicant";
	onAccept?: () => void;
	onReject?: () => void;
	onView?: () => void;
}

export function ApplicationCard({
	application,
	viewMode,
	onAccept,
	onReject,
	onView,
}: ApplicationCardProps) {
	const initials = application.user.name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);

	const statusConfig = {
		pending: { label: "Ожидание", color: "bg-warning text-gray-900" },
		accepted: { label: "Принят", color: "bg-success text-white" },
		rejected: { label: "Отклонен", color: "bg-error text-white" },
	};

	const status = statusConfig[application.status];

	return (
		<Card>
			<CardHeader>
				<div className="flex items-start justify-between">
					<div className="flex gap-3">
						<Avatar className="h-12 w-12">
							<AvatarImage
								src={application.user.avatar}
								alt={application.user.name}
							/>
							<AvatarFallback className="bg-primary text-white">
								{initials}
							</AvatarFallback>
						</Avatar>

						<div>
							<h3 className="text-16 font-600 text-text">
								{application.user.name}
							</h3>
							<p className="text-14 text-text-secondary">
								{application.user.role}
							</p>
							<p className="text-12 text-text-tertiary">
								{viewMode === "applicant" && (
									<>Проект: {application.project.title}</>
								)}
								{viewMode === "owner" && (
									<>
										Откликнулся{" "}
										{application.createdAt.toLocaleDateString("ru-RU")}
									</>
								)}
							</p>
						</div>
					</div>

					<Badge className={status.color}>{status.label}</Badge>
				</div>
			</CardHeader>

			<CardContent className="space-y-4">
				{/* Match Score - только для владельца */}
				{viewMode === "owner" && (
					<MatchScore score={application.matchScore} size="sm" />
				)}

				{/* Message */}
				<div>
					<p className="text-12 font-500 text-text-secondary mb-1">
						Сопроводительное письмо:
					</p>
					<p className="text-14 text-text">{application.message}</p>
				</div>

				{/* Technologies */}
				{application.user.technologies && (
					<div>
						<p className="text-12 font-500 text-text-secondary mb-2">
							Навыки:
						</p>
						<div className="flex flex-wrap gap-1.5">
							{application.user.technologies.slice(0, 5).map((tech) => (
								<TechnologyTag
									key={tech.name}
									name={tech.name}
									grade={tech.grade}
									variant="compact"
								/>
							))}
							{application.user.technologies.length > 5 && (
								<Badge variant="outline" className="text-12">
									+{application.user.technologies.length - 5}
								</Badge>
							)}
						</div>
					</div>
				)}

				{/* Actions */}
				{viewMode === "owner" && application.status === "pending" && (
					<div className="flex gap-2 pt-2">
						<Button size="sm" onClick={onAccept} className="flex-1">
							Принять
						</Button>
						<Button
							size="sm"
							variant="outline"
							onClick={onReject}
							className="flex-1"
						>
							Отклонить
						</Button>
						<Button size="sm" variant="ghost" onClick={onView}>
							Профиль
						</Button>
					</div>
				)}

				{viewMode === "applicant" && (
					<Button size="sm" variant="outline" onClick={onView}>
						Посмотреть проект
					</Button>
				)}
			</CardContent>
		</Card>
	);
}

