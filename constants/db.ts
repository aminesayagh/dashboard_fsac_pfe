// Database mongodb
import { ObjectValue } from "@/types/helpers";  

export const MODEL_NAME={
    USER: "User",
    STUDENT: "Student",
    SEMESTER: 'Semester',
    PROFESSOR: 'Professor',
    GROUP_PFE: 'GroupPfe',
    PROJECT: 'Project',
    MEMBER_PFE: 'MemberPfe',
    SUPERVISOR_PFE: 'SupervisorPfe',
    OPTION: 'Option',
} as const;

export const STATE_LOADING = {
    IDLE: 'idle',
    LOADING: 'loading',
    FAILURE: 'failure',
    SUCCESS: 'success'
} as const
export const GENDER ={
    MAN: "man",
    WOMAN: "woman"
} as const;

export const OPTION_PFE = {
    DATABASE: 'database',
    RESEAU: 'reseau',
    SID: 'sid',
} as const;

export type OptionPfe = ObjectValue<typeof OPTION_PFE>;
const listOptionPfe = Object.values(OPTION_PFE);

export const STATE_GROUPE_PFE = {
    ON_HOLD: 'On hold',
    REMOVED: 'Removed',
    FILL: 'Fill',
    ADMIT: 'Admit',
    PAUSED: 'Paused'
} as const;

export const STATE_MEMBER_PFE = {
    ADMIN: 'Admin',
    MEMBER: 'Member',
    ON_HOLD: 'On Hold',
    EXIT: 'Exit',
} as const

export const STATE_USER_ROLE = {
    ADMIN: 'Admin',
    VISITOR: 'Visitor',
    STUDENT: 'Student',
    PROFESSOR: 'Professor'
} as const

export type UserRole = ObjectValue<typeof STATE_USER_ROLE>;

export const STATE_PROJECT = {
    OPEN: 'Open',
    CONFIRMED: 'Confirmed',
    PROPOSED: 'Proposed',
    CLOSED: 'Closed'
} as const

export const STATE_SUPERVISOR = {
    ON_HOLD: 'On Hold',
    VALID: 'Valid',
    ACTIVE: 'Active',
    HAS_IMPEACHMENT: 'Has Impeachment'
} as const