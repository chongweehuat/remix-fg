export {};
declare global {
  interface ProcessEnv {
    STORYBLOK_IS_PREVIEW: any;
    STORYBLOK_TOKEN: any;
    NODE_ENV: "development" | "production" | "test";
  }
  interface Process {
    env: ProcessEnv;
  }
  let process: Process;
}
