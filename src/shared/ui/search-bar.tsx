"use client";

import { useState } from "react";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";

export interface SearchBarProps {
	placeholder?: string;
	onSearch: (query: string) => void;
	showFilters?: boolean;
	filters?: Array<{ type: string; label: string }>;
	activeFilters?: string[];
	onFilterClick?: (filterType: string) => void;
}

export function SearchBar({
	placeholder = "Поиск...",
	onSearch,
	showFilters = false,
	filters = [],
	activeFilters = [],
	onFilterClick,
}: SearchBarProps) {
	const [query, setQuery] = useState("");

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		onSearch(query);
	};

	return (
		<div className="space-y-3">
			{/* Search Input */}
			<form onSubmit={handleSearch} className="flex gap-2">
				<div className="relative flex-1">
					<svg
						className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
					<Input
						type="search"
						placeholder={placeholder}
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						className="pl-10"
					/>
				</div>
				<Button type="submit">Поиск</Button>
			</form>

			{/* Filters */}
			{showFilters && filters.length > 0 && (
				<div className="flex flex-wrap gap-2">
					<span className="text-12 text-text-tertiary self-center">
						Фильтры:
					</span>
					{filters.map((filter) => (
						<Badge
							key={filter.type}
							variant={
								activeFilters.includes(filter.type) ? "default" : "outline"
							}
							className="cursor-pointer"
							onClick={() => onFilterClick?.(filter.type)}
						>
							{filter.label}
						</Badge>
					))}
				</div>
			)}
		</div>
	);
}

