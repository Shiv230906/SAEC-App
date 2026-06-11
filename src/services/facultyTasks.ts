import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  type FacultyAssignedTask,
  type FacultyTaskStatus,
  facultyAssignedTasks,
} from "@/src/data/facultyMockData";

const STORAGE_KEY = "@faculty_task_statuses";

type StatusOverrides = Record<string, FacultyTaskStatus>;

async function readStatusOverrides(): Promise<StatusOverrides> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as StatusOverrides;
  } catch {
    return {};
  }
}

async function writeStatusOverrides(overrides: StatusOverrides): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
}

function mergeTasks(overrides: StatusOverrides): FacultyAssignedTask[] {
  return facultyAssignedTasks.map((task) => ({
    ...task,
    status: overrides[task.id] ?? task.status,
  }));
}

export async function fetchFacultyTasks(): Promise<FacultyAssignedTask[]> {
  const overrides = await readStatusOverrides();
  return mergeTasks(overrides);
}

export async function updateFacultyTaskStatus(
  id: string,
  status: FacultyTaskStatus
): Promise<FacultyAssignedTask[]> {
  const overrides = await readStatusOverrides();
  overrides[id] = status;
  await writeStatusOverrides(overrides);
  return mergeTasks(overrides);
}
