
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "": { type: "" };
"done.invoke.sign up.LOADING:invocation[0]": { type: "done.invoke.sign up.LOADING:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.sign up.LOADING:invocation[0]": { type: "error.platform.sign up.LOADING:invocation[0]"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "getContextSignUp": "done.invoke.sign up.LOADING:invocation[0]";
        };
        missingImplementations: {
          actions: "assignContextData" | "assignError" | "assignImgData" | "assignProfileData" | "assignStudentData";
          delays: never;
          guards: never;
          services: "getContextSignUp";
        };
        eventsCausingActions: {
          "assignContextData": "done.invoke.sign up.LOADING:invocation[0]";
"assignError": "error.platform.sign up.LOADING:invocation[0]";
"assignImgData": "UPDATE_IMG";
"assignProfileData": "UPDATE_PERSONNAL_INFO";
"assignStudentData": "UPDATE_STUDENT_INFO";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          "hasImgData": "";
"hasProfileData": "";
"hasStudentData": "";
"isStudent": "";
        };
        eventsCausingServices: {
          "getContextSignUp": "xstate.init";
        };
        matchesStates: "FAILURE" | "LOADING" | "SUCCESS" | "SUCCESS.STUDENT" | "SUCCESS.VISITOR" | "SUCCESS.VISITOR.NEW" | "SUCCESS.VISITOR.PROFILE" | "SUCCESS.VISITOR.PROFILE.IMG" | "SUCCESS.VISITOR.PROFILE.STUDENT" | "SUCCESS.VISITOR.PROFILE.TO_VALID" | { "SUCCESS"?: "STUDENT" | "VISITOR" | { "VISITOR"?: "NEW" | "PROFILE" | { "PROFILE"?: "IMG" | "STUDENT" | "TO_VALID"; }; }; };
        tags: never;
      }
  