import { create } from "zustand";

export interface TasksFilterState {
	tab: string;
	assignee: string | null;
	search: string;
	typeTab: string;
	projectFilter: string | null;
}

export const useTasksFilterStore = create<TasksFilterState>()(() => ({
	tab: "all",
	assignee: null,
	search: "",
	typeTab: "all",
	projectFilter: null,
}));

export function tasksSearchFromFilters(_filters: TasksFilterState) {
	return {};
}
