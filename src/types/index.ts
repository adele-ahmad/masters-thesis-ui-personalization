export interface UserProfile {
  age: number;
  gender: 'male' | 'female';
  platform: 'Website' | 'Facebook' | 'Instagram' | 'Twitter' | 'Youtube';
  userExperience: 'Intuitive' | 'User-Friendly' | 'Efficient' | 'Engaging' | 'Clear and concise' | 'Well-structured' | 'Adequate' | 'Confusing' | 'Inconsistent Navigation' | 'Limited Menu Options';
  colorScheme: number;
  visualHierarchy: number;
  imagesMultimedia: number;
  layout: number;
  mobileResponsiveness: number;
  ctaButtons: number;
  formsInputFields: number;
  feedbackErrorMessages: number;
  loadingSpeed: number;
  personalization: number;
  accessibility: number;
  animationTransitions: number;
  scrollingBehavior: number;
  gesturesTouchControls: number;
  searchFunctionality: number;
  socialMediaIntegration: number;
}

export interface ModelPrediction {
  classIndex: number;
  className: string;
  confidence: number;
  probabilities: number[];
}

export interface UIProfile {
typographyBase: number;
  typographyScale: number;
  spacingBase: number;
  spacingScale: number;
  componentDensity: 'compact' | 'normal' | 'spacious';
  contrastLevel: 'low' | 'medium' | 'high';
  motion: 'reduced' | 'normal' | 'enhanced';
  focusRingThickness: number;
  borderRadius: number;
  shadowIntensity: number;
  colorScheme: 'dark' | 'grey' | 'vibrant';
  accentColor: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type ModelStatus = 'loading' | 'ready' | 'error';