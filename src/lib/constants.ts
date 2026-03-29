import {
  BriefcaseBusiness,
  Laugh,
  Layers,
  PartyPopper,
  UserRoundSearch,
} from "lucide-react";

export const QUESTIONS = {
  Me: "Who are you? I want to know more about you.",
  Projects: "What are your projects? What are you working on right now?",
  Skills: "What are your skills? Give me a list of your soft and hard skills.",
  Fun: "What's the craziest thing you've ever done? What are your hobbies?",
  Contact: "How can I contact you?",
} as const;

export type QuestionKey = keyof typeof QUESTIONS;
export type QuestionValue = (typeof QUESTIONS)[QuestionKey];

export const QUESTION_CONFIG = [
  { key: "Me", icon: Laugh },
  { key: "Projects", icon: BriefcaseBusiness },
  { key: "Skills", icon: Layers },
  { key: "Fun", icon: PartyPopper },
  { key: "Contact", icon: UserRoundSearch },
] as const;
