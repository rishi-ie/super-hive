/**
 * Stub data and utilities for tRPC routers.
 *
 * ALL routers in this directory are currently STUBBED - they return mock data
 * instead of performing real operations. Each procedure logs to console with
 * [STUB] prefix and returns placeholder values.
 *
 * As you implement features, replace these stubs with real logic.
 */

export const stubLog = (router: string, proc: string, args?: unknown) => {
  console.log(`[STUB] ${router}.${proc} called`, args ?? "");
};

export const STUB_MACHINE_ID = "stub-machine-id";

export const STUB_PROJECTS = [
  { id: "p1", name: "Mock Project", path: "/mock", defaultBranch: "main", iconUrl: null },
  { id: "p2", name: "Test Project", path: "/test", defaultBranch: "main", iconUrl: null },
];

export const STUB_WORKSPCES = [
  {
    id: "w1",
    projectId: "p1",
    name: "Mock Workspace 1",
    path: "/mock/workspace-1",
    branch: "main",
    isMain: false,
    runCommand: null,
    setupCommand: null,
    teardownCommand: null,
  },
  {
    id: "w2",
    projectId: "p1",
    name: "Mock Workspace 2",
    path: "/mock/workspace-2",
    branch: "feature",
    isMain: false,
    runCommand: null,
    setupCommand: null,
    teardownCommand: null,
  },
  {
    id: "w3",
    projectId: "p2",
    name: "Test Workspace",
    path: "/test/workspace",
    branch: "main",
    isMain: true,
    runCommand: null,
    setupCommand: null,
    teardownCommand: null,
  },
];

export const STUB_GIT_STATUS = {
  current: "main",
  tracking: "origin/main",
  ahead: 0,
  behind: 0,
  staged: [],
  unstaged: [],
  untracked: [],
};

export const STUB_SETTINGS = {
  terminalPresets: [],
  agentPresets: [],
  confirmOnQuit: false,
  showPresetsBar: false,
  useCompactTerminalAddButton: false,
  terminalLinkBehavior: "openInBrowser",
  fileOpenMode: "tab",
  openLinksInApp: false,
  defaultEditor: null,
  autoApplyDefaultPreset: false,
  showResourceMonitor: false,
  branchPrefix: "",
  deleteLocalBranch: false,
  notificationSoundsMuted: false,
  notificationVolume: 0.5,
  fontSettings: { fontSize: 14, fontFamily: "SF Mono" },
  worktreeBaseDir: "/mock",
  exposeHostServiceViaRelay: false,
  telemetryEnabled: false,
};
