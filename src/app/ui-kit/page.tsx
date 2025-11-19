"use client";

import { useState } from "react";
import { ThemeToggle } from "~/components/ThemeToggle";
import { TechnologyTag } from "@/shared/ui/technology-tag";
import { GradeSlider } from "@/shared/ui/grade-slider";
import { ProfileCard } from "@/shared/ui/profile-card";
import { ProjectCard } from "@/shared/ui/project-card";
import { MatchScore } from "@/shared/ui/match-score";
import { SearchBar } from "@/shared/ui/search-bar";
import { ApplicationCard } from "@/shared/ui/application-card";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Separator } from "@/shared/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

export default function UIKitPage() {
	const [reactGrade, setReactGrade] = useState(7);
	const [tsGrade, setTsGrade] = useState(8);
	const [nodeGrade, setNodeGrade] = useState(6);
	const [searchQuery, setSearchQuery] = useState("");
	const [activeFilters, setActiveFilters] = useState<string[]>([]);

	// Mock data
	const mockUser = {
		name: "Иван Иванов",
		avatar: "",
		role: "Full-Stack Developer",
		technologies: [
			{ name: "React", grade: 8 },
			{ name: "TypeScript", grade: 9 },
			{ name: "Node.js", grade: 7 },
			{ name: "PostgreSQL", grade: 6 },
			{ name: "Docker", grade: 5 },
			{ name: "AWS", grade: 4 },
		],
		projectsCount: 5,
		location: "Москва",
	};

	const mockProject = {
		id: "1",
		title: "AI Стартап для анализа данных",
		description:
			"Разрабатываем платформу для автоматического анализа больших данных с использованием машинного обучения. Ищем энтузиастов для создания MVP.",
		type: "commercial" as const,
		owner: {
			name: "Петр Петров",
			avatar: "",
		},
		technologies: [
			{ name: "Python", grade: 8 },
			{ name: "TensorFlow", grade: 7 },
			{ name: "React", grade: 6 },
			{ name: "PostgreSQL" },
			{ name: "Docker" },
			{ name: "AWS" },
			{ name: "FastAPI" },
		],
		teamSize: 5,
		applicationsCount: 12,
		status: "open" as const,
	};

	const mockApplication = {
		user: mockUser,
		project: { title: "AI Стартап для анализа данных" },
		status: "pending" as const,
		matchScore: 85,
		message:
			"Здравствуйте! Меня очень заинтересовал ваш проект. Имею опыт работы с подобными технологиями и готов внести свой вклад в развитие продукта.",
		createdAt: new Date(),
	};

	return (
		<div className="min-h-screen bg-background p-4 md:p-8">
			<div className="mx-auto max-w-7xl space-y-8">
				{/* Заголовок */}
				<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
					<div>
						<h1 className="text-32 font-700 text-text md:text-48">
							StartApp UI Kit
						</h1>
						<p className="text-14 text-text-secondary md:text-18">
							Библиотека компонентов для платформы поиска IT-команд
						</p>
					</div>
					<ThemeToggle />
				</div>

				<Tabs defaultValue="components" className="w-full">
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger value="components">Компоненты</TabsTrigger>
						<TabsTrigger value="forms">Формы</TabsTrigger>
						<TabsTrigger value="colors">Цвета</TabsTrigger>
					</TabsList>

					{/* Tab: Components */}
					<TabsContent value="components" className="space-y-8">
						{/* Buttons */}
						<Card>
							<CardHeader>
								<CardTitle>Кнопки</CardTitle>
								<CardDescription>Различные варианты кнопок</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex flex-wrap gap-3">
									<Button>Primary</Button>
									<Button variant="secondary">Secondary</Button>
									<Button variant="outline">Outline</Button>
									<Button variant="ghost">Ghost</Button>
									<Button variant="destructive">Destructive</Button>
								</div>
								<div className="flex flex-wrap gap-3">
									<Button size="sm">Small</Button>
									<Button size="default">Default</Button>
									<Button size="lg">Large</Button>
								</div>
							</CardContent>
						</Card>

						{/* Technology Tags */}
						<Card>
							<CardHeader>
								<CardTitle>Technology Tags</CardTitle>
								<CardDescription>
									Теги технологий с грейдами (0-10)
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<p className="mb-2 text-12 font-500 text-text-secondary">
										Все уровни грейдов:
									</p>
									<div className="flex flex-wrap gap-2">
										<TechnologyTag name="Хочу выучить" grade={0} />
										<TechnologyTag name="Базовый" grade={2} />
										<TechnologyTag name="Средний" grade={5} />
										<TechnologyTag name="Продвинутый" grade={8} />
										<TechnologyTag name="Эксперт" grade={10} />
									</div>
								</div>

								<Separator />

								<div>
									<p className="mb-2 text-12 font-500 text-text-secondary">
										Реальные технологии:
									</p>
									<div className="flex flex-wrap gap-2">
										<TechnologyTag name="React" grade={reactGrade} />
										<TechnologyTag name="TypeScript" grade={tsGrade} />
										<TechnologyTag name="Node.js" grade={nodeGrade} />
										<TechnologyTag name="PostgreSQL" grade={7} />
										<TechnologyTag name="Docker" grade={5} />
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Grade Sliders */}
						<Card>
							<CardHeader>
								<CardTitle>Grade Sliders</CardTitle>
								<CardDescription>
									Слайдеры для выбора уровня знаний
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<GradeSlider
									technology="React"
									value={reactGrade}
									onChange={setReactGrade}
									showLabel
									showTooltip
								/>
								<GradeSlider
									technology="TypeScript"
									value={tsGrade}
									onChange={setTsGrade}
									showLabel
									showTooltip
								/>
								<GradeSlider
									technology="Node.js"
									value={nodeGrade}
									onChange={setNodeGrade}
									showLabel
									showTooltip
								/>
							</CardContent>
						</Card>

						{/* Profile Card */}
						<Card>
							<CardHeader>
								<CardTitle>Profile Card</CardTitle>
								<CardDescription>Карточка профиля пользователя</CardDescription>
							</CardHeader>
							<CardContent>
								<ProfileCard
									user={mockUser}
									onClick={() => alert("Открыть профиль")}
								/>
							</CardContent>
						</Card>

						{/* Project Card */}
						<Card>
							<CardHeader>
								<CardTitle>Project Card</CardTitle>
								<CardDescription>Карточка проекта</CardDescription>
							</CardHeader>
							<CardContent>
								<ProjectCard
									project={mockProject}
									showActions
									onApply={() => alert("Откликнуться на проект")}
									onView={() => alert("Посмотреть проект")}
								/>
							</CardContent>
						</Card>

						{/* Match Score */}
						<Card>
							<CardHeader>
								<CardTitle>Match Score</CardTitle>
								<CardDescription>
									Оценка соответствия кандидата проекту
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div>
									<p className="mb-3 text-12 font-500 text-text-secondary">
										Простая оценка:
									</p>
									<MatchScore score={85} />
								</div>

								<Separator />

								<div>
									<p className="mb-3 text-12 font-500 text-text-secondary">
										С детализацией:
									</p>
									<MatchScore
										score={85}
										breakdown={{
											technologies: 90,
											experience: 80,
											availability: 85,
										}}
										showDetails
									/>
								</div>
							</CardContent>
						</Card>

						{/* Application Card */}
						<Card>
							<CardHeader>
								<CardTitle>Application Card</CardTitle>
								<CardDescription>Карточка отклика на проект</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<p className="mb-3 text-12 font-500 text-text-secondary">
										Вид для владельца проекта:
									</p>
									<ApplicationCard
										application={mockApplication}
										viewMode="owner"
										onAccept={() => alert("Принять")}
										onReject={() => alert("Отклонить")}
										onView={() => alert("Посмотреть профиль")}
									/>
								</div>

								<Separator />

								<div>
									<p className="mb-3 text-12 font-500 text-text-secondary">
										Вид для соискателя:
									</p>
									<ApplicationCard
										application={mockApplication}
										viewMode="applicant"
										onView={() => alert("Посмотреть проект")}
									/>
								</div>
							</CardContent>
						</Card>

						{/* Search Bar */}
						<Card>
							<CardHeader>
								<CardTitle>Search Bar</CardTitle>
								<CardDescription>Поиск с фильтрами</CardDescription>
							</CardHeader>
							<CardContent>
								<SearchBar
									placeholder="Поиск проектов или разработчиков..."
									onSearch={(query) => setSearchQuery(query)}
									showFilters
									filters={[
										{ type: "technology", label: "По технологиям" },
										{ type: "type", label: "Тип проекта" },
										{ type: "location", label: "Локация" },
									]}
									activeFilters={activeFilters}
									onFilterClick={(filterType) => {
										setActiveFilters((prev) =>
											prev.includes(filterType)
												? prev.filter((f) => f !== filterType)
												: [...prev, filterType],
										);
									}}
								/>
								{searchQuery && (
									<p className="mt-3 text-12 text-text-secondary">
										Поиск: "{searchQuery}"
									</p>
								)}
							</CardContent>
						</Card>

						{/* Badges */}
						<Card>
							<CardHeader>
								<CardTitle>Badges</CardTitle>
								<CardDescription>Метки и статусы</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex flex-wrap gap-2">
									<Badge>Default</Badge>
									<Badge variant="secondary">Secondary</Badge>
									<Badge variant="outline">Outline</Badge>
									<Badge variant="destructive">Destructive</Badge>
									<Badge className="bg-success text-white">Принят</Badge>
									<Badge className="bg-warning text-gray-900">Ожидание</Badge>
									<Badge className="bg-error text-white">Отклонен</Badge>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Tab: Forms */}
					<TabsContent value="forms" className="space-y-8">
						<Card>
							<CardHeader>
								<CardTitle>Формы</CardTitle>
								<CardDescription>Поля ввода и элементы форм</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<label className="mb-2 block text-14 font-500 text-text">
										Email
									</label>
									<Input placeholder="example@email.com" type="email" />
								</div>

								<div>
									<label className="mb-2 block text-14 font-500 text-text">
										Название проекта
									</label>
									<Input placeholder="Введите название проекта" />
								</div>

								<div>
									<label className="mb-2 block text-14 font-500 text-text">
										Описание
									</label>
									<Textarea
										placeholder="Расскажите о вашем проекте..."
										rows={4}
									/>
								</div>

								<div className="flex gap-2">
									<Input placeholder="Поиск..." className="flex-1" />
									<Button>Найти</Button>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Tab: Colors */}
					<TabsContent value="colors" className="space-y-8">
						<Card>
							<CardHeader>
								<CardTitle>Цветовая палитра</CardTitle>
								<CardDescription>Основные цвета проекта</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="grid grid-cols-2 gap-4 md:grid-cols-5">
									<div className="space-y-2">
										<div className="h-20 rounded-lg bg-ice-cold" />
										<p className="text-12 font-500">Ice Cold</p>
										<p className="text-10 text-text-tertiary">#a0d2eb</p>
									</div>
									<div className="space-y-2">
										<div className="h-20 rounded-lg bg-freeze-purple" />
										<p className="text-12 font-500">Freeze Purple</p>
										<p className="text-10 text-text-tertiary">#e5eaf5</p>
									</div>
									<div className="space-y-2">
										<div className="h-20 rounded-lg bg-medium-purple" />
										<p className="text-12 font-500">Medium Purple</p>
										<p className="text-10 text-text-tertiary">#d0bdf4</p>
									</div>
									<div className="space-y-2">
										<div className="h-20 rounded-lg bg-purple-pain" />
										<p className="text-12 font-500">Purple Pain</p>
										<p className="text-10 text-text-tertiary">#8458b3</p>
									</div>
									<div className="space-y-2">
										<div className="h-20 rounded-lg bg-heavy-purple" />
										<p className="text-12 font-500">Heavy Purple</p>
										<p className="text-10 text-text-tertiary">#a28089</p>
									</div>
								</div>

								<Separator />

								<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
									<div className="space-y-2">
										<div className="h-20 rounded-lg bg-success" />
										<p className="text-12 font-500">Success</p>
									</div>
									<div className="space-y-2">
										<div className="h-20 rounded-lg bg-warning" />
										<p className="text-12 font-500">Warning</p>
									</div>
									<div className="space-y-2">
										<div className="h-20 rounded-lg bg-error" />
										<p className="text-12 font-500">Error</p>
									</div>
									<div className="space-y-2">
										<div className="h-20 rounded-lg bg-info" />
										<p className="text-12 font-500">Info</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
