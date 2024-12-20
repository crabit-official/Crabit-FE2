import { getChallengeCategory, getParticipationMethod, getVisibilityType } from '@/features/academy/(workspace)/utils/challengeState';
import { CHALLENGE_CATEGORY, CHALLENGE_PARTICIPATION_METHODS, MARKET_VISIBILITY_CATEGORIES } from '@/shared/enums/challenge';

const VISIBILITY_CATEGORIES = [
  {
    value: MARKET_VISIBILITY_CATEGORIES.PUBLIC,
    label: getVisibilityType(MARKET_VISIBILITY_CATEGORIES.PUBLIC),
  },
  { value: MARKET_VISIBILITY_CATEGORIES.PROTECTED, label: getVisibilityType(MARKET_VISIBILITY_CATEGORIES.PROTECTED) },
];

const CHALLENGE_CATEGORIES = [
  { value: CHALLENGE_CATEGORY.STUDYING, label: getChallengeCategory(CHALLENGE_CATEGORY.STUDYING) },
  { value: CHALLENGE_CATEGORY.EXERCISE, label: getChallengeCategory(CHALLENGE_CATEGORY.EXERCISE) },
  { value: CHALLENGE_CATEGORY.READING, label: getChallengeCategory(CHALLENGE_CATEGORY.READING) },
  { value: CHALLENGE_CATEGORY.NEWSPAPER, label: getChallengeCategory(CHALLENGE_CATEGORY.NEWSPAPER) },
  { value: CHALLENGE_CATEGORY.COPYING, label: getChallengeCategory(CHALLENGE_CATEGORY.COPYING) },
  { value: CHALLENGE_CATEGORY.DIARY_WRITING, label: getChallengeCategory(CHALLENGE_CATEGORY.DIARY_WRITING) },
  { value: CHALLENGE_CATEGORY.LIFESTYLE_HABITS, label: getChallengeCategory(CHALLENGE_CATEGORY.LIFESTYLE_HABITS) },
  { value: CHALLENGE_CATEGORY.ETC, label: getChallengeCategory(CHALLENGE_CATEGORY.ETC) },
];

const METHOD_CATEGORIES = [
  {
    value: CHALLENGE_PARTICIPATION_METHODS.SELF_PARTICIPATING,
    label: getParticipationMethod(CHALLENGE_PARTICIPATION_METHODS.SELF_PARTICIPATING),
  },
  { value: CHALLENGE_PARTICIPATION_METHODS.ASSIGNED, label: getParticipationMethod(CHALLENGE_PARTICIPATION_METHODS.ASSIGNED) },
];

export { CHALLENGE_CATEGORIES, METHOD_CATEGORIES, VISIBILITY_CATEGORIES };
