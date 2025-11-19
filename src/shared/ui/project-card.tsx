"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { TechnologyTag } from "@/shared/ui/technology-tag";
import { Button } from "@/shared/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";

export interface ProjectCardProps {
	project: {
		id: string;
		title: string;
		description: string;
		type: "educational" | "commercial";
		owner: {
			name: string;
			avatar?: string;
		};
		technologies: Array<{ name: string; grade?: number }>;
		teamSize: number;
		applicationsCount: number;
		status?: "open" | "in-progress" | "completed";
	};
	variant?: "grid" | "list";
	showActions?: boolean;
	onApply?: () => void;
	onView?: () => void;
}

export function ProjectCard({
	project,
	variant = "grid",
	showActions = false,
	onApply,
	onView,
}: ProjectCardProps) {
	const ownerInitials = project.owner.name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);

	return (
		<Card className="group transition-all hover:shadow-lg">
			<CardHeader>
				<div className="flex items-start justify-between gap-4">
					<div className="flex-1">
						<div className="flex items-center gap-2 mb-2">
							<CardTitle className="text-20 font-600">{project.title}</CardTitle>
							<Badge
								variant="outline"
								className={
									project.type === "educational"
										? "bg-blue-500/10 text-blue-700 border-blue-300"
										: "bg-purple-pain/10 text-purple-pain border-purple-pain/30"
								}
							>
								{project.type === "educational" ? "Учебный" : "Коммерческий"}
							</Badge>
						</div>

						{project.status && (
							<Badge
								className={
									project.status === "open"
										? "bg-success text-white"
										: project.status === "in-progress"
											? "bg-warning text-gray-900"
											: "bg-gray-500 text-white"
								}
							>
								{project.status === "open"
									? "Открыт"
									: project.status === "in-progress"
										? "В работе"
										: "Завершен"}
							</Badge>
						)}
					</div>
				</div>
			</CardHeader>

			<CardContent className="space-y-4">
				{/* Description */}
				<p className="text-14 text-text-secondary line-clamp-3">
					{project.description}
				</p>

				{/* Technologies */}
				<div>
					<p className="text-12 font-500 text-text-tertiary mb-2">
						Стек технологий:
					</p>
					<div className="flex flex-wrap gap-1.5">
						{project.technologies.slice(0, 6).map((tech) => (
							<TechnologyTag
								key={tech.name}
								name={tech.name}
								grade={tech.grade}
								variant="compact"
							/>
						))}
						{project.technologies.length > 6 && (
							<Badge variant="outline" className="text-12">
								+{project.technologies.length - 6}
							</Badge>
						)}
					</div>
				</div>

				{/* Stats & Owner */}
				<div className="flex items-center justify-between pt-2 border-t border-border">
					<div className="flex items-center gap-2">
						<Avatar className="h-8 w-8">
							<AvatarImage src={project.owner.avatar} alt={project.owner.name} />
							<AvatarFallback className="bg-surface text-text text-12">
								{ownerInitials}
							</AvatarFallback>
						</Avatar>
						<span className="text-12 text-text-secondary">
							{project.owner.name}
						</span>
					</div>

					<div className="flex gap-4 text-12 text-text-tertiary">
						<span>👥 {project.teamSize}</span>
						<span>📨 {project.applicationsCount}</span>
					</div>
				</div>

				{/* Actions */}
				{showActions && (
					<div className="flex gap-2 pt-2">
						<Button size="sm" className="flex-1" onClick={onApply}>
							Откликнуться
						</Button>
						<Button size="sm" variant="outline" onClick={onView}>
							Подробнее
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	);
}

