// HelloWorld.stories.tsx
import { StoryFn, Meta } from "@storybook/react";
import { HelloWorld } from "./HelloWorld";
export default {
  title: "ReactComponentLibrary/HelloWorld",
  component: HelloWorld,
} as Meta<typeof HelloWorld>;

const Template: StoryFn<typeof HelloWorld> = (args: any) => <HelloWorld {...args} />;

export const HelloWorldTest = Template.bind({});
HelloWorldTest.args = {
  title: "Default theme",
  theme: "primary",
  testIdPrefix: "hello world",
};

export const HelloWorldSecondary = Template.bind({});
HelloWorldSecondary.args = {
  title: "Secondary theme",
  theme: "secondary",
  testIdPrefix: "hello world",
};