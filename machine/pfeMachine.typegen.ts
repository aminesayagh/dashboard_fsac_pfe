
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "": { type: "" };
"done.invoke.Pfe Machine.LOADING:invocation[0]": { type: "done.invoke.Pfe Machine.LOADING:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.Pfe Machine.LOADING:invocation[0]": { type: "error.platform.Pfe Machine.LOADING:invocation[0]"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "getContextGroupePfe": "done.invoke.Pfe Machine.LOADING:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: "getContextGroupePfe";
        };
        eventsCausingActions: {
          "assignContextData": "done.invoke.Pfe Machine.LOADING:invocation[0]";
"assignError": "error.platform.Pfe Machine.LOADING:invocation[0]";
"postGroupe": "Create Groupe";
"postMember": "Create Groupe" | "Post Member";
"removeGroupe": "Remove Member";
"removeMember": "Remove Member";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          "canRetryFetching": "RETRY";
"hasGroup": "";
"isEmptyGroupe": "Remove Member";
"isFullGroupe": "" | "Post Member";
        };
        eventsCausingServices: {
          "getContextGroupePfe": "FETCH" | "RETRY";
        };
        matchesStates: "FAILURE" | "IDLE" | "LOADING" | "SUCCESS" | "SUCCESS.GROUP PFE" | "SUCCESS.GROUP PFE.ADMIT" | "SUCCESS.GROUP PFE.FAILURE" | "SUCCESS.GROUP PFE.PAUSED" | "SUCCESS.GROUP PFE.TO_CREATE" | "SUCCESS.GROUP PFE.TO_CREATE.FILL" | "SUCCESS.GROUP PFE.TO_CREATE.IDLE" | "SUCCESS.GROUP PFE.TO_CREATE.ON_HOLD" | "SUCCESS.GROUP PFE.TO_CREATE.REMOVED" | { "SUCCESS"?: "GROUP PFE" | { "GROUP PFE"?: "ADMIT" | "FAILURE" | "PAUSED" | "TO_CREATE" | { "TO_CREATE"?: "FILL" | "IDLE" | "ON_HOLD" | "REMOVED"; }; }; };
        tags: never;
      }
  