export const stubLog = (router: string, proc: string, args?: unknown) => {
  console.log(`[STUB] ${router}.${proc} called`, args ?? "");
};

export const STUB_MACHINE_ID = "stub-machine-id";
export const STUB_ORG_ID = "stub-org-id";
export const STUB_SESSION = {
  id: "stub-session-id",
  userId: "stub-user-id",
  organizationId: STUB_ORG_ID,
};

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

export const STUB_BRANCHES = [
  { name: "main", current: true, commit: "abc123", tracking: "origin/main" },
  { name: "feature", current: false, commit: "def456", tracking: "origin/feature" },
  { name: "develop", current: false, commit: "ghi789", tracking: "origin/develop" },
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

export const STUB_TERMINAL_SESSION = {
  paneId: "stub-pane-id",
  sessionId: "stub-session-id",
};

export const STUB_PORT = {
  port: 3000,
  pid: 12345,
  address: "127.0.0.1",
  foundAt: new Date().toISOString(),
  serviceName: "stub-service",
  workspaceId: "w1",
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

export const STUB_DEVICE_INFO = {
  machineId: STUB_MACHINE_ID,
  name: "Mock Device",
};

export const STUB_RESOURCE_METRICS = {
  cpu: 0,
  memory: 0,
  network: { bytesIn: 0, bytesOut: 0 },
};

export const STUB_HOST_CONNECTION = {
  port: 3000,
  secret: "stub-secret",
  machineId: STUB_MACHINE_ID,
};

export const STUB_HOST_STATUS = "running";

export const STUB_FILE_TREE = [
  { name: "src", type: "directory" as const },
  { name: "package.json", type: "file" as const },
  { name: "README.md", type: "file" as const },
  { name: ".gitignore", type: "file" as const },
];

export const STUB_FILE_CONTENT = "// Mock file content\nconsole.log('stub');\n";

export const STUB_THEME = {
  primaryColor: "#007aff",
  backgroundColor: "#000000",
  textColor: "#ffffff",
};

export const STUB_TABS = [
  {
    id: "tab-1",
    type: "editor" as const,
    title: "Mock File",
    workspaceId: "w1",
    path: "/mock/file.ts",
  },
];

export const STUB_PERMISSIONS = {
  fullDiskAccess: "granted",
  accessibility: "granted",
  microphone: "granted",
  appleEvents: "granted",
  localNetwork: "granted",
};

export const STUB_GITHUB_PRS = [];
export const STUB_GITHUB_ISSUES = [];
export const STUB_NOTIFICATIONS = [];