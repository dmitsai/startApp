"use client";

import { Card, CardContent } from "@/shared/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { TechnologyTag } from "@/shared/ui/technology-tag";

export interface ProfileCardProps {
	user: {
		name: string;
		avatar?: string;
		role: string;
		technologies: Array<{ name: string; grade: number }>;
		projectsCount: number;
		location?: string;
	};
	variant?: "compact" | "default";
	onClick?: () => void;
}

export function ProfileCard({ user, variant = "default", onClick }: ProfileCardProps) {
	const initials = user.name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);

	return (
		<Card
			className="group cursor-pointer transition-all hover:shadow-lg"
			onClick={onClick}
		>
			<CardContent className="p-6">
				<div className="flex items-start gap-4">
					{/* Avatar */}
					<Avatar className="h-16 w-16">
						<AvatarImage src={user.avatar} alt={user.name} />
						<AvatarFallback className="bg-primary text-white">
							{initials}
						</AvatarFallback>
					</Avatar>

					{/* Info */}
					<div className="flex-1 space-y-2">
						<div>
							<h3 className="text-18 font-600 text-text">{user.name}</h3>
							<p className="text-14 text-text-secondary">{user.role}</p>
						</div>

						{user.location && (
							<p className="text-12 text-text-tertiary">📍 {user.location}</p>
						)}

						{/* Stats */}
						<div className="flex gap-4 text-12 text-text-secondary">
							<span>
								<strong className="text-text">{user.projectsCount}</strong>{" "}
								проектов
							</span>
							<span>
								<strong className="text-text">{user.technologies.length}</strong>{" "}
								технологий
							</span>
						</div>

						{/* Technologies */}
						{variant === "default" && (
							<div className="flex flex-wrap gap-1.5 pt-2">
								{user.technologies.slice(0, 5).map((tech) => (
									<TechnologyTag
										key={tech.name}
										name={tech.name}
										grade={tech.grade}
										variant="compact"
									/>
								))}
								{user.technologies.length > 5 && (
									<Badge variant="outline" className="text-12">
										+{user.technologies.length - 5}
									</Badge>
								)}
							</div>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

