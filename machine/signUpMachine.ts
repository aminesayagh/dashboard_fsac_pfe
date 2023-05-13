import { assign, createMachine, interpret, send } from 'xstate';
import { IUserLocal } from "@/types/mongodb/User";
import { OptionPfe, STATE_USER_ROLE } from '@/constants/db';


// import
interface ContextData {
    profile: Omit<IUserLocal, 'password' | 'img' | 'email'>,
    student?: {
        cne: string,
        studentNum: number,
        option: OptionPfe,
    },
    img?: string,
}


const signUpMachine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5SwJZQHYAICuAHAdADIDyAggCICSAcgOIDEEA9umPiugG5MDWbqGHARIUatBB24BjAIYAXFCwDaABgC6qtYlC4mqBS20gAHogAsKgIz4AzAFYAbDZUAmGy4cAOAOzezAGhAAT0RLbxV8b08zCzMXSxUVGwckgF9UwIEsPCIyKjp6MAAnIqYi-FwAG3kAMzKAW3wsoVzROgkuJlkDdE1NI119RXQjUwQAWksATjN8SzMbTxU4qJcVTxdPQJCEGwX8V2mkuxcph28XdMy0bIIAZQBVAGEngFE7u-wANUo7ygAVYgAJXw1FeAHV6P0kCBBigeqNEHZkpFEvMpu4zGczA5tqFTg4DusVN5kmdLDZfFcQM0co8Xu9Pj8-oCQWDIUpLFoYXCETCxmZvHZ8G5KWc7FirILccFQtNPPgMSSwhjvA5qbT7s83h9vr8AcDQRD6A8AArkUj-V4AfVNryBd2I1GopEI1poADFiNCdHp4cNERNNvgHGcbNMMXFXA4XHiEBSHLNlnE7HZ1nZvBjPBqbi16TqmfrWfhTUDiB7KIRXvg7v8HuRXtR-lD1AM-XzQGNkcKcVMpsjLJY7EsPHGNrNkdEHImh35POqMjTc3TtYy9SzDaXy5Xq7X643m2aLVbrXuG033dQvT7Ye2A-zQs45lNPHYX2rkYmprHZQhMzZ8FTN9owxN94hzQQVwZXVmQNEEtwrKt8EoABZBgb15e9O0QFw-EiNUbHsRZLFORY7DjfsIiFVMplnYdX0uRdNRrVcYKLTcy0Q6tUIYI9LRtHiMLvQwHwQCVrApOwSMovxlksCjCJFHxTiiIChwg24WOgwsN3gzid3wQFrS+V1KHIegTMIMzTzrc9-iEoYROw+N4mfFIwiSc4hRfONB2iWwUmJZIojCGx0kXdAmAgOAjE1NtHJGUTxmSCJXFTOIbAxcNMzjC4RU2BJFj8b8EjsDSWhEfJaHi-0nJMcwfx2IcpkiAqTisTxnHS8qoILGqO3qiYSNmUMnAjPY1g8RqkUSEVQ3SoVlhcZaeq1bT1zg-qsMG8Y1RDMNxqjKa42HbxInmjMUn7c4zFWrSCw24t2S2uqxgcRx8CWEllrOd6XDMcjf0k4VaMzSx3qxTLcLu-M11g4sEJ3F7EucjZn1fd93uSLFpoQc5hQ8a7li8bwSIXa5ILWh74Y47ckLPA9kcDKM5ncd7v3sTNTlymNzuu8IZguHEYdYnS4JLfSkJ4pnRJZikPDAznvymMcpjOwnHAFwV-vJpdKfuuH2L0unqyMyyzJl5y5bZxWM2V3ykmsNV+ZUQWdZF9aGabS3BtFfAsT7KYOpUKTx18rqAp8PtLFfJZOruj1SErB4gVeH2xmSkiDhcdK3CylU43ehUYkHQd3rCU5s3CoA */
    id: "sign up",
    predictableActionArguments: true,
    tsTypes: {} as import("./signUpMachine.typegen").Typegen0,
    context: {
        data: {} as ContextData,
        error: undefined as undefined | string,
    },
    schema: {
        events: {} as {
            type: 'UPDATE_PERSONNAL_INFO',
            data: ContextData['profile']
        } | {
            type: 'UPDATE_STUDENT_INFO',
            data: ContextData['student']
        } | {
            type: 'UPDATE_IMG',
            data: ContextData['img']
        } | {
            type: 'VALID_STUDENT'
        } | {
            type: 'always',
        },
        services: {} as {
            'getContextSignUp': {
                data: ContextData,
            }
        }
    },
    initial: "LOADING",
    states: {
        "LOADING": {
            invoke: {
                src: "getContextSignUp",
                onDone: [{
                    target: "SUCCESS.VISITOR.NEW",
                    actions: ['assignContextData']
                }],
                onError: [{
                    target: "FAILURE",
                    actions: ['assignError']
                }]
            },
        },
        'SUCCESS': {
            initial: 'VISITOR',
            states: {
                VISITOR: {
                    initial: 'NEW',
                    states: {
                        'NEW': {
                            on: {
                                '': [{
                                    target: '#sign up.SUCCESS.STUDENT',
                                    cond: 'isStudent'
                                }, {
                                    target: 'PROFILE',
                                    cond: 'hasProfileData'
                                }],
                                UPDATE_PERSONNAL_INFO: {
                                    target: 'PROFILE',
                                    actions: ['assignProfileData']
                                }
                            }
                        },
                        'PROFILE': {
                            initial: 'STUDENT',
                            states: {
                                'STUDENT': {
                                    on: {
                                        '': [{
                                            cond: 'hasStudentData',
                                            target: 'IMG'
                                        }],
                                        UPDATE_STUDENT_INFO: {
                                            target: 'IMG',
                                            actions: ['assignStudentData']
                                        }
                                    }
                                },
                                'IMG': {
                                    on: {
                                        '': [{
                                            target: 'TO_VALID',
                                            cond: 'hasImgData'
                                        }],
                                        UPDATE_IMG: {
                                            target: 'TO_VALID',
                                            actions: ['assignImgData']
                                        }
                                    }
                                },
                                'TO_VALID': {
                                    type: 'final',
                                    on: {
                                        VALID_STUDENT: "#sign up.SUCCESS.STUDENT"
                                    }
                                }
                            }
                        }
                    }
                },
                STUDENT: {
                    type: 'final'
                },
            }
        },
        'FAILURE': {
            type: 'final',
        }
    }
}, {
    guards: {
        'isStudent': (context) => {
            console.log('guard is student', context.data, context.data.profile.statusUserRole.includes(STATE_USER_ROLE.STUDENT));
            return context.data.profile.statusUserRole.includes(STATE_USER_ROLE.STUDENT);
        },
        'hasProfileData': (context) => {
            console.log('guard hasProfileData', context.data, !!context.data.profile.first_name && !!context.data.profile.last_name && !!context.data.profile.gender && !!context.data.profile.cin && !!context.data.profile.address);
            return !!context.data.profile.first_name && !!context.data.profile.last_name && !!context.data.profile.gender && !!context.data.profile.cin && !!context.data.profile.address;
        },
        'hasStudentData': (context) => {
            console.log('guard hasStudentData', context.data, !!context.data.student?.cne && !!context.data.student?.studentNum && !!context.data.student?.option);
            return !!context.data.student?.cne && !!context.data.student?.studentNum && !!context.data.student?.option;
        },
        'hasImgData': (context) => !!context.data.img
    }
})

export default signUpMachine;