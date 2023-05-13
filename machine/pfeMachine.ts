import { assign, createMachine, interpret, send } from 'xstate';


import { ContextData, IMember } from '@/types/groupePfe';
import { Types } from 'mongoose';
import { STATE_MEMBER_PFE } from '@/constants/db';
import { IGroupePfeJsonMongodb } from '@/types/mongodb/GroupPfe';
const defaultCountFetching = 10;


const pfeMachine =
    createMachine({
        /** @xstate-layout N4IgpgJg5mDOIC5QAUBmYAEBZAhgYwAsBLAOzADoBJAEQBkBRAYgDF6AVAYQAkBtABgC6iUAAcA9rCIAXImJLCQAD0QAmAKx9yATj66ALHxV6AHFq0BmADQgAnquMBGcgDYHa53y16LWlV4DsAL6B1miYuISkFLQA8gCC1JQAcgDijBByFKQAbmIA1hRh2PjEZOSxCckpCDlieDgycvwCzQriko3ySEqIALTm-k66umrGav56DlrGetZ2CGPm2s5qaioqfCvG-uYqwaHoxZFlFYmp6ZnktQXkRRGl0fFn1bX1nc08DkLd7dKyXaBlAheg5zFpyP4NHx-BtnFp-DpZrZEBNnBDzGoBnw9K5PCpjPsQHcSlFyk8qowwAAnKliKnkEQAGwaqDpAFtbod7qTTlUaiRcm9-h9BG0JH85AogQ5jGjsQNjOZnCt-Cs1HNEHoVNpPAN-IZnOZ5XpCcTjhQAMoAVQ4HHoFot5BSACUYlbkBhkKxyGwYgB9DjO+hxNj0Kh0JgcKlgBqYFK0gCuIjArR+4s6UsQai0anIagc6nMxmMmy0riR818-nIDmcRi1svUhjUpq5JLK1tt9sdLrdHq9Yd9AaDIbDMSSfq4MVo1EYqdE6f+mYQBYcehczmLmKVMz4qw1CBzuZMCJL2JhZnMrfC7ctNrtDqdrvdnu9Q8DwdD5HHk+ns+QEhSNgYBsgARtS84gL8GbdECMzGBuxYqP4MwIu4DgHq4SwGBi0JrIYbgmiERJtua5Cdg+PbPv2b7+h+o7fhOU4zowAGwEBWAgeBVKfN8C4dEusGIA4mzHhYKHmAMGLZs4B4oQhRq+L4hobG415HA85H3t2T59q+g50SOX4-sxs7OiBYjZOEXEQaKaYCZKQmHhiiGqsWblGBhyIrioDjVrs8JGIMmKrFexFmppFE6b2L4Dj6hmfmOTF-ow5lspZ1lgRBXxig5AI9CuuhLK42xaA4bi+TosneSJkLkOsjhuLKUJaup3JlMwcSULQVpBql7DOgAmpB0GCYCwlmHmegDHCZXlchfBefMMqaH5jieOeOwTC2hIkGIEBwAoEVRLlEr5UCvSTOCwx7mMExTDMB6XeuqruEFKhgtNkJtbe4YMKdMHjQgWoHusaJKk2kKqvCuxhQcN5kbyqQA2NBX5rmxagni5i1pJxgHn564lnW02yq4KHrD9ZFRQ6KOOUDKjONWbi6IzzWbuMB64eQCo4sWOhk0R8MaaSNNUXpA50+diA47mLMGuzd0HqT5B7uYJjqHW2J6BMVORdpj4xTRBnDolUvLkqSzy2zKwc-4B5rLmMJjHu0Nljseuiwb4uxbRpsMTQ-32Wdy6TE41ubrbSvedsaKqnwYxlYYXiteFpH612hvUfp8X+8ZyUzubTk6LmGheBs2LuDDB5leCdYlhYH23dMnsdt7um+yb9FfkGWAxAAavQ1BF0DoJM+Q01rh4SGyhYBMiU76sYkvfiQnsacIxnlEd8bufd2GzDdbQI8FWPmibmufhYb5bgHsWCEbLX4yjOrBIbyLbeZz7u8JFglBsCfIEYJtR8CXtuJqng1zzyNHmTcMIE5rDrKCVud4v47xzsgOIVoLRD0AZqHWOp9DjBxPCVw1V5jjGrKA7MyEyqjEJigrSaCjY506t1Xq9A8EIBofVCY0xQo6BzOQ4S5UFJ4lWNCDw+ZGFsJ6kGLhIMaqeAnotV22wMRX3XsEIAA */
        id: 'Pfe Machine',
        predictableActionArguments: true,
        tsTypes: {} as import("./pfeMachine.typegen").Typegen0,
        context: {
            data: {} as undefined | ContextData,
            error: undefined as undefined | string,
            countFetching: defaultCountFetching
        },
        schema: {
            events: {} as {
                type: 'Post Member', data: { member: IMember, groupePfe: IGroupePfeJsonMongodb }
            } | {
                type: 'Remove Member', data: ContextData['members']
            } | {
                type: 'Remove Groupe', data: ContextData['members']
            } | {
                type: 'RETRY',
            } | {
                type: 'FETCH'
            } | {
                type: 'Create Groupe'
            },
            services: {} as {
                'getContextGroupePfe': {
                    data: ContextData,
                }
            }
        },
        initial: 'IDLE',
        states: {
            'IDLE': {
                on: {
                    'FETCH': { target: 'LOADING' }
                }
            },
            'LOADING': {
                invoke: {
                    src: 'getContextGroupePfe',
                    onDone: [{
                        target: "SUCCESS.GROUP PFE.TO_CREATE.IDLE",
                        actions: 'assignContextData'
                    }],
                    onError: [{
                        actions: 'assignError',
                        target: 'FAILURE'
                    }]
                },
            },
            'SUCCESS': {
                type: 'parallel',
                states: {
                    "GROUP PFE": {
                        id: 'Groupe Pfe',
                        initial: 'TO_CREATE',
                        states: {
                            'TO_CREATE': {
                                initial: 'IDLE',
                                states: {
                                    'IDLE': {
                                        on: {
                                            '': {
                                                target: 'ON_HOLD',
                                                cond: 'hasGroup'
                                            },
                                            'Create Groupe': [
                                                {
                                                    target: 'ON_HOLD',
                                                    actions: ['postMember', 'postGroupe']
                                                }
                                            ]
                                        }
                                    },
                                    'ON_HOLD': {
                                        on: {
                                            '': [
                                                {
                                                    cond: 'isFullGroupe',
                                                    target: 'FILL',
                                                }
                                            ],
                                            'Post Member': [
                                                {
                                                    target: 'FILL',
                                                    cond: 'isFullGroupe',
                                                    actions: 'postMember'
                                                },
                                                {
                                                    target: 'ON_HOLD',
                                                    actions: 'postMember'
                                                }
                                            ],
                                            'Remove Member': [{
                                                cond: 'isEmptyGroupe',
                                                target: 'REMOVED',
                                                actions: 'removeMember',
                                            }, {
                                                target: 'ON_HOLD',
                                                actions: 'removeMember'
                                            }]
                                        }
                                    },
                                    'REMOVED': {
                                        entry: ['removeGroupe'],
                                        type: 'final',
                                    },
                                    'FILL': {
                                        type: 'final',
                                    },
                                }
                            },
                            'ADMIT': {
                            },
                            'PAUSED': {
                            },
                            'FAILURE': {
                                type: 'final',
                            }
                        }
                    }
                }
            },
            'FAILURE': {
                on: {
                    'RETRY': [{ target: 'LOADING', cond: 'canRetryFetching' }]
                }
            },

        }
    }, {
        guards: {
            hasGroup: (context, event) => {
                console.log(context);
                return !!context.data?.groupePfe && context.data?.groupePfe?.length > 0;
            },
            canRetryFetching: (context, event) => {
                return context.countFetching > 0;
            },
            isEmptyGroupe: (context, event) => {
                const members = context.data?.members;
                return !!members && members.filter((member) => member.statusMemberPfe === STATE_MEMBER_PFE.MEMBER).length === 0;
            },
            isFullGroupe: (context, event) => {
                const members = context.data?.members;
                console.log(members)
                return !!members && members.filter((member) => member.statusMemberPfe === STATE_MEMBER_PFE.MEMBER).length === 4;
            },
        },
        actions: {
            'postMember': (ctx, event) => {
                console.log('postMember', ctx, event);
            },
            'postGroupe': (ctx, event) => {
                console.log('postGroupe', ctx, event);
            },
            'removeMember': (ctx, event) => {
                console.log('removeMember', ctx, event);
            },
            'removeGroupe': (ctx, event) => {
                console.log('removeGroupe', ctx, event);
            },
            'assignContextData': assign((ctx, event) => {
                return {
                    data: event.data
                }
            }),
            'assignError': assign((ctx, event) => {
                return {
                    error: (event.data as Error).message,
                }
            }),
        }
    });


export default pfeMachine;
